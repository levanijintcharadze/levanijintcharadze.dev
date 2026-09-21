import assert from 'node:assert/strict'
import test, { beforeEach } from 'node:test'

import {
  handleContactSubmission,
  resetContactSubmissionState,
} from './send-email-handler.mjs'

beforeEach(() => {
  resetContactSubmissionState()
})

const validPayload = {
  clientKey: '127.0.0.1',
  name: 'Levan',
  email: 'levan+portfolio@example.com',
  message: 'Hello there',
  website: '',
  toEmail: 'owner@example.com',
  fromEmail: 'noreply@example.com',
  idempotencyKey: 'test-key',
}

test('returns 429 after repeated submissions from the same client', async () => {
  let sendCalls = 0
  const sendEmail = async () => {
    sendCalls += 1
    return { data: { id: `message-${sendCalls}` }, error: null }
  }

  for (let index = 0; index < 5; index += 1) {
    const result = await handleContactSubmission({
      ...validPayload,
      sendEmail,
    })

    assert.equal(result.status, 200)
  }

  const rateLimitedResult = await handleContactSubmission({
    ...validPayload,
    sendEmail,
  })

  assert.equal(rateLimitedResult.status, 429)
  assert.deepEqual(rateLimitedResult.body, {
    error: 'Too many requests. Please try again later.',
  })
  assert.equal(sendCalls, 5)
})

test('short-circuits honeypot submissions without sending email', async () => {
  let sendCalls = 0

  const result = await handleContactSubmission({
    ...validPayload,
    website: 'https://spam.example',
    sendEmail: async () => {
      sendCalls += 1
      return { data: null, error: null }
    },
  })

  assert.equal(result.status, 200)
  assert.deepEqual(result.body, {
    success: true,
    message: 'Email sent successfully',
  })
  assert.equal(sendCalls, 0)
})
