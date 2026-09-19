'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

import { getWhatsAppUrl } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  locale: Locale;
  tooltipText: string;
}

export function WhatsAppButton({ locale, tooltipText }: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isAr = locale === 'ar';

  const whatsappUrl = getWhatsAppUrl(
    isAr
      ? 'مرحباً إسلام، أود الاستفسار عن خدماتك وتطوير مشروع تقني.'
      : "Hi Islam, I'd like to inquire about your services and technical solutions."
  );

  return (
    <div className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 flex items-center">
      {/* Hover Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: isAr ? -10 : 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: isAr ? -10 : 10 }}
            transition={{ duration: 0.15 }}
            className="hidden sm:block absolute whitespace-nowrap top-1/2 -translate-y-1/2 right-16 rtl:right-auto rtl:left-16 rounded-full border border-border/60 bg-background/95 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-md"
          >
            {tooltipText}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex size-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl transition-all hover:scale-110 hover:bg-emerald-700 active:scale-95"
        aria-label={tooltipText}
      >
        {/* Subtle glowing ring pulse */}
        <span className="absolute inset-0 -z-10 rounded-full bg-emerald-500/40 animate-ping opacity-60 pointer-events-none" />
        <MessageCircle className="size-7" />
      </a>
    </div>
  );
}
