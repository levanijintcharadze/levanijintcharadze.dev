# Resend Email Integration Setup Guide

This guide provides step-by-step instructions for setting up Resend email integration for the contact form.

Note: direct API sending is optional. Without Resend, the contact form falls back to opening a prefilled `mailto:` draft in the visitor's email app.

## Prerequisites

1. A Resend account (https://resend.com)
2. A Vercel account (https://vercel.com)
3. Access to this repository

## Step 1: Create Resend API Key

1. Sign in to the Resend dashboard.
2. Open **API Keys**.
3. Create a new key with sending permissions.
4. Copy the key immediately.

## Step 2: Verify Sending Domain

1. In Resend dashboard, open **Domains**.
2. Add your domain.
3. Configure DNS records provided by Resend.
4. Wait until the domain shows as verified.

## Step 3: Configure Vercel Environment Variables

Add these variables in your Vercel project settings:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=Your Name <contact@your-verified-domain.com>
CONTACT_EMAIL=levanijincharadze@outlook.com
```

`RESEND_FROM_EMAIL` must use the verified domain from Step 2.

## Step 4: Deploy and Test

1. Deploy the project to Vercel.
2. Open the deployed site and submit the contact form.
3. Confirm the message arrives in `CONTACT_EMAIL`.

## Troubleshooting

1. **401 Unauthorized**: API key is invalid or missing.
2. **403 Forbidden**: sending domain is unverified or `RESEND_FROM_EMAIL` uses a different domain.
3. **422 Validation error**: malformed `from` format or invalid recipient.
4. **No email received**: inspect Vercel function logs and Resend logs.

## Local Testing

1. Copy `.env.example` to `.env`.
2. Set your real Resend values.
3. Run:

```bash
npm install
npm run dev
```

Then test the contact form in the browser.
