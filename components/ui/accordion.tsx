'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextType | null>(null);

export function Accordion({
  children,
  className,
  type = 'single',
}: {
  children: React.ReactNode;
  className?: string;
  type?: 'single' | 'multiple';
}) {
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const toggleItem = (value: string) => {
    if (type === 'single') {
      setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
    } else {
      setOpenItems((prev) =>
        prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn('space-y-4', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border/60 bg-card/70 backdrop-blur-xs transition-colors overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
}

export function AccordionTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionTrigger must be used inside Accordion');

  const isOpen = ctx.openItems.includes(value);

  return (
    <button
      type="button"
      onClick={() => ctx.toggleItem(value)}
      aria-expanded={isOpen}
      className={cn(
        'flex w-full items-center justify-between p-5 sm:p-6 text-start font-bold text-foreground text-base sm:text-lg transition-colors hover:text-primary cursor-pointer',
        className
      )}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          'size-5 text-muted-foreground shrink-0 transition-transform duration-300',
          isOpen && 'rotate-180 text-primary'
        )}
      />
    </button>
  );
}

export function AccordionContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ctx = React.useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionContent must be used inside Accordion');

  const isOpen = ctx.openItems.includes(value);

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className={cn('px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-muted-foreground leading-relaxed', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
