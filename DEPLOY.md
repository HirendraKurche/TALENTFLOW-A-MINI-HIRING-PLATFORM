# 🚀 Quick Deployment Guide to Render

## Method 1: One-Click Deploy (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/talentflow.git
   git push -u origin main
   ```

2. **Deploy to Render**
   - Go to https://dashboard.render.com
   - Click **"New +"** → **"Static Site"**
   - Connect your GitHub repository
   - Render will auto-detect settings from `render.yaml`!
   - Click **"Create Static Site"**
   - Done! 🎉

## Method 2: Manual Configuration

If auto-detection doesn't work:

**Build Settings:**
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

## After Deployment

Your app will be live at: `https://your-app-name.onrender.com`

### Test These Features:
- ✅ Landing page loads
- ✅ Login/Demo button redirects to dashboard
- ✅ All routes work (/dashboard, /jobs, /candidates, /assessments)
- ✅ Theme toggle (light/dark mode)
- ✅ Kanban board drag-and-drop
- ✅ Data persists after refresh (IndexedDB)

## Custom Domain (Optional)

1. In Render dashboard → Settings → Custom Domain
2. Add your domain: `talentflow.yourcompany.com`
3. Update DNS records as instructed
4. SSL certificate auto-generated!

## Continuous Deployment

Every push to `main` branch automatically deploys:
```bash
git add .
git commit -m "Update feature"
git push origin main
```

## Free Tier Notes

- ⚠️ Site sleeps after 15 min inactivity
- ⚠️ First load after sleep: ~30 seconds
- ✅ Free SSL certificate
- ✅ Automatic Git deployments
- ✅ 100 GB bandwidth/month

## Upgrade to Paid ($7/month) for:
- 🚀 Always-on (no sleep)
- ⚡ Faster cold starts
- 📊 Advanced metrics

---

**Need help?** Check `DEPLOYMENT_RENDER.md` for detailed guide.
