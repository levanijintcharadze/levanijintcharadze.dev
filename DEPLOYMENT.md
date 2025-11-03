# GitHub Pages Deployment Guide

This repository is configured to automatically deploy to GitHub Pages using GitHub Actions.

## Setup Instructions

To enable GitHub Pages deployment for this repository, follow these steps:

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

### 2. Automatic Deployment

Once GitHub Pages is enabled, the site will automatically deploy when:
- Code is pushed to the `main` branch
- You manually trigger the workflow from the Actions tab

### 3. Access Your Site

After the first successful deployment, your site will be available at:
```
https://levanijintcharadze.github.io/levanijintcharadze.dev/
```

Or if using a custom domain:
```
https://your-custom-domain.com
```

## How It Works

The deployment process uses a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. **Builds the project**: Runs `npm ci` and `npm run build` to create the production build
2. **Uploads artifacts**: Packages the `dist/` directory
3. **Deploys to GitHub Pages**: Automatically publishes the site

## Manual Deployment

To manually trigger a deployment:

1. Go to the **Actions** tab in your GitHub repository
2. Select the **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select the `main` branch
5. Click **Run workflow**

## Build Configuration

The site is built using Vite with the following configuration:
- Base path: `/` (root)
- Build output: `dist/` directory
- Assets are fingerprinted for optimal caching

## Troubleshooting

### Deployment fails
- Check the Actions tab for error logs
- Ensure all dependencies are correctly listed in `package.json`
- Verify that the build completes successfully locally with `npm run build`

### Site shows 404 or blank page
- Verify GitHub Pages is enabled in repository settings
- Check that the source is set to **GitHub Actions**
- Wait a few minutes for DNS propagation

### Assets not loading
- Verify the `base` configuration in `vite.config.ts`
- Check browser console for 404 errors
- Ensure all asset paths are relative or absolute from root

## Local Development

To test the site locally:

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

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS records with your domain provider
3. Enable HTTPS in repository settings

For more information, see [GitHub Pages documentation](https://docs.github.com/en/pages).
