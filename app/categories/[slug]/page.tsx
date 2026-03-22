// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategoryBySlug, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  const description = getMetafieldValue(category.metadata?.description);

  return {
    title: `${category.title} — Cosmic Blog`,
    description: description || `Browse ${category.title} articles on Cosmic Blog`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.id);
  const description = getMetafieldValue(category.metadata?.description);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="pt-8 pb-4">
        <ol className="flex items-center gap-2 text-sm text-gray-400">
          <li>
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">·</li>
          <li>
            <Link href="/categories" className="hover:text-gray-600 transition-colors">
              Categories
            </Link>
          </li>
          <li aria-hidden="true">·</li>
          <li className="text-gray-600 truncate max-w-[200px]">{category.title}</li>
        </ol>
      </nav>

      {/* Category Header */}
      <header className="pb-10 border-b border-gray-100 mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-600/20">
            Category
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          {category.title}
        </h1>
        {description && (
          <p className="text-lg text-gray-500 max-w-xl">
            {description}
          </p>
        )}
        <p className="mt-4 text-sm text-gray-400">
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} in this category
        </p>
      </header>

      {/* Posts Grid */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <span className="text-4xl mb-3 block">📭</span>
          <p className="text-gray-500 mb-6">
            No articles in this category yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors"
          >
            ← Browse all articles
          </Link>
        </div>
      )}
    </div>
  );
}