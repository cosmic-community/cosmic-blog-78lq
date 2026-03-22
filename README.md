# Cosmic Blog

![App Preview](https://imgix.cosmicjs.com/a50686e0-25b6-11f1-ba2e-d5dbf5f37b57-generated-1774160180551.jpg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, minimal blog platform built with Next.js 16 and powered by Cosmic CMS. Features beautiful typography, responsive design, and seamless content management.

## Features

- 📰 Homepage with featured hero post and recent articles grid
- 📖 Individual blog post pages with full content, author info, and category badges
- ✍️ Authors directory with avatars, bios, and post counts
- 📂 Category pages with filtering and dedicated category views
- 📱 Mobile-first responsive design
- ⚡ Server-side rendering with Next.js 16 App Router
- 🎨 Clean, modern aesthetic with Inter typography
- 🔍 SEO-optimized with proper metadata

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69bf88793ccddc0829d3ae12&clone_repository=69bf9006b1edda07c7b10783)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure with Blog Posts, Authors, and Categories object types.

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "Cosmic Blog". A modern blog website that displays blog posts, authors, and categories. Features include: a homepage with featured/recent posts, individual blog post pages with author info, an authors page showing all authors with their bios, category filtering, responsive mobile-first design, clean typography, and a modern minimal aesthetic. Use the existing Blog Posts, Authors, and Categories content types already in the CMS.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first styling
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS
- [@cosmicjs/sdk](https://www.npmjs.com/package/@cosmicjs/sdk) — Cosmic JavaScript SDK

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with Blog Posts, Authors, and Categories object types

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd cosmic-blog

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## Cosmic SDK Examples

### Fetching Blog Posts
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'blog-posts' })
  .props(['id', 'title', 'slug', 'metadata', 'created_at'])
  .depth(1)
```

### Fetching a Single Post by Slug
```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'blog-posts', slug: 'my-post-slug' })
  .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three Cosmic object types:

- **Blog Posts** (`blog-posts`) — Main content with fields for content, author, excerpt, published_date, category, and published_at
- **Authors** (`authors`) — Writer profiles with bio, email, and avatar fields
- **Categories** (`categories`) — Content organization with description field

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the project in [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add environment variables
5. Deploy
<!-- README_END -->