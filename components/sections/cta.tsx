'use client';

import { motion } from 'framer-motion';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Locale } from '@/lib/i18n';

interface CTAProps {
  locale: Locale;
  dict: {
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
}

export function CTA({ locale, dict }: CTAProps) {
  const isAr = locale === 'ar';
  // Allow configuring WhatsApp number via environment variable or default
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201000000000';
  const whatsappMessage = encodeURIComponent(
    isAr
      ? 'مرحباً إسلام، أود مناقشة مشروع جديد معك.'
      : "Hi Islam, I'd like to discuss a new project with you."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-20 sm:py-28 relative overflow-hidden bg-background">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/10 blur-[140px] rounded-full"
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-primary/30 bg-gradient-to-b from-card to-card/60 p-8 sm:p-14 text-center shadow-2xl backdrop-blur-md"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-6">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{isAr ? 'جاهز للاستشارات والمشاريع الجديدة' : 'Ready for New Collaborations'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] max-w-2xl mx-auto">
            {dict.cta.title}
          </h2>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {dict.cta.description}
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="rounded-full px-8 font-semibold shadow-lg gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <MessageCircle className="size-5" />
                <span>{dict.cta.button}</span>
                <ArrowUpRight className="size-4 rtl:rotate-270" />
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
