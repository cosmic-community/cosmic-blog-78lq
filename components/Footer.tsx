import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl" aria-hidden="true">✦</span>
              <span className="text-lg font-bold text-gray-900 tracking-tight group-hover:text-brand-600 transition-colors">
                Cosmic Blog
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 max-w-xs">
              A modern blog platform powered by Cosmic CMS. Beautiful content, effortlessly managed.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Authors
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Powered By */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Powered By
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Cosmic CMS
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-400 text-center">
            © {currentYear} Cosmic Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}