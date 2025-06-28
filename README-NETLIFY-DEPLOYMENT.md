# 🚀 Netlify Full-Stack Deployment Guide

This guide covers deploying both the frontend and backend to Netlify using Netlify Functions for a complete serverless solution.

## 🌟 What's Included

### **Frontend (Next.js)**
- Static site generation with Next.js
- Optimized for Netlify hosting
- Automatic deployments from Git

### **Backend (Netlify Functions)**
- Serverless Node.js functions
- SQLite database (in-memory for functions)
- JWT authentication
- Full API compatibility with Go backend

## 🚀 Quick Deployment Steps

### **1. Prepare Your Repository**

Ensure your code is committed and pushed to GitHub/GitLab/Bitbucket:

```bash
git add .
git commit -m "Add Netlify Functions backend"
git push origin main
```

### **2. Deploy to Netlify**

#### **Option A: Netlify Dashboard (Recommended)**

1. **Go to [Netlify](https://netlify.com)** and sign up/login
2. **Click "New site from Git"**
3. **Connect your Git provider** (GitHub, GitLab, or Bitbucket)
4. **Select your repository**
5. **Configure build settings**:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Functions directory**: `netlify/functions` (auto-detected)

#### **Option B: Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from project root
netlify deploy --prod
```

### **3. Set Environment Variables**

In Netlify dashboard → Site settings → Environment variables, add:

```env
# AI Services (Required for full functionality)
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key-here
NEXT_PUBLIC_ELEVENLABS_API_KEY=your-elevenlabs-api-key-here

# Video Services (Required for video chat)
NEXT_PUBLIC_TAVUS_API_KEY=your-tavus-api-key-here
NEXT_PUBLIC_DAILY_API_KEY=your-daily-api-key-here

# Backend API (Auto-configured)
NEXT_PUBLIC_API_URL=https://your-site-name.netlify.app/api/v1

# Security (Required)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long

# Node Version
NODE_VERSION=18
```

### **4. Update API URL**

The `netlify.toml` file automatically configures the API URL, but you can verify it's correct:

```env
# For production
NEXT_PUBLIC_API_URL=https://your-site-name.netlify.app/api/v1

# For deploy previews (automatic)
NEXT_PUBLIC_API_URL=https://deploy-preview-{REVIEW_ID}--your-site-name.netlify.app/api/v1
```

## 🔧 **Backend Architecture**

### **Netlify Functions Structure**

```
netlify/functions/
├── auth/
│   ├── register.js          # User registration
│   ├── login.js             # User login
│   └── logout.js            # User logout
├── chat/
│   ├── message.js           # Send/receive chat messages
│   ├── history.js           # Get chat history
│   └── sessions.js          # Manage chat sessions
├── user/
│   ├── stats.js             # User statistics
│   └── mood.js              # Mood logging and history
├── resources/
│   └── index.js             # Mental health resources
└── health.js                # Health check endpoint
```

### **Database**

- **Development**: SQLite in-memory database
- **Production**: SQLite with persistent storage in `/tmp`
- **Automatic**: Tables created on first function execution
- **Migration**: Sample data inserted automatically

### **API Endpoints**

All endpoints are automatically mapped via `netlify.toml`:

```
Frontend URL: https://your-site.netlify.app
Backend API:  https://your-site.netlify.app/api/v1

Health Check: GET  /api/v1/health
Auth:         POST /api/v1/auth/register
              POST /api/v1/auth/login
              POST /api/v1/auth/logout
Chat:         POST /api/v1/chat/message
              GET  /api/v1/chat/history
              GET  /api/v1/chat/sessions
User:         GET  /api/v1/user/stats
              POST /api/v1/user/mood
              GET  /api/v1/user/mood-history
Resources:    GET  /api/v1/resources
```

## 🔒 **Security Features**

### **Authentication**
- JWT tokens with configurable secret
- Bcrypt password hashing (12 rounds)
- Token verification on protected endpoints

### **CORS**
- Configured for all origins (development)
- Restrict in production by updating function headers

### **Data Protection**
- User data isolation
- SQL injection prevention
- Input validation

## 🚀 **Performance Optimizations**

### **Frontend**
- Static site generation
- Automatic code splitting
- Image optimization
- CDN distribution

### **Backend**
- Serverless functions (cold start optimized)
- Database connection reuse
- Efficient SQL queries
- Minimal dependencies

## 🔧 **Development Workflow**

### **Local Development**

```bash
# Install dependencies
npm install

# Start frontend (development)
npm run dev

# Test Netlify Functions locally
netlify dev
```

### **Testing Functions**

```bash
# Test health endpoint
curl https://your-site.netlify.app/api/v1/health

# Test registration
curl -X POST https://your-site.netlify.app/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","confirmPassword":"password123","firstName":"Test","lastName":"User"}'
```

## 📊 **Monitoring & Debugging**

### **Netlify Dashboard**
- Function logs and analytics
- Build logs and deployment status
- Performance metrics
- Error tracking

### **Function Logs**
```bash
# View function logs
netlify functions:log

# View specific function
netlify functions:log --name=auth-register
```

## 🔄 **Database Persistence**

### **Current Setup**
- SQLite database in `/tmp` directory
- Data persists during function execution
- Automatic table creation and sample data

### **Production Considerations**
For production, consider upgrading to:
- **Netlify Blobs** for file storage
- **PlanetScale** for MySQL
- **Supabase** for PostgreSQL
- **FaunaDB** for serverless database

## 🌐 **Custom Domain Setup**

1. **In Netlify dashboard** → Domain settings
2. **Add your custom domain**
3. **Configure DNS** as instructed
4. **Update environment variables**:
   ```env
   NEXT_PUBLIC_API_URL=https://your-domain.com/api/v1
   ```

## 🔧 **Troubleshooting**

### **Common Issues**

1. **Function Timeout**
   - Functions have 10-second timeout on free plan
   - Optimize database queries
   - Consider function warming

2. **Database Connection**
   - Check `/tmp` directory permissions
   - Verify SQLite installation
   - Review function logs

3. **CORS Errors**
   - Verify CORS headers in functions
   - Check API URL configuration
   - Test with browser dev tools

4. **Environment Variables**
   - Ensure all required variables are set
   - Check variable names (case-sensitive)
   - Redeploy after changes

### **Debug Commands**

```bash
# Check build logs
netlify logs

# Test function locally
netlify functions:invoke auth-register --payload='{"email":"test@test.com"}'

# Check environment
netlify env:list
```

## 💰 **Cost Considerations**

### **Netlify Free Tier**
- **Bandwidth**: 100GB/month
- **Build minutes**: 300 minutes/month
- **Functions**: 125,000 requests/month
- **Function runtime**: 100 hours/month

### **Scaling Options**
- **Pro Plan**: $19/month for increased limits
- **Business Plan**: $99/month for team features
- **Enterprise**: Custom pricing for large scale

## 🚀 **Go-Live Checklist**

- [ ] Repository connected to Netlify
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] JWT secret configured (strong, 32+ characters)
- [ ] API keys added for AI services
- [ ] Custom domain configured (optional)
- [ ] CORS settings reviewed
- [ ] Function logs monitored
- [ ] Health check endpoint tested
- [ ] User registration/login tested
- [ ] Chat functionality verified

## 🔄 **Deployment Updates**

### **Automatic Deployments**
- Push to main branch triggers deployment
- Deploy previews for pull requests
- Branch deployments for feature branches

### **Manual Deployments**
```bash
# Deploy specific branch
netlify deploy --prod --dir=out

# Deploy with functions
netlify deploy --prod --functions=netlify/functions
```

## 📞 **Support**

### **Netlify Resources**
- [Netlify Functions Documentation](https://docs.netlify.com/functions/overview/)
- [Netlify Community Forum](https://community.netlify.com/)
- [Netlify Support](https://www.netlify.com/support/)

### **Project Support**
- Check function logs in Netlify dashboard
- Review build logs for deployment issues
- Test API endpoints with curl or Postman
- Monitor function performance and errors

---

**🎉 Congratulations!** Your full-stack mental health platform is now deployed on Netlify with both frontend and backend running serverlessly. The platform includes all the features of the Go backend while being optimized for Netlify's infrastructure.