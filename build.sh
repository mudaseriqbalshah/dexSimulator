#!/bin/bash

# Build script for Netlify deployment
echo "Building frontend for static deployment..."

# Install dependencies
npm install

# Build the frontend only
npx vite build

# Copy redirects file for SPA routing
cp _redirects dist/public/

echo "Frontend build completed!"
echo "Files ready for deployment in dist/public/"