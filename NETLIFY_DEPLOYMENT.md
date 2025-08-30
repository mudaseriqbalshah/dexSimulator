# Netlify Deployment Guide

This DEX Price Simulator is configured for deployment on Netlify as a static single-page application.

🚀 **Live Demo**: https://lucky-paletas-e24559.netlify.app/

## Quick Deploy to Netlify

### Option 1: Deploy from Git Repository

1. **Push to GitHub/GitLab**
   - Push your code to a Git repository
   - Connect your repository to Netlify

2. **Netlify Settings**
   - Build command: `./build.sh`
   - Publish directory: `dist/public`
   - Node version: 20

### Option 2: Manual Deploy

1. **Build locally**
   ```bash
   npm install
   npx vite build
   ```

2. **Deploy the `dist/public` folder**
   - Drag and drop the `dist/public` folder to Netlify's deploy interface

## Configuration Files

- `netlify.toml` - Main Netlify configuration
- `build.sh` - Build script for Netlify
- `_redirects` - SPA routing redirects
- `.env.example` - Environment variables template

## Features Included

✅ **Single-Page Application Routing** - All routes handled by React  
✅ **Static Asset Optimization** - Proper caching headers  
✅ **Security Headers** - Basic security configuration  
✅ **Automatic Builds** - Builds on every Git push  
✅ **Client-Side Simulation** - No backend required  

## How It Works

The DEX simulator runs entirely in the browser:
- All price calculations happen client-side
- No backend API calls required
- Simulation state managed in React
- Real-time updates using React hooks

## Environment Variables

For static deployment, no environment variables are required. The app works completely offline.

If you need to add external APIs in the future:
1. Add variables prefixed with `VITE_` to Netlify environment settings
2. Update `.env.example` with the new variables

## Troubleshooting

**Build Fails**: Check that Node version is set to 20 in Netlify settings  
**Routes Don't Work**: Ensure the `_redirects` file is in the publish directory  
**Assets Missing**: Verify the publish directory is set to `dist/public`