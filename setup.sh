#!/bin/bash

echo "🚀 Setting up Heal project structure..."

# Create frontend directory if it doesn't exist
mkdir -p frontend

# Move frontend files to frontend directory
echo "📁 Moving frontend files..."
mv app frontend/ 2>/dev/null || true
mv components frontend/ 2>/dev/null || true
mv lib frontend/ 2>/dev/null || true
mv public frontend/ 2>/dev/null || true
mv styles frontend/ 2>/dev/null || true
mv hooks frontend/ 2>/dev/null || true
mv store frontend/ 2>/dev/null || true
mv screens frontend/ 2>/dev/null || true

# Move config files
mv next.config.js frontend/ 2>/dev/null || true
mv tailwind.config.ts frontend/ 2>/dev/null || true
mv components.json frontend/ 2>/dev/null || true
mv postcss.config.js frontend/ 2>/dev/null || true
mv next-env.d.ts frontend/ 2>/dev/null || true

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

echo "✅ Setup complete! You can now run:"
echo "  npm run dev:all    # Run both frontend and backend"
echo "  npm run dev        # Run frontend only"
echo "  npm run dev:server # Run backend only"