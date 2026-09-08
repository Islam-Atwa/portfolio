import Link from 'next/link';
import { notFound } from 'next/navigation';
import { type Locale, isValidLocale, getDirection } from '@/lib/i18n';
import { getDictionary } from './dictionaries';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Globe, ArrowUpRight, CheckCircle2, Sparkles, Moon, Sun, Laptop } from 'lucide-react';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const dir = getDirection(locale);
  const otherLocale: Locale = locale === 'ar' ? 'en' : 'ar';
  const isAr = locale === 'ar';

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href={`/${locale}`}
            className="text-2xl font-bold tracking-tight text-foreground transition-colors hover:opacity-80"
          >
            {dict.nav.logo}
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <Link
              href={`/${otherLocale}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-border hover:bg-accent/40 hover:text-foreground"
              title={dict.nav.switchLang}
            >
              <Globe className="size-3.5" />
              <span>{dict.nav.switchLang}</span>
            </Link>

            {/* Dark/Light Mode Toggle */}
            <ThemeToggle
              labelLight={dict.nav.themeLight}
              labelDark={dict.nav.themeDark}
            />

            <Button
              size="sm"
              className="hidden sm:inline-flex rounded-full px-4 text-xs font-medium"
            >
              {dict.nav.contact}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section Preview */}
        <section className="relative overflow-hidden py-20 sm:py-28 md:py-36 border-b border-border/40 bg-gradient-to-b from-background via-background to-muted/20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-center">
            {/* Phase 1 Verification Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary mb-6">
              <Sparkles className="size-3.5" />
              <span>
                {isAr
                  ? 'المرحلة 1: البنية التحتية، تعدد اللغات (RTL/LTR) والوضع الليلي مكتملة بنجاح'
                  : 'Phase 1: Foundation, i18n (RTL/LTR) & Dark Mode Ready'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] sm:leading-[1.12]">
              {dict.hero.title}
            </h1>

            <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {dict.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-6 font-medium shadow-sm">
                {dict.hero.ctaContact}
                <ArrowUpRight className="size-4 rtl:rotate-270" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-6 font-medium"
              >
                {dict.hero.ctaProjects}
              </Button>
            </div>

            {/* Interactive Verification Cards */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-start">
              <div className="rounded-2xl border border-border/60 bg-card/60 p-5 shadow-xs backdrop-blur-xs">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="size-4" />
                  <span>{isAr ? 'دعم اللغتين والتوجيه' : 'Bilingual & Direction'}</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? `اللغة النشطة: العربية (${dir.toUpperCase()}) مع خط Cairo المخصص للنصوص العربية وتوجيه RTL تلقائي.`
                    : `Active locale: English (${dir.toUpperCase()}) with Inter typography and native LTR flow.`}
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/60 p-5 shadow-xs backdrop-blur-xs">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="size-4" />
                  <span>{isAr ? 'الوضع الليلي والنهاري' : 'Dark & Light Mode'}</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? 'تبديل سلس بين الوضعين مع حفظ التفضيل محلياً في المتصفح، متوافق مع نظام أبل للتصميم.'
                    : 'Instant theme switching powered by next-themes with persistent storage.'}
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/60 p-5 shadow-xs backdrop-blur-xs">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="size-4" />
                  <span>{isAr ? 'توجيه ذكي عبر Proxy' : 'Smart Proxy Routing'}</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {isAr
                    ? 'اكتشاف تلقائي للغة المتصفح عبر proxy.ts بدون أي بطء، مع حماية مسار لوحة التحكم.'
                    : 'Automated header-based locale matching using Next.js 16 proxy.ts.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Preview */}
        <section className="py-12 border-b border-border/40 bg-muted/10">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-2xl font-bold text-foreground">
                  {dict.socialProof.perfTitle}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {dict.socialProof.perfDesc}
                </div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-foreground">
                  {dict.socialProof.supportTitle}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {dict.socialProof.supportDesc}
                </div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-foreground">
                  {dict.socialProof.systemsTitle}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {dict.socialProof.systemsDesc}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 text-center text-xs text-muted-foreground">
        <div className="container mx-auto max-w-6xl px-4">
          <p>© {new Date().getFullYear()} {dict.nav.logo}. {dict.footer.rights}.</p>
          <p className="mt-1 opacity-75">{dict.footer.builtWith}</p>
        </div>
      </footer>
    </div>
  );
}
