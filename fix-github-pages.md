# Fix GitHub Pages 404 Error

## The Problem
Your site shows "Your site is live at https://albertomonge.com/" but returns 404 because GitHub Pages isn't properly configured.

## Solution Steps

### 1. Configure GitHub Pages Source
1. Go to: https://github.com/alberto-mr/website/settings/pages
2. Under "Source", select **"Deploy from a branch"**
3. Branch: Select `gh-pages`
4. Folder: Select `/ (root)`
5. Click **"Save"**

### 2. Verify DNS Configuration
Make sure your DNS provider has these records:

**A Records (for apex domain):**
```
Name: @
Value: 185.199.108.153
TTL: 3600

Name: @  
Value: 185.199.109.153
TTL: 3600

Name: @
Value: 185.199.110.153
TTL: 3600

Name: @
Value: 185.199.111.153
TTL: 3600
```

**CNAME Record (for www subdomain):**
```
Name: www
Value: alberto-mr.github.io
TTL: 3600
```

### 3. Test Steps
1. After configuring GitHub Pages, wait 5-10 minutes
2. Test: https://alberto-mr.github.io (should work first)
3. Test: https://albertomonge.com (should work after DNS propagates)

### 4. Troubleshooting
- If still 404, check GitHub Actions tab for any failed deployments
- Clear browser cache or try incognito mode
- DNS changes can take up to 24 hours to propagate globally

## Current Status
✅ gh-pages branch contains correct website files
✅ CNAME file is properly configured
❌ GitHub Pages source not configured yet
❌ DNS may need verification
