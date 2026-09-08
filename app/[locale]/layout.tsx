import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales, isValidLocale, getDirection } from '@/lib/i18n';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    title: {
      default: isAr
        ? 'إسلام — مطور منتجات رقمية ووكلاء ذكاء اصطناعي'
        : 'Islam — Digital Products & AI Agents Developer',
      template: isAr ? '%s | إسلام' : '%s | Islam',
    },
    description: isAr
      ? 'تصميم وتطوير مواقع احترافية، أنظمة سحابية متكاملة، وحلول ذكاء اصطناعي مؤتمتة تدفع أعمالك إلى المستقبل.'
      : 'Designing and developing modern websites, cloud applications, and automated AI solutions.',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dir = getDirection(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={cn(inter.variable, cairo.variable, 'scroll-smooth')}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/15 selection:text-primary flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
