# Vercel Deployment Guide

This guide will help you deploy the Wine-Beige-Web application to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Git repository (GitHub, GitLab, or Bitbucket)
- OpenAI API key

## Deployment Steps

### 1. Push Your Code to Git

Make sure all your changes are committed and pushed to your Git repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Import Project to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your Git provider and repository
4. Vercel will automatically detect the project settings

### 3. Configure Environment Variables

In the Vercel project settings, add the following environment variable:

| Name | Value |
|------|-------|
| `OPENAI_API_KEY` | Your OpenAI API key from `.env` file |

**Important:** Do not commit your `.env` file to Git. The environment variable must be set in Vercel's dashboard.

### 4. Deploy

Click "Deploy" and Vercel will:
- Install dependencies
- Run the build script
- Deploy your application

## Build Configuration

The project uses the following configuration (already set up in `vercel.json`):

- **Build Command**: Automatically runs `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Environment Variables Required

Make sure to set these in Vercel's dashboard under **Settings → Environment Variables**:

- `OPENAI_API_KEY` - Your OpenAI API key for the chat functionality

## Post-Deployment

After deployment:

1. Visit your deployment URL (e.g., `https://your-project.vercel.app`)
2. Test the interactive prompt interface in Task 3
3. Verify all sections load correctly

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify TypeScript compilation succeeds locally with `npm run check`

### Environment Variables Not Working

- Double-check the variable name is exactly `OPENAI_API_KEY`
- Redeploy after adding environment variables
- Check Vercel logs for any API errors

### 404 Errors

- Ensure `vercel.json` routing configuration is correct
- Check that static assets are being built properly

## Local Production Build Test

Before deploying, test the production build locally:

```bash
npm run build
npm start
```

Then visit `http://localhost:3000` to verify everything works.

## Continuous Deployment

Once set up, Vercel will automatically deploy:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Node.js on Vercel](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)
