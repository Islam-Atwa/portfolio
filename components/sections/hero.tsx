'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface HeroProps {
  locale: Locale;
  dict: {
    hero: {
      badge: string;
      title: string;
      description: string;
      ctaContact: string;
      ctaProjects: string;
      scrollDown?: string;
      statusTitle?: string;
      statusSubtitle?: string;
    };
  };
}

export function Hero({ locale, dict }: HeroProps) {
  const isAr = locale === 'ar';

  // Direct WhatsApp link for hero contact CTA
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201005683716';
  const whatsappMessage = encodeURIComponent(
    isAr
      ? 'مرحباً إسلام، أود التواصل معك بخصوص مشروع جديد.'
      : "Hi Islam, I'd like to get in touch about a new project."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-center py-16 sm:py-20 lg:py-24 border-b border-border/30 bg-background">
      {/* 1. Subtle Engineering Grid Background (matches reference screenshot) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* 2. Soft Ambient Lighting Glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[400px] bg-primary/10 dark:bg-primary/15 blur-[140px] rounded-full"
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs (7 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-center lg:text-start flex flex-col items-center lg:items-start"
          >
            {/* Category / Role Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary mb-6 backdrop-blur-md">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-primary" />
              </span>
              <span className="uppercase">{dict.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold tracking-tight text-foreground leading-[1.35] sm:leading-[1.25]">
              {(() => {
                const rawTitle = dict.hero.title;
                const hasDot = rawTitle.endsWith('.');
                const cleanTitle = hasDot ? rawTitle.slice(0, -1) : rawTitle;

                // Highlight target phrases in Arabic or English
                const highlightPhrases = ['نتائج استثنائية', 'Results'];
                const matchedPhrase = highlightPhrases.find((p) => cleanTitle.includes(p));

                if (matchedPhrase) {
                  const [before, after] = cleanTitle.split(matchedPhrase);
                  return (
                    <>
                      {before}
                      <span className="inline-block my-1 px-3 sm:px-4 py-0.5 sm:py-1 bg-white dark:bg-card text-primary font-black border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)] rotate-[-1.5deg] select-none transition-transform hover:rotate-0">
                        {matchedPhrase}
                        {hasDot && '.'}
                      </span>
                      {after}
                    </>
                  );
                }

                return (
                  <>
                    {cleanTitle}
                    {hasDot && <span className="text-primary font-black">.</span>}
                  </>
                );
              })()}
            </h1>

            {/* Subtitle Description */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {dict.hero.description}
            </p>

            {/* Action Buttons (matches reference pill style) */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
              {/* Primary Button */}
              <a href="#projects" className="group">
                <button
                  type="button"
                  className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium px-7 py-3.5 text-sm sm:text-base shadow-lg shadow-foreground/5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <span>{dict.hero.ctaProjects}</span>
                  <ArrowRight className="size-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>
              </a>

              {/* Secondary Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <button
                  type="button"
                  className="rounded-full border border-border/80 bg-background/50 hover:bg-accent/50 text-foreground font-medium px-7 py-3.5 text-sm sm:text-base backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <span>{dict.hero.ctaContact}</span>
                  <ArrowRight className="size-4 rtl:rotate-180 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>
              </a>
            </div>

            {/* Scroll Down Indicator */}
            <div className="mt-12 sm:mt-16 pt-4 hidden sm:flex items-center justify-center lg:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center gap-3 text-xs font-mono font-medium tracking-widest text-muted-foreground/70 hover:text-foreground transition-colors group"
              >
                {/* Mouse animation icon */}
                <div className="w-5 h-8 rounded-full border border-muted-foreground/40 group-hover:border-foreground/60 flex items-start justify-center p-1 transition-colors">
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    className="size-1 rounded-full bg-primary"
                  />
                </div>
                <span>{dict.hero.scrollDown || (isAr ? 'تمرير للأسفل' : 'SCROLL DOWN')}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Personal Photo in High-End Frame (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Sleek Outer Glow & Ambient Halo */}
            <div
              className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 rounded-[2.5rem] blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 -z-10"
              aria-hidden="true"
            />

            {/* Outer Frame Container */}
            <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2rem] sm:rounded-[2.5rem] border border-border/60 dark:border-white/10 bg-card/40 backdrop-blur-md p-2.5 shadow-2xl shadow-black/30 overflow-hidden group">
              {/* Inner Photo Wrapper */}
              <div className="relative w-full h-full rounded-[1.6rem] sm:rounded-[2.1rem] overflow-hidden bg-muted/40">
                <Image
                  src="/images/hero-photo.jpg"
                  alt={isAr ? 'إسلام عطوة - صورة شخصية' : 'Islam Atwa - Portrait'}
                  fill
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 420px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Subtle vignette/gradient overlay at bottom to smoothly ground the badge */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/25 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Floating Status Pill (Matches reference screenshot) */}
                <div className="absolute bottom-4 inset-x-4">
                  <div className="rounded-2xl border border-border/70 dark:border-white/15 bg-background/85 dark:bg-card/90 backdrop-blur-xl p-3.5 sm:p-4 shadow-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="relative flex size-2.5 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full size-2.5 bg-emerald-500" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                          {dict.hero.statusTitle || (isAr ? 'متاح لمشاريع جديدة' : 'Available for new projects')}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {dict.hero.statusSubtitle || (isAr ? 'لنصنع معاً شيئاً رائعاً' : "Let's build something amazing")}
                        </p>
                      </div>
                    </div>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={dict.hero.ctaContact}
                      className="size-9 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground flex items-center justify-center shrink-0 transition-colors shadow-sm"
                    >
                      <ArrowUpRight className="size-4 rtl:rotate-270" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
