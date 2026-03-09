import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';

export function Footer() {
  return (
    <footer className="bg-surface-900 text-surface-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Info */}
          <div>
            <h3 className="font-heading text-xl font-bold text-primary-400">
              {siteConfig.name}
            </h3>
            <p className="mt-2 text-surface-400">{siteConfig.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-surface-200 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-surface-400 hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-surface-200 mb-4">
              Contact
            </h4>
            <ul className="space-y-2 text-surface-400">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary-400 transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone}`} className="hover:text-primary-400 transition-colors">
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-10 flex gap-6 justify-center">
          {siteConfig.socials.instagram && (
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-400 hover:text-primary-400 transition-colors"
            >
              Instagram
            </a>
          )}
          {siteConfig.socials.facebook && (
            <a
              href={siteConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-400 hover:text-primary-400 transition-colors"
            >
              Facebook
            </a>
          )}
          {siteConfig.socials.youtube && (
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-400 hover:text-primary-400 transition-colors"
            >
              YouTube
            </a>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-surface-800 pt-6 text-center text-sm text-surface-500">
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
