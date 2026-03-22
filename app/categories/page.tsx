import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories, getAllPosts, getMetafieldValue } from '@/lib/cosmic';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Categories — Cosmic Blog',
  description: 'Browse articles by topic and category on Cosmic Blog.',
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  technology: 'from-blue-500 to-blue-700',
  design: 'from-purple-500 to-purple-700',
  business: 'from-amber-500 to-amber-700',
  lifestyle: 'from-green-500 to-green-700',
  travel: 'from-teal-500 to-teal-700',
  food: 'from-orange-500 to-orange-700',
  health: 'from-rose-500 to-rose-700',
  science: 'from-cyan-500 to-cyan-700',
  default: 'from-gray-500 to-gray-700',
};

function getCategoryGradient(slug: string): string {
  return CATEGORY_GRADIENTS[slug] || CATEGORY_GRADIENTS['default'] || 'from-gray-500 to-gray-700';
}

const CATEGORY_EMOJIS: Record<string, string> = {
  technology: '💻',
  design: '🎨',
  business: '📊',
  lifestyle: '🌟',
  travel: '✈️',
  food: '🍳',
  health: '🏃',
  science: '🔬',
  default: '📂',
};

function getCategoryEmoji(slug: string): string {
  return CATEGORY_EMOJIS[slug] || CATEGORY_EMOJIS['default'] || '📂';
}

export default async function CategoriesPage() {
  const [categories, posts] = await Promise.all([
    getAllCategories(),
    getAllPosts(),
  ]);

  // Count posts per category
  const postCountMap: Record<string, number> = {};
  for (const post of posts) {
    const categoryId = post.metadata?.category?.id;
    if (categoryId) {
      postCountMap[categoryId] = (postCountMap[categoryId] || 0) + 1;
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
          <li className="text-gray-600">Categories</li>
        </ol>
      </nav>

      {/* Page Header */}
      <header className="pb-10 border-b border-gray-100 mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Categories
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">
          Browse articles organized by topic. Find exactly what interests you.
        </p>
      </header>

      {/* Categories Grid */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
          {categories.map((category) => {
            const description = getMetafieldValue(category.metadata?.description);
            const postCount = postCountMap[category.id] || 0;
            const gradient = getCategoryGradient(category.slug);
            const emoji = getCategoryEmoji(category.slug);

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300"
              >
                {/* Color header */}
                <div className={`h-2 bg-gradient-to-r ${gradient}`} />

                <div className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl" aria-hidden="true">{emoji}</span>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {postCount} {postCount === 1 ? 'article' : 'articles'}
                      </p>
                    </div>
                  </div>

                  {description && (
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {description}
                    </p>
                  )}

                  <div className="mt-4 pt-3 border-t border-gray-50">
                    <span className="text-xs font-medium text-brand-600 group-hover:text-brand-800 transition-colors">
                      View articles →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center">
          <span className="text-5xl mb-4 block">📂</span>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No categories yet</h2>
          <p className="text-gray-500">
            Add your first category in Cosmic CMS to organize your content.
          </p>
        </div>
      )}
    </div>
  );
}