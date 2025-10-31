# Deployment Guide

This guide covers deploying TalentFlow to popular hosting platforms.

## Prerequisites

- Node.js 18+ installed locally
- Git repository with your code
- Account on chosen hosting platform

## Option 1: Vercel (Recommended)

Vercel provides the easiest deployment with automatic builds and preview deployments.

### Steps:

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via CLI**:
   ```bash
   cd entnt_replit
   vercel
   ```

3. **Or deploy via GitHub**:
   - Push code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

### Configuration:

Vercel should auto-detect these settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

## Option 2: Netlify

### Steps:

1. **Via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

2. **Via Netlify UI**:
   - Push code to GitHub/GitLab/Bitbucket
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import from Git"
   - Select your repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist/public`
   - Click "Deploy site"

### Configuration File (optional):

Create `netlify.toml` in project root:
```toml
[build]
  command = "npm run build"
  publish = "dist/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Option 3: GitHub Pages

### Steps:

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update vite.config.ts**:
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/', // Replace with your repo name
     // ... rest of config
   });
   ```

3. **Add deploy script to package.json**:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist/public"
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Click Save

## Option 4: Cloudflare Pages

### Steps:

1. **Via Cloudflare Dashboard**:
   - Push code to GitHub
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to Pages
   - Click "Create a project"
   - Connect to your Git repository
   - Configure build:
     - **Build command**: `npm run build`
     - **Build output directory**: `dist/public`
   - Click "Save and Deploy"

### Configuration File (optional):

Create `.cloudflare/pages.json`:
```json
{
  "build": {
    "command": "npm run build",
    "output": "dist/public"
  }
}
```

## Option 5: Railway

### Steps:

1. **Via Railway Dashboard**:
   - Go to [railway.app](https://railway.app)
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway auto-detects Node.js
   - Add environment variables if needed
   - Deploy

2. **Via Railway CLI**:
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   railway up
   ```

## Option 6: AWS Amplify

### Steps:

1. **Via AWS Console**:
   - Go to AWS Amplify Console
   - Click "Host web app"
   - Choose "Deploy without Git provider" or connect to GitHub
   - Configure:
     - **Build command**: `npm run build`
     - **Output directory**: `dist/public`
   - Deploy

2. **amplify.yml** (optional):
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist/public
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

## Option 7: Render

### Steps:

1. **Via Render Dashboard**:
   - Go to [render.com](https://render.com)
   - Click "New" → "Static Site"
   - Connect your repository
   - Configure:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist/public`
   - Create Static Site

## Post-Deployment Checklist

After deploying, verify:

- ✅ Homepage loads correctly
- ✅ Routing works (navigate to /jobs, /candidates, /assessments)
- ✅ Data persists in IndexedDB after refresh
- ✅ Drag-and-drop functionality works
- ✅ Forms submit successfully
- ✅ Error states display correctly
- ✅ Dark mode toggle works
- ✅ Mobile responsive design works

## Performance Optimization Tips

### 1. Enable Gzip/Brotli Compression
Most platforms enable this by default, but verify in your platform's settings.

### 2. Add Cache Headers
For Netlify, add to `netlify.toml`:
```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 3. Preload Critical Resources
Add to `index.html`:
```html
<link rel="preload" href="/assets/main.js" as="script">
```

### 4. Enable HTTP/2
Most modern platforms enable HTTP/2 by default.

## Troubleshooting

### Build Fails with "Out of Memory"

Increase Node.js memory:
```json
{
  "scripts": {
    "build": "NODE_OPTIONS=--max_old_space_size=4096 vite build"
  }
}
```

### Routing 404 Errors

Ensure your platform redirects all routes to `index.html` for client-side routing:

**Vercel** - Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify** - Use `_redirects` file in `public/`:
```
/*    /index.html   200
```

### Environment Variables

If you need to add environment variables later:

1. Create `.env.local` (not tracked in Git)
2. Add variables prefixed with `VITE_`:
   ```
   VITE_API_URL=https://api.example.com
   ```
3. Access in code:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```
4. Add to your platform's environment settings

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS

### Cloudflare Pages
1. Go to Custom Domains
2. Add domain
3. Cloudflare automatically handles DNS

## Monitoring & Analytics

### Add Analytics (Optional)

**Vercel Analytics**:
```bash
npm install @vercel/analytics
```

```typescript
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

**Google Analytics**:
Add to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Support

For platform-specific issues, refer to:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
- [GitHub Pages Docs](https://docs.github.com/en/pages)

---

**Pro Tip**: Use Vercel or Netlify for automatic preview deployments on every PR!
