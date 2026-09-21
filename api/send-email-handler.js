import { isValidEmail } from './send-email-utils.js'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 5
const requestLog = new Map()

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const pruneRequestLog = (now) => {
  for (const [key, timestamps] of requestLog.entries()) {
    const recentRequests = timestamps.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
    )

    if (recentRequests.length === 0) {
      requestLog.delete(key)
    } else {
      requestLog.set(key, recentRequests)
    }
  }
}

const getRecentRequestCount = (key) => {
  const now = Date.now()
  pruneRequestLog(now)

  return (requestLog.get(key) || []).length
}

const recordSuccessfulRequest = (key) => {
  const now = Date.now()
  const recentRequests = (requestLog.get(key) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  )

  recentRequests.push(now)
  requestLog.set(key, recentRequests)
}

export const resetContactSubmissionState = () => {
  requestLog.clear()
}

export async function handleContactSubmission({
  clientKey,
  email,
  fromEmail,
  idempotencyKey,
  includeErrorDetails = false,
  message,
  name,
  sendEmail,
  toEmail,
  website,
}) {
  if (website) {
    return {
      status: 200,
      body: {
        success: true,
        message: 'Email sent successfully',
      },
    }
  }

  if (!name || !email || !message) {
    return {
      status: 400,
      body: { error: 'Missing required fields' },
    }
  }

  if (!isValidEmail(email)) {
    return {
      status: 400,
      body: { error: 'Invalid email address' },
    }
  }

  if (getRecentRequestCount(clientKey) >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      status: 429,
      body: {
        error: 'Too many requests. Please try again later.',
      },
    }
  }

  const escapedName = escapeHtml(name)
  const escapedEmail = escapeHtml(email)
  const escapedMessage = escapeHtml(message)
  const { data, error } = await sendEmail({
    toEmail,
    fromEmail,
    email,
    escapedName,
    escapedEmail,
    escapedMessage,
    idempotencyKey,
  })

  if (error) {
    const statusCode =
      typeof error === 'object' &&
      error &&
      'statusCode' in error &&
      typeof error.statusCode === 'number'
        ? error.statusCode
        : 500

    return {
      status: statusCode,
      body: {
        error: 'Failed to send email',
        details:
          includeErrorDetails &&
          typeof error === 'object' &&
          error &&
          'message' in error &&
          typeof error.message === 'string'
            ? error.message
            : undefined,
      },
    }
  }

  recordSuccessfulRequest(clientKey)

  return {
    status: 200,
    body: {
      success: true,
      message: 'Email sent successfully',
      id: data?.id,
    },
  }
}
