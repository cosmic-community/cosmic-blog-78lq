import Link from 'next/link';
import { getMetafieldValue } from '@/lib/cosmic';

interface CategoryBadgeProps {
  category?: {
    title?: string;
    slug?: string;
  };
  size?: 'sm' | 'md';
  linked?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  technology: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  design: 'bg-purple-50 text-purple-700 ring-purple-600/20',
  business: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  lifestyle: 'bg-green-50 text-green-700 ring-green-600/20',
  travel: 'bg-teal-50 text-teal-700 ring-teal-600/20',
  food: 'bg-orange-50 text-orange-700 ring-orange-600/20',
  health: 'bg-rose-50 text-rose-700 ring-rose-600/20',
  science: 'bg-cyan-50 text-cyan-700 ring-cyan-600/20',
  default: 'bg-gray-50 text-gray-700 ring-gray-600/20',
};

function getCategoryColor(slug: string): string {
  return CATEGORY_COLORS[slug] || CATEGORY_COLORS['default'] || 'bg-gray-50 text-gray-700 ring-gray-600/20';
}

export default function CategoryBadge({ category, size = 'sm', linked = true }: CategoryBadgeProps) {
  if (!category || !category.title) return null;

  const title = getMetafieldValue(category.title);
  const slug = category.slug || '';
  const colorClasses = getCategoryColor(slug);

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-xs'
    : 'px-3 py-1 text-sm';

  const badge = (
    <span
      className={`inline-flex items-center rounded-full font-medium ring-1 ring-inset ${colorClasses} ${sizeClasses}`}
    >
      {title}
    </span>
  );

  if (linked && slug) {
    return (
      <Link href={`/categories/${slug}`} className="hover:opacity-80 transition-opacity">
        {badge}
      </Link>
    );
  }

  return badge;
}