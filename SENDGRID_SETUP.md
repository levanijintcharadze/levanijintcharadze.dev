# SendGrid Email Integration Setup Guide

This guide provides step-by-step instructions for setting up the SendGrid email integration for the contact form.

## Prerequisites

1. A SendGrid account (free tier available at https://sendgrid.com)
2. A Vercel account (free tier available at https://vercel.com)
3. Access to this GitHub repository

## Step 1: Create SendGrid Account and API Key

1. **Sign up for SendGrid**
   - Go to https://sendgrid.com
   - Create a free account (allows 100 emails/day)
   - Verify your email address

2. **Create an API Key**
   - Log in to SendGrid dashboard
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Name it (e.g., "Portfolio Contact Form")
   - Select "Full Access" or "Mail Send" permissions
   - Click "Create & View"
   - **IMPORTANT**: Copy the API key immediately - you won't be able to see it again!

## Step 2: Verify Sender Email

1. **Single Sender Verification (Recommended for personal use)**
   - In SendGrid dashboard, go to Settings → Sender Authentication
   - Click "Get Started" under "Verify a Single Sender"
   - Fill in your email details (use the email where you want to receive messages)
   - Click "Create"
   - Check your email and click the verification link
   - Wait for verification to complete

2. **Domain Authentication (Optional, for production)**
   - Go to Settings → Sender Authentication
   - Click "Authenticate Your Domain"
   - Follow the DNS configuration steps
   - This provides better email deliverability

## Step 3: Deploy to Vercel

1. **Connect Repository to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import this GitHub repository
   - Vercel will automatically detect it as a Vite project

2. **Configure Environment Variables**
   - Before deploying, go to "Environment Variables" section
   - Add the following variables:
     ```
     SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
     SENDGRID_FROM_EMAIL=your-verified-email@example.com
     CONTACT_EMAIL=levanijincharadze@outlook.com
     ```
   - Replace the values with your actual SendGrid API key and verified email
   - Click "Deploy"

3. **Verify Deployment**
   - Wait for deployment to complete
   - Visit your Vercel URL
   - Test the contact form by filling it out and clicking "Send"
   - Check your email inbox for the message

## Step 4: Configure Custom Domain (Optional)

1. **Add Custom Domain in Vercel**
   - Go to your project settings in Vercel
   - Click "Domains"
   - Add your custom domain (e.g., levanijintcharadze.dev)
   - Follow the DNS configuration instructions

2. **Update CNAME File**
   - The CNAME file in the repository should contain your custom domain
   - Commit and push any changes

## Troubleshooting

### Emails Not Sending

1. **Check SendGrid API Key**
   - Verify the API key is correct in Vercel environment variables
   - Ensure the API key has "Mail Send" permissions

2. **Check Sender Email**
   - Verify your sender email is verified in SendGrid
   - Check that SENDGRID_FROM_EMAIL matches the verified email

3. **Check Logs**
   - Go to Vercel dashboard → Functions → View logs
   - Look for error messages in the send-email function logs
   - Check SendGrid dashboard → Activity for email send attempts

4. **Check Spam Folder**
   - Emails might be landing in spam
   - Add your sender email to contacts to improve deliverability

### Form Not Working

1. **Check Console Errors**
   - Open browser developer console (F12)
   - Look for network errors or JavaScript errors
   - Verify the API endpoint is accessible

2. **Verify Deployment**
   - Ensure the `/api/send-email.ts` file is deployed
   - Check Vercel functions tab to see if the function is listed

### API Quota Exceeded

- SendGrid free tier: 100 emails/day
- If exceeded, upgrade to a paid plan or wait 24 hours
- Monitor usage in SendGrid dashboard → Activity

## Security Best Practices

1. **Never Commit API Keys**
   - API keys should only be in Vercel environment variables
   - Never commit them to the repository
   - The `.env.example` file shows required variables without actual values

2. **Rate Limiting**
   - Consider adding rate limiting to prevent abuse
   - Monitor SendGrid activity for unusual patterns

3. **Input Validation**
   - The API endpoint validates email format
   - HTML is escaped to prevent XSS attacks
   - Consider adding CAPTCHA for additional protection

## Testing

### Local Testing

1. **Create .env file**
   ```bash
   cp .env.example .env
   ```

2. **Add your SendGrid credentials**
   ```
   SENDGRID_API_KEY=your_api_key_here
   SENDGRID_FROM_EMAIL=your_verified_email@example.com
   CONTACT_EMAIL=your_email@example.com
   ```

3. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

4. **Run locally with Vercel dev**
   ```bash
   vercel dev
   ```

5. **Test the form**
   - Open http://localhost:3000
   - Fill out the contact form
   - Check your email

## Support

For issues or questions:
- Check SendGrid documentation: https://docs.sendgrid.com
- Check Vercel documentation: https://vercel.com/docs
- Review the code in `/api/send-email.ts`
- Check GitHub Issues in this repository
