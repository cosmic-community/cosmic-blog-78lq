// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAuthorBySlug, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic';
import PostCard from '@/components/PostCard';

export const revalidate = 60;

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return { title: 'Author Not Found' };
  }

  const bio = getMetafieldValue(author.metadata?.bio);

  return {
    title: `${author.title} — Cosmic Blog`,
    description: bio || `Articles by ${author.title} on Cosmic Blog`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(author.id);

  const bio = getMetafieldValue(author.metadata?.bio);
  const email = getMetafieldValue(author.metadata?.email);
  const avatarUrl = author.metadata?.avatar?.imgix_url;

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
            <Link href="/authors" className="hover:text-gray-600 transition-colors">
              Authors
            </Link>
          </li>
          <li aria-hidden="true">·</li>
          <li className="text-gray-600 truncate max-w-[200px]">{author.title}</li>
        </ol>
      </nav>

      {/* Author Profile */}
      <header className="pb-10 border-b border-gray-100 mb-10">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar */}
          {avatarUrl ? (
            <img
              src={`${avatarUrl}?w=256&h=256&fit=crop&auto=format,compress`}
              alt={author.title}
              width={128}
              height={128}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-gray-50 flex-shrink-0"
            />
          ) : (
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center ring-4 ring-gray-50 flex-shrink-0">
              <span className="text-4xl font-bold text-brand-700">
                {author.title.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              {author.title}
            </h1>
            {email && (
              <p className="text-sm text-gray-400 mb-3">{email}</p>
            )}
            {bio && (
              <p className="text-base text-gray-500 leading-relaxed max-w-xl">
                {bio}
              </p>
            )}
            <p className="mt-4 text-sm text-gray-400">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
            </p>
          </div>
        </div>
      </header>

      {/* Author's Posts */}
      {posts.length > 0 ? (
        <section className="pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Articles by {author.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ) : (
        <div className="py-16 text-center">
          <p className="text-gray-500">No articles published yet.</p>
        </div>
      )}
    </div>
  );
}