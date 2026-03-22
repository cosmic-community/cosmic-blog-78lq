import type { Metadata } from 'next';
import Link from 'next/link';
import { getAboutPage } from '@/lib/cosmic';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'About — Cosmic Blog',
  description: 'Learn more about our team and mission at Cosmic Blog.',
};

export default async function AboutPage() {
  const about = await getAboutPage();

  if (!about) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="pt-8 pb-4">
          <ol className="flex items-center gap-2 text-sm text-gray-400">
            <li>
              <Link href="/" className="hover:text-gray-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">·</li>
            <li className="text-gray-600">About</li>
          </ol>
        </nav>
        <section className="py-20 text-center">
          <span className="text-5xl mb-4 block">ℹ️</span>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">About page coming soon</h2>
          <p className="text-gray-500">
            Add your about page content in Cosmic CMS to get started.
          </p>
        </section>
      </div>
    );
  }

  const heading = about.metadata?.heading || about.title;
  const subheading = about.metadata?.subheading || '';
  const heroImage = about.metadata?.hero_image;
  const content = about.metadata?.content || '';
  const teamMembers = about.metadata?.team_members || [];

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
          <li className="text-gray-600">About</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <header className="pb-10 border-b border-gray-100 mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          {heading}
        </h1>
        {subheading && (
          <p className="text-lg text-gray-500 max-w-2xl">
            {subheading}
          </p>
        )}
      </header>

      {/* Hero Image */}
      {heroImage && (heroImage.imgix_url || heroImage.url) && (
        <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage.imgix_url || heroImage.url}
            alt={heading}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      {content && (
        <section className="max-w-3xl mb-16">
          <div
            className="prose prose-lg prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      )}

      {/* Team Members */}
      {Array.isArray(teamMembers) && teamMembers.length > 0 && (
        <section className="pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member: { id: string; slug: string; title: string; metadata?: { avatar?: { imgix_url?: string; url?: string }; bio?: string } }) => {
              const avatar = member.metadata?.avatar;
              const avatarUrl = avatar?.imgix_url || avatar?.url;

              return (
                <Link
                  key={member.id}
                  href={`/authors/${member.slug}`}
                  className="group flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl hover:bg-brand-50 transition-colors border border-gray-100 hover:border-brand-100"
                >
                  {avatarUrl ? (
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 ring-2 ring-gray-100 group-hover:ring-brand-200 transition-all">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={avatarUrl}
                        alt={member.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 flex items-center justify-center mb-4 text-3xl font-bold text-brand-600">
                      {member.title.charAt(0)}
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                    {member.title}
                  </h3>
                  {member.metadata?.bio && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                      {member.metadata.bio}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
