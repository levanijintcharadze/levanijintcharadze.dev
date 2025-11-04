import type { VercelRequest, VercelResponse } from '@vercel/node'
import sgMail from '@sendgrid/mail'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Get SendGrid API key from environment variables
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) {
    console.error('SENDGRID_API_KEY is not set')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  // Get recipient email from environment variables or use default
  const toEmail = process.env.CONTACT_EMAIL || 'levanijincharadze@outlook.com'

  // Parse request body
  const { name, email, message } = req.body

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    // Initialize SendGrid with API key
    sgMail.setApiKey(apiKey)

    // Prepare email message
    const msg = {
      to: toEmail,
      from: process.env.SENDGRID_FROM_EMAIL || toEmail, // Must be a verified sender in SendGrid
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact from Portfolio</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <h3 style="color: #555; margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    }

    // Send email
    await sgMail.send(msg)

    return res.status(200).json({ success: true, message: 'Email sent successfully' })
  } catch (error: any) {
    console.error('Error sending email:', error)
    
    // Log more details for debugging
    if (error.response) {
      console.error('SendGrid error response:', error.response.body)
    }

    return res.status(500).json({ 
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}
