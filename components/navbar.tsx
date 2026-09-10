'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import type { Locale } from '@/lib/i18n';

interface NavbarProps {
  locale: Locale;
  dict: {
    nav: {
      logo: string;
      services: string;
      projects: string;
      process: string;
      faq: string;
      contact: string;
      switchLang: string;
      themeLight: string;
      themeDark: string;
    };
  };
}

export function Navbar({ locale, dict }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAr = locale === 'ar';
  const otherLocale: Locale = isAr ? 'en' : 'ar';

  // Compute equivalent path for the opposite locale
  const switchLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  // Direct WhatsApp link for navbar contact CTA
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201005683716';
  const whatsappMessage = encodeURIComponent(
    isAr
      ? 'مرحباً إسلام، أود التواصل معك بخصوص مشروع جديد.'
      : "Hi Islam, I'd like to get in touch about a new project."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const navLinks = [
    { href: '#services', label: dict.nav.services },
    { href: '#projects', label: dict.nav.projects },
    { href: '#process', label: dict.nav.process },
    { href: '#faq', label: dict.nav.faq },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-colors">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link
          href={`/${locale}`}
          className="text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          {dict.nav.logo}
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <Link
            href={switchLocalePath}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-border hover:bg-accent/40 hover:text-foreground"
            title={dict.nav.switchLang}
          >
            <Globe className="size-3.5" />
            <span>{dict.nav.switchLang}</span>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle
            labelLight={dict.nav.themeLight}
            labelDark={dict.nav.themeDark}
          />

          {/* Desktop Contact CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button size="sm" className="rounded-full px-4 text-xs font-medium gap-1">
              <span>{dict.nav.contact}</span>
              <ArrowUpRight className="size-3.5 rtl:rotate-270" />
            </Button>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/40 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border/40 bg-background/95 backdrop-blur-lg px-4 pt-2 pb-6"
          >
            <nav className="flex flex-col space-y-3 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-accent/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button className="w-full rounded-full gap-1.5">
                    <span>{dict.nav.contact}</span>
                    <ArrowUpRight className="size-4 rtl:rotate-270" />
                  </Button>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
