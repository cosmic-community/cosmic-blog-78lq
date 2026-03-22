import Link from 'next/link';
import type { BlogPost } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import CategoryBadge from '@/components/CategoryBadge';

interface PostHeroProps {
  post: BlogPost;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PostHero({ post }: PostHeroProps) {
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const publishedDate = post.metadata?.published_date || post.metadata?.published_at || post.created_at;
  const author = post.metadata?.author;
  const category = post.metadata?.category;

  return (
    <article className="relative group">
      <div className="bg-gradient-to-br from-brand-50 via-white to-gray-50 rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
        <div className="p-8 sm:p-10 lg:p-12">
          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
              Featured
            </span>
            {category && (
              <CategoryBadge category={category} size="sm" />
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 group-hover:text-brand-700 transition-colors mb-4 leading-tight">
            <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0 relative">
              {post.title}
            </Link>
          </h2>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-base sm:text-lg text-gray-500 mb-6 max-w-2xl leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4">
            {author && (
              <div className="flex items-center gap-3">
                {author.metadata?.avatar?.imgix_url ? (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={author.title || 'Author'}
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center ring-2 ring-white">
                    <span className="text-sm font-semibold text-brand-700">
                      {(author.title || 'A').charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{author.title || 'Unknown Author'}</p>
                  <time
                    dateTime={publishedDate}
                    className="text-xs text-gray-400"
                  >
                    {formatDate(publishedDate)}
                  </time>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}