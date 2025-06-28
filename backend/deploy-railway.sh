#!/bin/bash

echo "🚀 Deploying Heal Backend to Railway"
echo "===================================="

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway
echo "🔐 Please login to Railway..."
railway login

# Initialize Railway project
echo "🏗️ Initializing Railway project..."
railway init

# Add PostgreSQL database
echo "🗄️ Adding PostgreSQL database..."
railway add --database postgresql

# Deploy the application
echo "🚀 Deploying application..."
railway up

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your Railway dashboard"
echo "2. Set the following environment variables:"
echo "   - JWT_SECRET: Generate a strong secret key"
echo "   - ENVIRONMENT: production"
echo "3. Copy your Railway app URL"
echo "4. Update your Netlify environment variables:"
echo "   - NEXT_PUBLIC_API_URL: https://your-railway-app.railway.app/api/v1"
echo ""
echo "🔗 Your backend will be available at: https://your-app-name.railway.app"