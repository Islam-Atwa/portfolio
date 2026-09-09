import Link from 'next/link';
import { Mail, MessageCircle, Heart } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
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
      name: 'GitHub',
      href: 'https://github.com/Islam-Atwa',
      icon: GithubIcon,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: LinkedinIcon,
    },
    {
      name: 'Email',
      href: 'mailto:contact@example.com',
      icon: Mail,
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201000000000'}`,
      icon: MessageCircle,
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-background/50 pt-16 pb-12">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-border/40">
          {/* Brand & Mission */}
          <div className="md:col-span-6">
            <Link
              href={`/${locale}`}
              className="text-2xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
            >
              {dict.nav.logo}
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-md leading-relaxed">
              {isAr
                ? 'تطوير منتجات رقمية، أنظمة سحابية، ووكلاء ذكاء اصطناعي بمعايير عالمية وأداء فائق.'
                : 'Building exceptional digital products, cloud platforms, and autonomous AI agents engineered for growth.'}
            </p>
          </div>

          {/* Nav Anchor Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              {isAr ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Presence */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
              {isAr ? 'تواصل معي' : 'Connect'}
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-10 rounded-full border border-border/60 bg-card/60 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                    aria-label={social.name}
                  >
                    <Icon className="size-4.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright and Quality Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} {dict.nav.logo}. {dict.footer.rights}.</p>
          <p className="flex items-center gap-1.5 opacity-80">
            <span>{dict.footer.builtWith}</span>
            <Heart className="size-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
