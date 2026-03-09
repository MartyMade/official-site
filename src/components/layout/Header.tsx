'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/data/siteConfig';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    setIsLightMode(html.classList.contains('light'));
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
      <header className="sticky top-0 z-50 bg-surface-950/90 backdrop-blur border-b border-surface-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="font-heading text-2xl font-bold text-primary-400">
              {siteConfig.name}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-surface-300 hover:text-primary-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={siteConfig.ctaLink.href}
                className="rounded-lg bg-primary-600 px-4 py-1.5 text-sm font-medium text-surface-50 hover:bg-primary-500 transition-colors"
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
