'use client';

import { motion } from 'framer-motion';
import { Globe2, Lightbulb, Clock, ArrowRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface PainPointsProps {
  locale: Locale;
  dict: {
    painPoints: {
      badge: string;
      title: string;
      description: string;
      item1Title: string;
      item1Desc: string;
      item2Title: string;
      item2Desc: string;
      item3Title: string;
      item3Desc: string;
    };
  };
}

export function PainPoints({ locale, dict }: PainPointsProps) {
  const isAr = locale === 'ar';

  const painItems = [
    {
      icon: Globe2,
      number: '01',
      title: dict.painPoints.item1Title,
      description: dict.painPoints.item1Desc,
      solution: isAr ? 'الحل: واجهة رقمية احترافية تجذب عملائك وتعزز مصداقيتك' : 'Solution: A credible digital showcase that wins trust',
    },
    {
      icon: Lightbulb,
      number: '02',
      title: dict.painPoints.item2Title,
      description: dict.painPoints.item2Desc,
      solution: isAr ? 'الحل: هندسة تقنية متكاملة تنقل الفكرة إلى منتج حي مدر للمال' : 'Solution: End-to-end engineering turning ideas into revenue',
    },
    {
      icon: Clock,
      number: '03',
      title: dict.painPoints.item3Title,
      description: dict.painPoints.item3Desc,
      solution: isAr ? 'الحل: أتمتة الأنظمة وتوظيف الذكاء الاصطناعي لتوفير ساعات أسبوعياً' : 'Solution: Workflow automation & custom AI saving hours weekly',
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-b border-border/30 bg-background relative">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Column 1: Text / Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 lg:sticky lg:top-28 text-center lg:text-start flex flex-col items-center lg:items-start"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/30 px-4 py-1 text-xs font-medium text-muted-foreground mb-4">
              <span>{dict.painPoints.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground leading-[1.8] sm:leading-[1.9]">
              {(() => {
                const lines = dict.painPoints.title.split('\n');
                // button link to whatsapp

                const highlightWords = ['كلمني', 'Talk to me'];
                return lines.map((line, lineIndex) => {
                  const matched = highlightWords.find((w) => line.includes(w));
                  if (matched) {
                    const [before, after] = line.split(matched);
                    return (
                      <span key={lineIndex} className="block mt-1 sm:mt-2">
                        {before}
                        <span className="inline-block my-1 px-3 sm:px-4 py-0.5 sm:py-1 bg-white dark:bg-card text-primary font-black border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.7)] rotate-[-1.5deg] select-none transition-transform hover:rotate-0">
                          {matched}
                        </span>
                        {after}
                      </span>
                    );
                  }

                  return (
                    <span key={lineIndex} className="block">
                      {line}
                    </span>
                  );
                });
              })()}
            </h2>
            <p className="mt-6 sm:mt-8 text-sm sm:text-base text-muted-foreground leading-[1.9] sm:leading-[2.1] max-w-xl">
              {dict.painPoints.description}
            </p>
          </motion.div>

          {/* Column 2: Cards */}
          <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
            {painItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex flex-col justify-between rounded-3xl border border-border/60 bg-card/70 p-6 sm:p-7 shadow-xs backdrop-blur-xs transition-all hover:border-primary/50 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 sm:mb-5">
                      <div className="size-11 sm:size-12 rounded-2xl bg-destructive/10 dark:bg-destructive/15 text-destructive flex items-center justify-center">
                        <Icon className="size-5 sm:size-6" />
                      </div>
                      <span className="text-xl sm:text-2xl font-black font-mono text-muted-foreground/30">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-foreground leading-[1.8] sm:leading-[1.9]">
                      {item.title}
                    </h3>
                    <p className="mt-3.5 text-sm text-muted-foreground leading-[1.9] sm:leading-[2.1]">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/40">
                    <div className="text-xs font-medium text-primary flex items-center gap-1.5">
                      <ArrowRight className="size-3.5 rtl:rotate-180 shrink-0" />
                      <span>{item.solution}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
