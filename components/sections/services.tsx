'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Laptop, Database, Bot, Check, ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface ServicesProps {
  locale: Locale;
  dict: {
    services: {
      badge: string;
      title: string;
      description: string;
      webTitle: string;
      webDesc: string;
      systemsTitle: string;
      systemsDesc: string;
      aiTitle: string;
      aiDesc: string;
    };
  };
}

export function Services({ locale, dict }: ServicesProps) {
  const isAr = locale === 'ar';

  // WhatsApp number from env (same default as across the site)
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201005683716';

  const services = [
    {
      id: 'web',
      icon: Laptop,
      title: dict.services.webTitle,
      description: dict.services.webDesc,
      tag: isAr ? 'أداء وسرعة فائقة' : 'Speed & Performance',
      image: '/images/services/web.jpg',
      features: isAr
        ? ['واجهات متجاوبة مع كافة الشاشات', 'تحسين محركات البحث SEO بنسبة 100%', 'تصميم مستوحى من بساطة Apple']
        : ['Fully responsive on all devices', '100% SEO & Performance optimization', 'Refined Apple-inspired aesthetics'],
    },
    {
      id: 'systems',
      icon: Database,
      title: dict.services.systemsTitle,
      description: dict.services.systemsDesc,
      tag: isAr ? 'بنية سحابية آمنة' : 'Scalable Architecture',
      image: '/images/services/systems.jpg',
      features: isAr
        ? ['لوحات تحكم إدارية مخصصة CMS', 'قواعد بيانات سحابية لحظية', 'إدارة صلاحيات وأمان متقدم']
        : ['Custom CMS & admin dashboards', 'Real-time cloud databases', 'Role-based access control & security'],
    },
    {
      id: 'ai',
      icon: Bot,
      title: dict.services.aiTitle,
      description: dict.services.aiDesc,
      tag: isAr ? 'أتمتة ذكية متطورة' : 'Autonomous AI',
      image: '/images/services/ai.jpg',
      features: isAr
        ? ['وكلاء دعم فني ومبيعات آليين', 'أتمتة سير العمل وربط الأنظمة', 'معالجة لغة طبيعية ودعم اللهجات']
        : ['24/7 AI sales & support agents', 'Workflow automation & API webhooks', 'Natural language understanding'],
    },
  ].map((service) => ({
    ...service,
    // Build a WhatsApp URL with a pre-filled message mentioning the service name
    whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      isAr
        ? `مرحباً إسلام، أود طلب خدمة: ${service.title}`
        : `Hi Islam, I'd like to request a service: ${service.title}`
    )}`,
  }));

  return (
    <section id="services" className="py-16 sm:py-24 md:py-28 border-b border-border/30 bg-muted/15 relative">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-medium text-primary mb-3.5">
            <span>{dict.services.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            {dict.services.title}
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
            {dict.services.description}
          </p>
        </div>

        {/* Stacked Service Cards */}
        <div className="flex flex-col gap-6 sm:gap-8 pb-8 sm:pb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  top: `calc(72px + ${index * 16}px)`,
                }}
                className="group sticky rounded-2xl sm:rounded-3xl border border-border/80 dark:border-white/10 bg-card dark:bg-[#0B1220] shadow-xl dark:shadow-2xl overflow-hidden transition-all duration-300 md:top-[calc(90px+var(--stack-offset))]"
              >
                {/* Responsive dynamic CSS variable for offset on desktop */}
                <div
                  className="grid grid-cols-1 md:grid-cols-12 min-h-full"
                  style={{ '--stack-offset': `${index * 24}px` } as React.CSSProperties}
                >
                  {/* Left Column: Text & Features (Mobile: compact, Desktop: balanced) */}
                  <div className="md:col-span-7 flex flex-col justify-between p-5 sm:p-7 md:p-9 lg:p-10 relative z-10">
                    <div>
                      {/* Icon + Tag Header */}
                      <div className="flex items-center justify-between mb-4 sm:mb-5">
                        <div className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="size-5 sm:size-6" />
                        </div>
                        <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-primary">
                          {service.tag}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
                        {service.title}
                      </h3>
                      <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>

                      {/* Feature Checklist */}
                      <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-2.5 pt-4 sm:pt-6 border-t border-border/60 dark:border-white/10">
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                            <Check className="size-4 text-primary shrink-0 mt-0.5" />
                            <span className="leading-normal">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Link — opens WhatsApp with the service name pre-filled */}
                    <div className="mt-6 sm:mt-8 pt-2">
                      <a
                        href={service.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-all group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                      >
                        <span>{isAr ? 'اطلب هذه الخدمة الآن' : 'Request this service'}</span>
                        <ArrowUpRight className="size-4 rtl:rotate-270" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Custom Visual Illustration */}
                  <div className="md:col-span-5 relative h-44 sm:h-56 md:h-auto min-h-[170px] md:min-h-[300px] w-full overflow-hidden bg-muted/30 dark:bg-black/40 border-t md:border-t-0 md:border-s border-border/60 dark:border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-card dark:from-[#0B1220] via-transparent to-transparent z-10 opacity-60 pointer-events-none" />
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      priority={index === 0}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
