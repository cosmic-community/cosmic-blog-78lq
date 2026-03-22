import Link from 'next/link';
import type { Author } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface AuthorCardProps {
  author: Author;
  postCount?: number;
}

export default function AuthorCard({ author, postCount }: AuthorCardProps) {
  const bio = getMetafieldValue(author.metadata?.bio);
  const email = getMetafieldValue(author.metadata?.email);
  const avatarUrl = author.metadata?.avatar?.imgix_url;

  return (
    <article className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-300">
      <div className="p-6 text-center">
        {/* Avatar */}
        <Link href={`/authors/${author.slug}`} className="inline-block mb-4">
          {avatarUrl ? (
            <img
              src={`${avatarUrl}?w=192&h=192&fit=crop&auto=format,compress`}
              alt={author.title}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-gray-50 group-hover:ring-brand-50 transition-all"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center mx-auto ring-4 ring-gray-50 group-hover:ring-brand-50 transition-all">
              <span className="text-2xl font-bold text-brand-700">
                {author.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </Link>

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-1">
          <Link href={`/authors/${author.slug}`}>
            {author.title}
          </Link>
        </h3>

        {/* Email */}
        {email && (
          <p className="text-xs text-gray-400 mb-3">{email}</p>
        )}

        {/* Bio */}
        {bio && (
          <p className="text-sm text-gray-500 line-clamp-3 mb-4">
            {bio}
          </p>
        )}

        {/* Post Count */}
        {postCount !== undefined && (
          <div className="pt-4 border-t border-gray-50">
            <Link
              href={`/authors/${author.slug}`}
              className="text-xs font-medium text-brand-600 hover:text-brand-800 transition-colors"
            >
              {postCount} {postCount === 1 ? 'article' : 'articles'} →
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}