// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPosts, getMetafieldValue } from '@/lib/cosmic';
import CategoryBadge from '@/components/CategoryBadge';

export const revalidate = 60;

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const excerpt = getMetafieldValue(post.metadata?.excerpt);

  return {
    title: `${post.title} — Cosmic Blog`,
    description: excerpt || `Read ${post.title} on Cosmic Blog`,
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = getMetafieldValue(post.metadata?.content) || post.content || '';
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const publishedDate = post.metadata?.published_date || post.metadata?.published_at || post.created_at;
  const author = post.metadata?.author;
  const category = post.metadata?.category;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="pt-8 pb-4">
        <ol className="flex items-center gap-2 text-sm text-gray-400">
          <li>
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true">·</li>
          <li className="text-gray-600 truncate max-w-[200px]">{post.title}</li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="pb-8 border-b border-gray-100">
        {/* Category & Date */}
        <div className="flex items-center gap-3 mb-4">
          {category && (
            <CategoryBadge category={category} size="md" />
          )}
          <time dateTime={publishedDate} className="text-sm text-gray-400">
            {formatDate(publishedDate)}
          </time>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
          {post.title}
        </h1>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            {excerpt}
          </p>
        )}

        {/* Author Info */}
        {author && (
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-50">
            <Link href={`/authors/${author.slug}`}>
              {author.metadata?.avatar?.imgix_url ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={author.title || 'Author'}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 hover:ring-brand-200 transition-all"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center ring-2 ring-gray-100 hover:ring-brand-200 transition-all">
                  <span className="text-lg font-bold text-brand-700">
                    {(author.title || 'A').charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </Link>
            <div>
              <Link
                href={`/authors/${author.slug}`}
                className="text-sm font-semibold text-gray-900 hover:text-brand-600 transition-colors"
              >
                {author.title || 'Unknown Author'}
              </Link>
              {author.metadata?.bio && (
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-md">
                  {getMetafieldValue(author.metadata.bio)}
                </p>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Article Content */}
      <article className="py-10">
        <div
          className="prose prose-lg prose-gray max-w-none post-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>

      {/* Back Link */}
      <div className="py-10 border-t border-gray-100">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-800 transition-colors"
        >
          ← Back to all articles
        </Link>
      </div>
    </div>
  );
}