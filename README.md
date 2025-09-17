# Personal Website - Astro Migration

This is the migrated version of Alberto Monge Roffarello's personal website from Jekyll to Astro.

## Migration Summary

The website has been successfully migrated from Jekyll to Astro with the following features:

### ✅ Completed Migrations

1. **Project Structure**: Converted from Jekyll to Astro project structure
2. **Content**: Migrated all blog posts and pages to Astro format
3. **Styling**: Converted SCSS to CSS and maintained Bootstrap 5 integration
4. **Assets**: All static assets (images, PDFs, videos) copied to public directory
5. **Navigation**: Recreated navigation structure with dropdown menus
6. **Blog System**: Implemented content collections for blog posts
7. **RSS Feed**: Added RSS feed generation
8. **Sitemap**: Automatic sitemap generation

### 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Head.astro      # HTML head component
│   ├── Header.astro    # Navigation header
│   └── Footer.astro    # Site footer
├── content/            # Content collections
│   └── posts/          # Blog posts
├── data/               # Site data and configuration
│   ├── site.ts         # Site metadata
│   └── navigation.ts   # Navigation structure
├── layouts/            # Page layouts
│   └── BaseLayout.astro
├── pages/              # Static pages and dynamic routes
│   ├── blog/           # Blog pages
│   ├── eud*/           # EUD research pages
│   ├── dwb*/           # Digital wellbeing pages
│   └── *.astro         # Other pages
└── styles/             # CSS styles
    └── main.css
```

### 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

### 📝 Content Management

- **Blog Posts**: Add new posts in `src/content/posts/` with proper frontmatter
- **Pages**: Create new pages in `src/pages/` directory
- **Navigation**: Update `src/data/navigation.ts` for menu changes
- **Site Data**: Modify `src/data/site.ts` for site-wide settings

### 🔧 Key Features

- **Static Site Generation**: Fast, SEO-friendly static site
- **Content Collections**: Type-safe content management
- **Bootstrap 5**: Responsive design framework
- **RSS Feed**: Automatic RSS feed generation at `/rss.xml`
- **Sitemap**: Automatic sitemap generation
- **Markdown Support**: Full markdown support for blog posts

### 📋 Migration Notes

- All original Jekyll content has been preserved
- Bootstrap 5 integration maintained
- Responsive design preserved
- All links and navigation updated for Astro routing
- Assets moved to `public/` directory
- SCSS converted to regular CSS

### 🌐 Deployment

The site can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build output is in the `dist/` directory after running `npm run build`.

### 📚 Original Jekyll Site

The original Jekyll site is preserved in `/Users/alberto/Documents/Websites/personal_website/` for reference.