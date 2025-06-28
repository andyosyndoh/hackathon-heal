#!/bin/bash

# Deployment script for various platforms

echo "🚀 Heal Backend Deployment Script"
echo "=================================="

# Check if platform is specified
if [ -z "$1" ]; then
    echo "Usage: ./deploy.sh [railway|render|heroku|gcp]"
    exit 1
fi

PLATFORM=$1

case $PLATFORM in
    "railway")
        echo "📡 Deploying to Railway..."
        if ! command -v railway &> /dev/null; then
            echo "Installing Railway CLI..."
            npm install -g @railway/cli
        fi
        railway login
        railway link
        railway up
        ;;
    
    "render")
        echo "🎨 Deploying to Render..."
        echo "Please push to your connected Git repository"
        echo "Render will automatically deploy from your main branch"
        ;;
    
    "heroku")
        echo "🟣 Deploying to Heroku..."
        if ! command -v heroku &> /dev/null; then
            echo "Please install Heroku CLI first"
            exit 1
        fi
        heroku create heal-backend-$(date +%s)
        heroku buildpacks:set heroku/go
        git add .
        git commit -m "Deploy to Heroku"
        git push heroku main
        ;;
    
    "gcp")
        echo "☁️ Deploying to Google Cloud Platform..."
        if ! command -v gcloud &> /dev/null; then
            echo "Please install Google Cloud SDK first"
            exit 1
        fi
        gcloud app deploy
        ;;
    
    *)
        echo "❌ Unknown platform: $PLATFORM"
        echo "Supported platforms: railway, render, heroku, gcp"
        exit 1
        ;;
esac

echo "✅ Deployment initiated for $PLATFORM"