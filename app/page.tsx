import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/cosmic';
import PostHero from '@/components/PostHero';
import PostCard from '@/components/PostCard';
import CategoryBadge from '@/components/CategoryBadge';

export const revalidate = 60;

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="pt-12 pb-8">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
            Cosmic Blog
          </h1>
          <p className="text-lg text-gray-500 max-w-xl">
            Discover stories, ideas, and inspiration from our community of writers.
          </p>
        </div>

        {/* Categories Bar */}
        {categories.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mr-2">
              Topics:
            </span>
            {categories.map((cat) => (
              <CategoryBadge key={cat.id} category={cat} size="md" />
            ))}
          </div>
        )}

        {/* Featured Post */}
        {featuredPost && <PostHero post={featuredPost} />}
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="py-12 border-t border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
            {posts.length > 7 && (
              <span className="text-sm text-gray-400">
                Showing {recentPosts.length} of {posts.length - 1} articles
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <section className="py-20 text-center">
          <span className="text-5xl mb-4 block">📝</span>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h2>
          <p className="text-gray-500 mb-6">
            Add your first blog post in Cosmic CMS to get started.
          </p>
          <a
            href="https://app.cosmicjs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors text-sm"
          >
            Open Cosmic Dashboard →
          </a>
        </section>
      )}

      {/* Browse Sections */}
      <section className="py-12 border-t border-gray-100 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/authors"
            className="group flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-brand-50 transition-colors border border-gray-100 hover:border-brand-100"
          >
            <span className="text-3xl" aria-hidden="true">✍️</span>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                Meet Our Authors
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Discover the talented writers behind our content.
              </p>
            </div>
          </Link>
          <Link
            href="/categories"
            className="group flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-brand-50 transition-colors border border-gray-100 hover:border-brand-100"
          >
            <span className="text-3xl" aria-hidden="true">📂</span>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                Browse Categories
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Explore articles organized by topic and interest.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}