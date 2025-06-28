# Heal Backend Deployment Guide

This guide covers deploying the Heal backend to various cloud platforms.

## 🚀 Quick Deployment Options

### Option 1: Railway (Recommended - Easiest)

**Why Railway?**
- ✅ Automatic Go detection
- ✅ Free tier available
- ✅ Built-in PostgreSQL
- ✅ Automatic HTTPS
- ✅ Environment variables UI

**Steps:**
1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Deploy**:
   ```bash
   cd backend
   railway login
   railway init
   railway up
   ```

3. **Add Environment Variables** in Railway dashboard:
   ```env
   DATABASE_URL=postgresql://... (auto-generated)
   JWT_SECRET=your-super-secret-jwt-key
   PORT=8080
   ENVIRONMENT=production
   ```

4. **Get your backend URL** from Railway dashboard

### Option 2: Render (Great Free Tier)

**Why Render?**
- ✅ Generous free tier
- ✅ Automatic deployments from Git
- ✅ Built-in PostgreSQL
- ✅ Custom domains

**Steps:**
1. **Connect Git Repository**:
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository
   - Select "Web Service"

2. **Configure Build**:
   - **Build Command**: `go build -o main .`
   - **Start Command**: `./main`
   - **Environment**: `Go`

3. **Set Environment Variables**:
   ```env
   PORT=8080
   ENVIRONMENT=production
   DATABASE_URL=postgresql://... (from Render PostgreSQL)
   JWT_SECRET=your-super-secret-jwt-key
   ```

### Option 3: Heroku (Classic Choice)

**Steps:**
1. **Install Heroku CLI**
2. **Deploy**:
   ```bash
   cd backend
   heroku create your-app-name
   heroku buildpacks:set heroku/go
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

3. **Add PostgreSQL**:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

### Option 4: Google Cloud Platform

**Steps:**
1. **Install Google Cloud SDK**
2. **Deploy**:
   ```bash
   cd backend
   gcloud app deploy
   ```

## 🗄️ Database Setup

### For Production (PostgreSQL)

1. **Update Database Connection** in `internal/database/database.go`:
   ```go
   // Change from SQLite to PostgreSQL
   import _ "github.com/lib/pq"
   
   // In Initialize function:
   db, err := sql.Open("postgres", databaseURL)
   ```

2. **Add PostgreSQL Driver**:
   ```bash
   go get github.com/lib/pq
   ```

3. **Update go.mod**:
   ```bash
   go mod tidy
   ```

### Environment Variables Required

```env
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Security
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Server
PORT=8080
ENVIRONMENT=production

# CORS (add your Netlify domain)
ALLOWED_ORIGINS=https://your-netlify-site.netlify.app,https://your-custom-domain.com
```

## 🔧 Quick Deploy Script

Make the deploy script executable and use it:

```bash
chmod +x deploy.sh
./deploy.sh railway  # or render, heroku, gcp
```

## 🌐 After Deployment

1. **Get your backend URL** (e.g., `https://your-app.railway.app`)

2. **Update Netlify Environment Variables**:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api/v1
   ```

3. **Test the API**:
   ```bash
   curl https://your-backend-url.com/health
   ```

## 🔒 Security Checklist

- [ ] Strong JWT secret (32+ characters)
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] CORS configured for your frontend domain
- [ ] Database connection encrypted
- [ ] Environment variables secured
- [ ] API rate limiting (consider adding)

## 📊 Monitoring

Most platforms provide built-in monitoring:
- **Railway**: Built-in metrics and logs
- **Render**: Application metrics
- **Heroku**: Heroku Metrics (paid)
- **GCP**: Cloud Monitoring

## 🆘 Troubleshooting

### Common Issues:

1. **Build Fails**:
   ```bash
   # Ensure go.mod is up to date
   go mod tidy
   ```

2. **Database Connection Issues**:
   - Check DATABASE_URL format
   - Ensure PostgreSQL driver is imported
   - Verify database is accessible

3. **CORS Errors**:
   - Add your Netlify domain to CORS origins
   - Check environment variables

4. **Port Issues**:
   - Ensure PORT environment variable is set
   - Use `os.Getenv("PORT")` in your code

### Logs:
```bash
# Railway
railway logs

# Heroku
heroku logs --tail

# Render
# Check logs in dashboard
```

## 💰 Cost Comparison

| Platform | Free Tier | Paid Plans | Database |
|----------|-----------|------------|----------|
| Railway | 500 hours/month | $5/month | PostgreSQL included |
| Render | 750 hours/month | $7/month | PostgreSQL $7/month |
| Heroku | 550 hours/month | $7/month | PostgreSQL $9/month |
| GCP | $300 credit | Pay-as-you-go | Cloud SQL varies |

**Recommendation**: Start with Railway or Render for the best free tier experience.