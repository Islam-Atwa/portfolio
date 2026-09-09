'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import type { Locale } from '@/lib/i18n';

interface FAQProps {
  locale: Locale;
  dict: {
    faq: {
      badge: string;
      title: string;
      description: string;
      q1: string;
      a1: string;
      q2: string;
      a2: string;
      q3: string;
      a3: string;
      q4: string;
      a4: string;
    };
  };
}

export function FAQ({ dict }: FAQProps) {
  const faqItems = [
    { id: 'item-1', q: dict.faq.q1, a: dict.faq.a1 },
    { id: 'item-2', q: dict.faq.q2, a: dict.faq.a2 },
    { id: 'item-3', q: dict.faq.q3, a: dict.faq.a3 },
    { id: 'item-4', q: dict.faq.q4, a: dict.faq.a4 },
  ];

  return (
    <section id="faq" className="py-20 sm:py-28 border-b border-border/30 bg-muted/15 relative">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-medium text-primary mb-4">
            <span>{dict.faq.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            {dict.faq.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {dict.faq.description}
          </p>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
        >
          <Accordion type="single" className="space-y-4">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger value={item.id}>{item.q}</AccordionTrigger>
                <AccordionContent value={item.id}>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
