'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Locale } from '@/lib/i18n';

interface HowIWorkProps {
  locale: Locale;
  dict: {
    howIWork: {
      badge: string;
      title: string;
      description: string;
      deliverablesLabel: string;
      step1Num: string;
      step1NameEn: string;
      step1NameAr: string;
      step1Desc: string;
      step2Num: string;
      step2NameEn: string;
      step2NameAr: string;
      step2Desc: string;
      step3Num: string;
      step3NameEn: string;
      step3NameAr: string;
      step3Desc: string;
      step4Num: string;
      step4NameEn: string;
      step4NameAr: string;
      step4Desc: string;
    };
  };
}

// 1. Understand: Problem exploration, user needs, research & analysis
function IllustrationUnderstand({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background document / research canvas */}
      <rect
        x="18"
        y="14"
        width="48"
        height="64"
        rx="8"
        className="stroke-primary/30 fill-primary/5"
        strokeWidth="1.5"
      />
      {/* Document content lines */}
      <line x1="28" y1="28" x2="52" y2="28" className="stroke-primary/40" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="38" x2="48" y2="38" className="stroke-muted-foreground/30" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="48" x2="42" y2="48" className="stroke-muted-foreground/30" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="58" x2="50" y2="58" className="stroke-muted-foreground/20" strokeWidth="2" strokeLinecap="round" />

      {/* Target inspection loupe */}
      <circle
        cx="62"
        cy="58"
        r="22"
        className="stroke-primary fill-card/90"
        strokeWidth="2"
      />
      <circle
        cx="62"
        cy="58"
        r="14"
        className="stroke-primary/40 fill-primary/10"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <circle cx="62" cy="58" r="3" className="fill-primary" />
      {/* Loupe handle */}
      <line
        x1="78"
        y1="74"
        x2="90"
        y2="86"
        className="stroke-primary"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 2. Explore: Strategic mapping, direction lock & opportunity discovery
function IllustrationExplore({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer subtle orbit ring */}
      <circle
        cx="50"
        cy="50"
        r="36"
        className="stroke-primary/20 fill-primary/5"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      {/* Secondary inner ring */}
      <circle
        cx="50"
        cy="50"
        r="26"
        className="stroke-primary/30"
        strokeWidth="1.5"
      />
      {/* Crosshair grid lines */}
      <line x1="50" y1="16" x2="50" y2="84" className="stroke-primary/20" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="16" y1="50" x2="84" y2="50" className="stroke-primary/20" strokeWidth="1" strokeDasharray="2 2" />

      {/* Strategic directional needle */}
      <polygon
        points="50,22 57,48 50,44 43,48"
        className="fill-primary stroke-primary"
        strokeWidth="1"
      />
      <polygon
        points="50,78 57,52 50,56 43,52"
        className="fill-muted-foreground/30 stroke-muted-foreground/40"
        strokeWidth="1"
      />
      {/* Center pivot point */}
      <circle cx="50" cy="50" r="4" className="fill-card stroke-primary" strokeWidth="2" />

      {/* Direction nodes */}
      <circle cx="82" cy="34" r="3.5" className="fill-primary/60" />
      <circle cx="18" cy="66" r="2.5" className="fill-muted-foreground/40" />
    </svg>
  );
}

// 3. Define: UI/UX architecture, blueprint & specification
function IllustrationDefine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main wireframe window */}
      <rect
        x="14"
        y="18"
        width="72"
        height="64"
        rx="8"
        className="stroke-primary fill-primary/5"
        strokeWidth="1.5"
      />
      {/* Window title bar & controls */}
      <line x1="14" y1="32" x2="86" y2="32" className="stroke-primary/30" strokeWidth="1.5" />
      <circle cx="24" cy="25" r="2.5" className="fill-primary/60" />
      <circle cx="32" cy="25" r="2.5" className="fill-primary/30" />
      <circle cx="40" cy="25" r="2.5" className="fill-primary/20" />

      {/* Wireframe layout elements */}
      {/* Sidebar */}
      <rect
        x="22"
        y="40"
        width="16"
        height="34"
        rx="3"
        className="stroke-primary/30 fill-primary/10"
        strokeWidth="1"
      />
      {/* Main hero card */}
      <rect
        x="44"
        y="40"
        width="34"
        height="18"
        rx="3"
        className="stroke-primary fill-primary/20"
        strokeWidth="1.5"
      />
      {/* Two sub-cards */}
      <rect
        x="44"
        y="62"
        width="15"
        height="12"
        rx="2"
        className="stroke-muted-foreground/30 fill-muted/40"
        strokeWidth="1"
      />
      <rect
        x="63"
        y="62"
        width="15"
        height="12"
        rx="2"
        className="stroke-muted-foreground/30 fill-muted/40"
        strokeWidth="1"
      />

      {/* Selection node / cursor */}
      <circle cx="78" cy="38" r="3" className="fill-primary ring-2 ring-primary/20" />
    </svg>
  );
}

// 4. Build: Production code, testing, deployment & launch
function IllustrationBuild({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Code terminal base window */}
      <rect
        x="16"
        y="24"
        width="68"
        height="56"
        rx="8"
        className="stroke-primary/30 fill-primary/5"
        strokeWidth="1.5"
      />
      {/* Terminal header */}
      <line x1="16" y1="38" x2="84" y2="38" className="stroke-primary/20" strokeWidth="1" />
      <circle cx="24" cy="31" r="2" className="fill-muted-foreground/40" />
      <circle cx="30" cy="31" r="2" className="fill-muted-foreground/40" />

      {/* Code brackets </> */}
      <path
        d="M32 50 L25 56 L32 62"
        className="stroke-primary/50"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 50 L55 56 L48 62"
        className="stroke-primary/50"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="42"
        y1="48"
        x2="38"
        y2="64"
        className="stroke-muted-foreground/40"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Ascending deployment rocket */}
      <g transform="translate(56, 12)">
        {/* Rocket fuselage */}
        <path
          d="M16 4 C24 10 26 24 26 30 L6 30 C6 24 8 10 16 4 Z"
          className="fill-card stroke-primary"
          strokeWidth="1.5"
        />
        {/* Window */}
        <circle cx="16" cy="18" r="3.5" className="fill-primary/20 stroke-primary" strokeWidth="1" />
        {/* Fins */}
        <path d="M6 26 L2 32 L6 32 Z" className="fill-primary/60" />
        <path d="M26 26 L30 32 L26 32 Z" className="fill-primary/60" />
        {/* Thrust flames */}
        <path
          d="M11 32 C11 37 16 41 16 41 C16 41 21 37 21 32 Z"
          className="fill-primary/30 stroke-primary/40"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}

export function HowIWork({ locale, dict }: HowIWorkProps) {
  const [activeStep, setActiveStep] = useState(0);
  const isAr = locale === 'ar';

  const steps = [
    {
      num: dict.howIWork.step1Num,
      nameEn: dict.howIWork.step1NameEn,
      nameAr: dict.howIWork.step1NameAr,
      description: dict.howIWork.step1Desc,
      illustration: IllustrationUnderstand,
      deliverables: isAr
        ? [
            'تحليل المتطلبات وأهداف العمل',
            'تحديد نطاق المشروع والمواصفات',
            'دراسة تجربة وسلوك المستخدم',
          ]
        : [
            'Requirements & business goals analysis',
            'Project scope & technical specifications',
            'User experience & behavior research',
          ],
    },
    {
      num: dict.howIWork.step2Num,
      nameEn: dict.howIWork.step2NameEn,
      nameAr: dict.howIWork.step2NameAr,
      description: dict.howIWork.step2Desc,
      illustration: IllustrationExplore,
      deliverables: isAr
        ? [
            'تحليل السوق والمنافسين',
            'تحديد الفرص والاتجاهات',
            'وضع خطة واضحة للمشروع',
          ]
        : [
            'Market & competitor research',
            'Opportunities & strategic direction',
            'Clear project roadmap & milestones',
          ],
    },
    {
      num: dict.howIWork.step3Num,
      nameEn: dict.howIWork.step3NameEn,
      nameAr: dict.howIWork.step3NameAr,
      description: dict.howIWork.step3Desc,
      illustration: IllustrationDefine,
      deliverables: isAr
        ? [
            'تحديد الحل والوظائف الأساسية',
            'بناء هيكل واضح للمشروع',
            'تحديد المتطلبات النهائية',
          ]
        : [
            'Core solution & feature definition',
            'Clean architecture & UX blueprint',
            'Final technical specifications',
          ],
    },
    {
      num: dict.howIWork.step4Num,
      nameEn: dict.howIWork.step4NameEn,
      nameAr: dict.howIWork.step4NameAr,
      description: dict.howIWork.step4Desc,
      illustration: IllustrationBuild,
      deliverables: isAr
        ? [
            'تصميم وتنفيذ الواجهات',
            'تطوير الوظائف الأساسية',
            'اختبار وتحسين المنتج',
          ]
        : [
            'UI design & frontend implementation',
            'Core backend logic & API integration',
            'Testing, QA & performance optimization',
          ],
    },
  ];

  const ActiveIllustration = steps[activeStep].illustration;

  return (
    <section id="process" className="py-20 sm:py-28 border-b border-border/30 bg-muted/15 relative">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
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

        {/* Process Navigation Bar */}
        <div className="relative mb-8">
          {/* Connected progress line behind buttons on desktop */}
          <div
            className="hidden md:block absolute top-[21px] sm:top-[25px] inset-x-[12.5%] h-px bg-border/60 pointer-events-none z-0"
            aria-hidden="true"
          >
            <div
              className="h-full bg-primary/60 transition-all duration-300 absolute top-0 start-0"
              style={{ width: `${(activeStep / 3) * 100}%` }}
            />
          </div>

          {/* Stepper Buttons: Horizontal scroll with visible peeking cards on mobile, 4-col grid on desktop */}
          <div className="flex md:grid md:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 md:pb-0 relative z-10 -mx-4 px-4 sm:mx-0 sm:px-0">
            {steps.map((step, index) => {
              const Illustration = step.illustration;
              const isActive = activeStep === index;
              const isCompleted = index < activeStep;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={`relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer group snap-center w-[72vw] max-w-[260px] md:w-auto md:max-w-none shrink-0 md:shrink ${
                    isActive
                      ? 'border-primary/40 bg-card shadow-md text-foreground'
                      : 'border-border/60 bg-card/40 hover:bg-card/70 hover:border-border text-muted-foreground'
                  }`}
                >
                  {/* Progress Node */}
                  <div className="flex items-center justify-center mb-3">
                    <div
                      className={`size-2.5 rounded-full transition-all duration-200 ${
                        isActive
                          ? 'bg-primary ring-4 ring-primary/20 scale-110'
                          : isCompleted
                          ? 'bg-primary'
                          : 'bg-border'
                      }`}
                    />
                  </div>

                  {/* Visual Illustration element */}
                  <div
                    className={`size-14 rounded-2xl p-2 flex items-center justify-center mb-2.5 transition-all duration-200 group-hover:scale-105 ${
                      isActive
                        ? 'bg-primary/10 text-primary shadow-xs'
                        : 'bg-muted/40 text-muted-foreground/70'
                    }`}
                  >
                    <Illustration className="size-full" />
                  </div>

                  {/* Step Number */}
                  <span
                    className={`font-mono text-xs font-bold mb-1 transition-colors ${
                      isActive ? 'text-primary' : 'text-muted-foreground/50'
                    }`}
                  >
                    {step.num}
                  </span>

                  {/* Step Name (Strictly Localized) */}
                  <div className="text-xs sm:text-sm font-bold tracking-wide text-foreground line-clamp-1">
                    {isAr ? step.nameAr : step.nameEn}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Pagination / Swipe Indicator Dots */}
          <div className="flex md:hidden items-center justify-center gap-1.5 mt-3 mb-2">
            {steps.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeStep
                    ? 'w-6 bg-primary'
                    : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Step ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Active Step Details Card */}
        <div className="rounded-3xl border border-border/60 bg-card p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Details & Deliverables */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {isAr ? `المرحلة ${steps[activeStep].num}` : `STEP ${steps[activeStep].num}`}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {isAr ? steps[activeStep].nameAr : steps[activeStep].nameEn}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {steps[activeStep].description}
                </p>

                {/* Key Deliverables */}
                <div className="mt-6 pt-5 border-t border-border/40">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">
                    {dict.howIWork.deliverablesLabel}
                  </h4>
                  <div className="flex flex-col gap-2.5">
                    {steps[activeStep].deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-xs sm:text-sm text-foreground/90"
                      >
                        <span className="font-mono text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/15 shrink-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Stage Visual Illustration */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-2xl border border-border/40 bg-muted/20 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div
                    className="text-5xl sm:text-6xl font-black font-mono text-primary/15 select-none my-1 leading-none"
                    aria-hidden="true"
                  >
                    {steps[activeStep].num}
                  </div>

                  {/* Featured Card Illustration */}
                  <div className="w-28 h-28 my-3 flex items-center justify-center">
                    <ActiveIllustration className="w-full h-full drop-shadow-xs" />
                  </div>

                  <div className="text-sm font-bold tracking-wider text-foreground mt-1">
                    {isAr ? steps[activeStep].nameAr : steps[activeStep].nameEn}
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
