import Link from 'next/link';
import { MessageCircle, Heart, Lock } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { getWhatsAppUrl } from '@/lib/whatsapp';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

interface FooterProps {
  locale: Locale;
  dict: {
    nav: {
      logo: string;
      services: string;
      projects: string;
      process: string;
      faq: string;
      contact: string;
    };
    footer: {
      rights: string;
      builtWith: string;
    };
  };
}

export function Footer({ locale, dict }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isAr = locale === 'ar';

  const navLinks = [
    { href: '#services', label: dict.nav.services },
    { href: '#projects', label: dict.nav.projects },
    { href: '#process', label: dict.nav.process },
    { href: '#faq', label: dict.nav.faq },
    { href: '#contact', label: dict.nav.contact },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/islam-atwa-79b37524a?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      icon: LinkedinIcon,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/islammandour026?utm_source=qr&stkn=YjVvM3kyNGt6NW1z',
      icon: InstagramIcon,
    },
    {
      name: 'WhatsApp',
      href: getWhatsAppUrl(),
      icon: MessageCircle,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Islam-Atwa',
      icon: GithubIcon,
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/40 bg-gradient-to-b from-background via-muted/20 to-muted/40 dark:from-background dark:via-card/20 dark:to-background pt-16 sm:pt-20 pb-12">
      {/* 1. Subtle Engineering Grid Background (matches Hero) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_50%,transparent_100%)] opacity-70"
        aria-hidden="true"
      />

      {/* 2. Soft Ambient Lighting Glow from top center */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 dark:bg-primary/15 blur-[120px] rounded-full"
        aria-hidden="true"
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-border/40">
          {/* Brand & Mission (Col 1-6) */}
          <div className="md:col-span-6 space-y-4">
            <Link
              href={`/${locale}`}
              className="inline-block text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground transition-opacity hover:opacity-85"
            >
              <span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text">
                {dict.nav.logo}
              </span>
            </Link>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
              {isAr
                ? 'تطوير منتجات رقمية، أنظمة سحابية، ووكلاء ذكاء اصطناعي بمعايير عالمية وأداء فائق.'
                : 'Building exceptional digital products, cloud platforms, and autonomous AI agents engineered for growth.'}
            </p>
          </div>

          {/* Quick Nav Links (Col 7-9) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {isAr ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center transition-colors hover:text-foreground hover:translate-x-0.5 rtl:hover:-translate-x-0.5 transition-transform duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Presence & Connect (Col 10-12) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {isAr ? 'تواصل معي' : 'Connect'}
            </h4>
            <div className="flex flex-wrap items-center gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group size-10 rounded-full border border-border/60 bg-card/80 dark:bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:scale-105 active:scale-95 transition-all shadow-sm"
                    aria-label={social.name}
                  >
                    <Icon className="size-[18px] transition-transform group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright, CMS Login Button, and Quality Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} {dict.nav.logo}. {dict.footer.rights}.</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border/70 bg-card/60 hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all duration-200 text-xs font-medium text-muted-foreground shadow-2xs group"
            >
              <Lock className="size-3 text-muted-foreground group-hover:text-primary transition-colors" />
              <span>{isAr ? 'تسجيل الدخول للنظام (CMS)' : 'CMS Login'}</span>
            </Link>

            <span className="hidden sm:inline text-border">|</span>

            <p className="flex items-center gap-1.5 text-muted-foreground">
              <span>{dict.footer.builtWith}</span>
              <Heart className="size-3.5 text-red-500 fill-red-500 transition-transform hover:scale-125 inline-block" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
