'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, FileCode, Rocket, CheckCircle2 } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface HowIWorkProps {
  locale: Locale;
  dict: {
    howIWork: {
      badge: string;
      title: string;
      description: string;
      step1Num: string;
      step1Title: string;
      step1Desc: string;
      step2Num: string;
      step2Title: string;
      step2Desc: string;
      step3Num: string;
      step3Title: string;
      step3Desc: string;
      step4Num: string;
      step4Title: string;
      step4Desc: string;
    };
  };
}

export function HowIWork({ locale, dict }: HowIWorkProps) {
  const [activeStep, setActiveStep] = useState(0);
  const isAr = locale === 'ar';

  const steps = [
    {
      num: dict.howIWork.step1Num,
      title: dict.howIWork.step1Title,
      description: dict.howIWork.step1Desc,
      icon: Search,
      deliverables: isAr
        ? ['تحليل المتطلبات وأهداف العمل', 'دراسة تجربة وسلوك المستخدم', 'تحديد نطاق العمل والمواصفات']
        : ['Requirements & business goal discovery', 'User experience & behavior research', 'Scope definition & technical spec'],
    },
    {
      num: dict.howIWork.step2Num,
      title: dict.howIWork.step2Title,
      description: dict.howIWork.step2Desc,
      icon: Compass,
      deliverables: isAr
        ? ['هندسة معمارية سحابية متقدمة', 'اختيار أنسب أطر العمل والتقنيات', 'مقارنة الحلول واختيار أفضل اتجاه']
        : ['Advanced cloud architecture design', 'Optimal tech stack selection', 'Solution benchmarking & direction lock'],
    },
    {
      num: dict.howIWork.step3Num,
      title: dict.howIWork.step3Title,
      description: dict.howIWork.step3Desc,
      icon: FileCode,
      deliverables: isAr
        ? ['تصميم واجهات المستخدم الفاخرة (UI/UX)', 'مخططات قواعد البيانات وتدفق البيانات', 'خطة تنفيذ مرحلية واضحة']
        : ['Museum-grade UI/UX interactive wireframes', 'Database schemas & data flows', 'Milestone-based execution roadmap'],
    },
    {
      num: dict.howIWork.step4Num,
      title: dict.howIWork.step4Title,
      description: dict.howIWork.step4Desc,
      icon: Rocket,
      deliverables: isAr
        ? ['تطوير عالي الأداء مع كود نظيف', 'اختبارات شاملة وتوافق كامل', 'إطلاق حي مع دعم وضمان مستمر']
        : ['Clean, high-performance production code', 'Rigorous testing & QA validation', 'Live deployment with ongoing warranty'],
    },
  ];

  return (
    <section id="process" className="py-20 sm:py-28 border-b border-border/30 bg-muted/15 relative">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-medium text-primary mb-4">
            <span>{dict.howIWork.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            {dict.howIWork.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {dict.howIWork.description}
          </p>
        </div>

        {/* Step Navigation Bar / Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            return (
              <button
                key={index}
                type="button"
                onClick={() => setActiveStep(index)}
                className={`relative flex flex-col items-start p-4 sm:p-5 rounded-2xl border text-start transition-all cursor-pointer ${
                  isActive
                    ? 'border-primary bg-card shadow-md text-foreground'
                    : 'border-border/60 bg-card/40 hover:bg-card/70 text-muted-foreground'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span
                    className={`font-mono text-sm font-bold ${
                      isActive ? 'text-primary' : 'text-muted-foreground/60'
                    }`}
                  >
                    {step.num}
                  </span>
                  <div
                    className={`size-8 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon className="size-4" />
                  </div>
                </div>

                <div className="text-xs sm:text-sm font-bold line-clamp-1">
                  {step.title.split('—')[0].trim()}
                </div>

                {/* Animated active indicator pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeStepLine"
                    className="absolute bottom-0 inset-x-0 h-1 bg-primary rounded-b-2xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Details Card */}
        <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {steps[activeStep].num}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    {steps[activeStep].title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {steps[activeStep].description}
                </p>

                {/* Key Deliverables */}
                <div className="mt-8 pt-6 border-t border-border/40">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                    {isAr ? 'المخرجات الرئيسية لهذه المرحلة:' : 'Key deliverables for this phase:'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {steps[activeStep].deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs sm:text-sm text-foreground/90"
                      >
                        <CheckCircle2 className="size-4 text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative Step Visual */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-2xl border border-border/40 bg-muted/20 p-6 flex flex-col items-center justify-center text-center">
                  <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {(() => {
                      const Icon = steps[activeStep].icon;
                      return <Icon className="size-8" />;
                    })()}
                  </div>
                  <div className="text-3xl font-black font-mono text-primary mb-1">
                    {steps[activeStep].num}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isAr ? 'مرحلة معتمدة وممنهجة' : 'Structured Quality Milestone'}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
