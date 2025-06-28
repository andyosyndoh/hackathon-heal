# 🚀 Backend Deployment Guide

## Quick Deploy to Railway (Recommended)

### 1. Prerequisites
- Git repository with your backend code
- Node.js installed (for Railway CLI)

### 2. Deploy Script
```bash
chmod +x deploy-railway.sh
./deploy-railway.sh
```

### 3. Manual Railway Deployment

#### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

#### Step 2: Login and Initialize
```bash
railway login
railway init
```

#### Step 3: Add Database
```bash
railway add --database postgresql
```

#### Step 4: Deploy
```bash
railway up
```

### 4. Set Environment Variables

In your Railway dashboard, add these environment variables:

```env
# Required
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
ENVIRONMENT=production
PORT=8080

# Database (automatically set by Railway)
DATABASE_URL=postgresql://... (auto-generated)

# Optional: CORS origins
ALLOWED_ORIGINS=https://your-netlify-site.netlify.app
```

### 5. Update Frontend

Update your Netlify environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-railway-app.railway.app/api/v1
```

## Alternative Deployment Options

### Option 1: Render
1. Connect your GitHub repository
2. Select "Web Service"
3. Build Command: `go build -o main .`
4. Start Command: `./main`
5. Add environment variables

### Option 2: Heroku
```bash
heroku create your-app-name
heroku buildpacks:set heroku/go
git push heroku main
heroku addons:create heroku-postgresql:mini
```

### Option 3: DigitalOcean App Platform
1. Connect repository
2. Select Go runtime
3. Set source directory to `backend`
4. Configure environment variables

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:port/db` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-key-32-chars-min` |
| `PORT` | Server port | `8080` |
| `ENVIRONMENT` | Environment mode | `production` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `https://yoursite.netlify.app` |

## Testing Your Deployment

1. **Health Check**: `curl https://your-app.railway.app/health`
2. **API Test**: `curl https://your-app.railway.app/api/v1/resources`

## Troubleshooting

### Build Fails
```bash
# Ensure dependencies are up to date
go mod tidy
```

### Database Connection Issues
- Check DATABASE_URL format
- Ensure PostgreSQL service is running
- Verify connection string

### CORS Errors
- Add your Netlify domain to ALLOWED_ORIGINS
- Check environment variables are set

## Cost Estimates

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| Railway | $5/month usage | Pay-as-you-go |
| Render | 750 hours/month | $7/month |
| Heroku | 550 hours/month | $7/month |

## Support

If you encounter issues:
1. Check Railway logs: `railway logs`
2. Verify environment variables
3. Test locally first: `go run main.go`