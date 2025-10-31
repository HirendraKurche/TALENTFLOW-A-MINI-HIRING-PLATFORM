# Deploy TalentFlow to Render

## Prerequisites
1. A [Render](https://render.com) account (free tier available)
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. The project uses Vite for building

## Deployment Steps

### Step 1: Prepare Your Project

1. **Add a build script** - Already exists in `package.json`:
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

2. **Ensure `.gitignore` is properly configured**:
```
node_modules/
dist/
.env
.env.local
```

3. **Push your code to GitHub** (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/talentflow.git
git push -u origin main
```

### Step 2: Deploy to Render

#### Option A: Static Site (Recommended for Frontend-Only Apps)

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" → "Static Site"

2. **Connect Your Repository**
   - Select your Git provider (GitHub/GitLab/Bitbucket)
   - Choose your repository
   - Click "Connect"

3. **Configure Build Settings**
   ```
   Name: talentflow-hr-platform
   Branch: main
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. **Add Environment Variables** (if needed)
   - Click "Advanced"
   - Add any environment variables (none needed for this demo)

5. **Deploy**
   - Click "Create Static Site"
   - Render will build and deploy your app
   - You'll get a URL like: `https://talentflow-hr-platform.onrender.com`

#### Option B: Web Service (If You Need Server-Side Logic)

1. **Create a production server file** `server/prod.ts`:
```typescript
import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist
app.use(express.static(path.join(__dirname, '../dist')));

// Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

2. **Update `package.json`**:
```json
{
  "scripts": {
    "build": "vite build",
    "start": "node server/prod.js"
  }
}
```

3. **On Render Dashboard**
   - Click "New +" → "Web Service"
   - Connect repository
   - Configure:
     ```
     Name: talentflow
     Environment: Node
     Build Command: npm install && npm run build
     Start Command: npm start
     ```

### Step 3: Custom Domain (Optional)

1. In your Render dashboard, go to your site
2. Click "Settings" → "Custom Domain"
3. Add your domain and follow DNS instructions

### Step 4: Automatic Deployments

Render automatically deploys when you push to your main branch!

```bash
git add .
git commit -m "Update feature"
git push origin main
```

## Important Notes for This Project

### Frontend-Only Demo Considerations

Since TalentFlow uses:
- **MirageJS** for mock API
- **IndexedDB** for local storage
- **No real backend**

**Static Site deployment is perfect!**

### Build Optimization

The project is already configured with:
- ✅ Vite for fast builds
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Asset optimization

### Environment Variables

This demo doesn't need any environment variables, but if you add features that do:

```bash
# In Render Dashboard → Environment
VITE_API_URL=your_api_url
VITE_APP_NAME=TalentFlow
```

Remember: Vite requires `VITE_` prefix for client-side variables!

## Troubleshooting

### Build Fails
```bash
# Check your build locally first
npm run build
npm run preview
```

### Routes Don't Work (404 on refresh)
- Ensure "Publish Directory" is set to `dist`
- For static sites, Render handles SPA routing automatically

### Slow Build Times
- Free tier has limited resources
- Consider upgrading to paid tier for faster builds

## Alternative: Deploy to Other Platforms

### Vercel (Easiest)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages
1. Install gh-pages: `npm install -g gh-pages`
2. Add to package.json:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```
3. Run: `npm run build && npm run deploy`

## Post-Deployment Checklist

- [ ] Test all routes (/, /dashboard, /jobs, /candidates, /assessments)
- [ ] Verify theme toggle works
- [ ] Test candidate drag-and-drop on Kanban board
- [ ] Verify IndexedDB persistence (refresh page, data should remain)
- [ ] Test on mobile devices
- [ ] Share the link!

## Your Deployed URL

Once deployed, your app will be available at:
```
https://your-app-name.onrender.com
```

Or with custom domain:
```
https://talentflow.yourcompany.com
```

## Free Tier Limitations (Render)

- ⚠️ Sites spin down after 15 minutes of inactivity
- ⚠️ First load after sleep takes ~30 seconds
- ✅ Unlimited bandwidth
- ✅ Automatic SSL
- ✅ Automatic deployments from Git

For production use, consider upgrading to paid tier ($7/month).

---

**Need Help?** 
- Render Docs: https://render.com/docs/static-sites
- Vite Docs: https://vitejs.dev/guide/static-deploy.html
