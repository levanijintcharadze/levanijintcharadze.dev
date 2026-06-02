import { createHash } from 'node:crypto'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY (or legacy SENDGRID_API_KEY) is not set')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || process.env.SENDGRID_FROM_EMAIL
  if (!fromEmail) {
    console.error('RESEND_FROM_EMAIL (or legacy SENDGRID_FROM_EMAIL) is not set')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const toEmail =
    process.env.CONTACT_EMAIL ||
    process.env.SENDGRID_TO_EMAIL ||
    'levanijincharadze@outlook.com'
  const body = req.body as Partial<Record<'name' | 'email' | 'message', unknown>>
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const message = typeof body.message === 'string' ? body.message.trim() : ''

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const escapedName = escapeHtml(name)
  const escapedEmail = escapeHtml(email)
  const escapedMessage = escapeHtml(message)
  const resend = new Resend(apiKey)
  const idempotencyKey = `contact-form/${createHash('sha256').update(`${name}|${email}|${message}`).digest('hex')}`
  const { data, error } = await resend.emails.send(
    {
      to: [toEmail],
      from: fromEmail,
      replyTo: email,
      subject: `Portfolio Contact from ${escapedName}`,
      text: `Name: ${escapedName}\nEmail: ${escapedEmail}\n\nMessage:\n${escapedMessage}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact from Portfolio</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${escapedName}</p>
            <p><strong>Email:</strong> <a href="mailto:${escapedEmail}">${escapedEmail}</a></p>
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h3 style="color: #555; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${escapedMessage}</p>
          </div>
        </div>
      `,
    },
    { idempotencyKey }
  )

  if (error) {
    const statusCode =
      typeof error === 'object' &&
      error &&
      'statusCode' in error &&
      typeof error.statusCode === 'number'
        ? error.statusCode
        : 500

    console.error('Error sending email with Resend:', error)

    return res.status(statusCode).json({
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Email sent successfully',
    id: data?.id,
  })
}
