'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sun, Moon, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/siteConfig';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const html = document.documentElement;
    setIsLightMode(html.classList.contains('light'));
  }, []);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('light')) {
      html.classList.remove('light');
      localStorage.removeItem('theme');
      setIsLightMode(false);
    } else {
      html.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsLightMode(true);
    }
  }

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 bg-surface-950/90 backdrop-blur border-b transition-shadow duration-300',
          scrolled ? 'border-surface-700 shadow-lg shadow-black/20' : 'border-surface-800'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="font-heading text-2xl font-bold text-primary-400">
              {siteConfig.name}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative text-sm transition-colors py-1',
                      isActive
                        ? 'text-primary-400'
                        : 'text-surface-300 hover:text-primary-400'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-primary-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
              <Link
                href={siteConfig.ctaLink.href}
                className="rounded-lg bg-primary-600 px-4 py-1.5 text-sm font-medium text-surface-50 hover:bg-primary-500 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {siteConfig.ctaLink.label}
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Dark/Light Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-surface-300 hover:text-primary-400 hover:bg-surface-800 transition-colors"
                aria-label="Toggle theme"
              >
                {isLightMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg text-surface-300 hover:text-primary-400 hover:bg-surface-800 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
