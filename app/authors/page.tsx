import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllAuthors, getAllPosts } from '@/lib/cosmic';
import AuthorCard from '@/components/AuthorCard';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Authors — Cosmic Blog',
  description: 'Meet the talented writers and creators behind Cosmic Blog.',
};

export default async function AuthorsPage() {
  const [authors, posts] = await Promise.all([
    getAllAuthors(),
    getAllPosts(),
  ]);

  // Count posts per author
  const postCountMap: Record<string, number> = {};
  for (const post of posts) {
    const authorId = post.metadata?.author?.id;
    if (authorId) {
      postCountMap[authorId] = (postCountMap[authorId] || 0) + 1;
    }
  }

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
          <li className="text-gray-600">Authors</li>
        </ol>
      </nav>

      {/* Page Header */}
      <header className="pb-10 border-b border-gray-100 mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Our Authors
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">
          Meet the talented writers and creators who bring stories and ideas to life.
        </p>
      </header>

      {/* Authors Grid */}
      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
          {authors.map((author) => (
            <AuthorCard
              key={author.id}
              author={author}
              postCount={postCountMap[author.id] || 0}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <span className="text-5xl mb-4 block">✍️</span>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No authors yet</h2>
          <p className="text-gray-500">
            Add your first author in Cosmic CMS to get started.
          </p>
        </div>
      )}
    </div>
  );
}