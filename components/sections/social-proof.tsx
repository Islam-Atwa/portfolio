'use client';

import { motion } from 'framer-motion';
import { Columns3Cog, Headset, Gauge } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface SocialProofProps {
  locale: Locale;
  dict: {
    socialProof: {
      stat1Desc: string;
      stat2Desc: string;
      stat3Desc: string;
    };
  };
}

export function SocialProof({ dict }: SocialProofProps) {
  const stats = [
    {
      Icon: Columns3Cog,
      desc: dict.socialProof.stat1Desc,
      iconColor: 'text-foreground dark:text-white',
      badgeBg: 'bg-foreground/5 dark:bg-white/10',
    },
    {
      Icon: Headset,
      desc: dict.socialProof.stat2Desc,
      iconColor: 'text-sky-500 dark:text-sky-400',
      badgeBg: 'bg-sky-500/10',
    },
    {
      Icon: Gauge,
      desc: dict.socialProof.stat3Desc,
      iconColor: 'text-emerald-500 dark:text-emerald-400',
      badgeBg: 'bg-emerald-500/10',
    },
  ];

  return (
    <section className="w-full py-4 sm:py-6 px-4 sm:px-6 relative z-10">
       
       
      <div className="w-full rounded-lg border border-border/80 dark:border-white/10 bg-muted/70 dark:bg-[#0e0f12] overflow-hidden">
        {/* 3-column grid with simple borders between each box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/80 dark:divide-white/10 rtl:sm:divide-x-reverse">
          {stats.map((stat, index) => {
            const Icon = stat.Icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="py-7 sm:py-9 px-6 sm:px-10 flex flex-col items-center justify-center text-center gap-3 transition-colors hover:bg-muted/40 dark:hover:bg-white/[0.02]"
              >
                {/* Prominent icon */}
                <div
                  className={`size-12 sm:size-14 rounded-2xl ${stat.badgeBg} flex items-center justify-center transition-transform duration-300 hover:scale-110`}
                >
                  <Icon className={`size-6 sm:size-7 ${stat.iconColor}`} />
                </div>

                {/* Descriptive label underneath */}
                <p className="text-xs sm:text-sm font-semibold text-foreground/90 dark:text-white/90 leading-snug max-w-[240px]">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
