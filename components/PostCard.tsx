import Link from 'next/link';
import type { BlogPost } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';
import CategoryBadge from '@/components/CategoryBadge';

interface PostCardProps {
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

export default function PostCard({ post }: PostCardProps) {
  const excerpt = getMetafieldValue(post.metadata?.excerpt);
  const publishedDate = post.metadata?.published_date || post.metadata?.published_at || post.created_at;
  const author = post.metadata?.author;
  const category = post.metadata?.category;

  return (
    <article className="group flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300">
      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Category & Date */}
        <div className="flex items-center gap-3 mb-3">
          {category && (
            <CategoryBadge category={category} size="sm" />
          )}
          <time
            dateTime={publishedDate}
            className="text-xs text-gray-400"
          >
            {formatDate(publishedDate)}
          </time>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-2 line-clamp-2">
          <Link href={`/posts/${post.slug}`} className="after:absolute after:inset-0 relative">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
            {excerpt}
          </p>
        )}

        {/* Author */}
        {author && (
          <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-50">
            {author.metadata?.avatar?.imgix_url ? (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={author.title || 'Author'}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-brand-100 flex items-center justify-center">
                <span className="text-xs font-medium text-brand-700">
                  {(author.title || 'A').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-xs text-gray-500 font-medium">
              {author.title || 'Unknown Author'}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}