#!/bin/bash

# Script to clean up the gh-pages branch and set up proper GitHub Pages deployment
# Run this script from your local repository

echo "🧹 Cleaning up gh-pages branch and setting up GitHub Pages..."

# Switch to main branch
git checkout main

# Delete the gh-pages branch locally (if it exists)
git branch -D gh-pages 2>/dev/null || echo "gh-pages branch doesn't exist locally"

# Delete the gh-pages branch on remote
git push origin --delete gh-pages 2>/dev/null || echo "gh-pages branch doesn't exist on remote"

# Add and commit the new files
git add .github/workflows/deploy.yml
git add public/CNAME
git commit -m "Add GitHub Actions workflow and custom domain configuration"

# Push to main
git push origin main

echo "✅ Cleanup complete!"
echo ""
echo "Next steps:"
echo "1. Go to your repository settings on GitHub"
echo "2. Navigate to 'Pages' in the left sidebar"
echo "3. Under 'Source', select 'GitHub Actions'"
echo "4. Your website will be deployed automatically when you push to main"
echo "5. Configure your DNS settings for albertomonge.com to point to GitHub Pages"
echo ""
echo "DNS Configuration:"
echo "Create a CNAME record:"
echo "  Name: www"
echo "  Value: alberto-mr.github.io"
echo "  TTL: 3600"
echo ""
echo "Create an A record:"
echo "  Name: @"
echo "  Value: 185.199.108.153"
echo "  TTL: 3600"
echo ""
echo "Also create A records for:"
echo "  Name: @, Value: 185.199.109.153"
echo "  Name: @, Value: 185.199.110.153"
echo "  Name: @, Value: 185.199.111.153"
