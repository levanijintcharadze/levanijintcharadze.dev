# Levan Jintcharadze - Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Features

- Clean, minimal design
- Responsive layout
- Modern tech stack (React 19, Vite, Tailwind CSS)
- Automated deployment to GitHub Pages
- Contact form with free mailto fallback
- Optional SendGrid email integration for direct in-app sending

## 📦 Getting Started

### Prerequisites
- Node.js 20 or higher
- npm
- SendGrid API key (for contact form)

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Email Configuration

The contact form works in two modes:

1. Free mode (default): if the API is unavailable, it opens a prefilled `mailto:` draft in the visitor's email app.
2. SendGrid mode (optional): sends directly from the site via `/api/send-email`.

The contact form uses SendGrid to send emails. To enable this feature:

1. **Create a SendGrid account** at [https://sendgrid.com](https://sendgrid.com)

2. **Generate an API key** in SendGrid:
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Give it a name and select "Full Access" or "Mail Send" permissions
   - Copy the generated API key

3. **Verify a sender email** in SendGrid:
   - Go to Settings → Sender Authentication
   - Verify a single sender email address
   - This will be used as the "from" address for emails

4. **Set up environment variables** in Vercel or your deployment platform:
   - `SENDGRID_API_KEY` - Your SendGrid API key
   - `SENDGRID_FROM_EMAIL` - Your verified sender email
   - `CONTACT_EMAIL` - Email address where you want to receive messages (defaults to levanijincharadze@outlook.com)

   For local development, create a `.env` file in the root directory:
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   SENDGRID_FROM_EMAIL=your_verified_sender_email@example.com
   CONTACT_EMAIL=levanijincharadze@outlook.com
   ```

5. **Deploy to Vercel** (recommended for serverless functions):
   - Connect your GitHub repository to Vercel
   - Add the environment variables in Vercel project settings
   - Deploy

## 🌐 Deployment

This site is configured for automatic deployment to GitHub Pages. See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed setup instructions.

### Quick Setup:
1. Go to **Settings** → **Pages** in your GitHub repository
2. Set **Source** to **GitHub Actions**
3. Push to the `main` branch to trigger deployment

**Note:** For the contact form to work, you'll need to deploy to a platform that supports serverless functions like Vercel, as GitHub Pages doesn't support backend functionality.

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
