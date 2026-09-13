'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import type { Project } from '@/lib/types';
import type { Locale } from '@/lib/i18n';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ProjectsSectionProps {
  projects: Project[];
  locale: Locale;
  dict: {
    projects: {
      badge: string;
      title: string;
      description: string;
      viewDetails: string;
      viewLive: string;
      featured: string;
      empty: string;
    };
  };
}

export function ProjectsSection({ projects, locale, dict }: ProjectsSectionProps) {
  const isAr = locale === 'ar';

  const getTitle = (p: Project) => (isAr ? p.title_ar : p.title_en) || p.title_en || p.title_ar;
  const getDesc = (p: Project) =>
    (isAr ? p.shortDescription_ar : p.shortDescription_en) || p.shortDescription_en || p.shortDescription_ar;
  const getResult = (p: Project) => (isAr ? p.result_ar : p.result_en);

  const renderProjectCard = (project: Project, index: number) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-2xl sm:rounded-3xl border border-border/80 dark:border-white/10 bg-card dark:bg-[#0B1220] shadow-xl dark:shadow-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 h-full"
    >
      {/* Card Cover Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-muted/40 dark:bg-black/40 border-b border-border/60 dark:border-white/10">
        {project.featured && (
          <div className="absolute top-3.5 start-3.5 z-20 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-card/90 dark:bg-[#0B1220]/90 backdrop-blur-md px-2.5 sm:px-3 py-1 text-[11px] font-semibold text-primary shadow-xs">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{dict.projects.featured}</span>
          </div>
        )}

        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={getTitle(project)}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-primary/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card dark:from-[#0B1220] via-transparent to-transparent opacity-40 z-10 pointer-events-none" />
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 md:p-7 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground transition-colors group-hover:text-primary leading-snug">
            {getTitle(project)}
          </h3>
          <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {getDesc(project)}
          </p>

          {/* Tangible Result */}
          {getResult(project) && (
            <div className="mt-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20 p-3 flex items-start gap-2.5">
              <TrendingUp className="size-4 text-primary shrink-0 mt-0.5" />
              <span className="text-xs text-foreground font-medium leading-relaxed">
                {getResult(project)}
              </span>
            </div>
          )}
        </div>

        {/* Card Action Footer */}
        <div className="mt-5 sm:mt-6 pt-4 border-t border-border/60 dark:border-white/10 flex items-center justify-between">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors group/link"
            >
              <span>{dict.projects.viewLive}</span>
              <ArrowUpRight className="size-4 rtl:rotate-270 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>
          ) : (
            <span />
          )}
          <Link
            href={`/${locale}/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:underline transition-colors"
          >
            <span>{dict.projects.viewDetails}</span>
            <ArrowUpRight className="size-3.5 rtl:rotate-270" />
          </Link>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-28 border-b border-border/30 bg-background relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-medium text-primary mb-3.5">
            <span>{dict.projects.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            {dict.projects.title}
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
            {dict.projects.description}
          </p>
        </div>

        {/* Projects Showcase */}
        {projects.length > 0 ? (
          projects.length <= 3 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
              {projects.map((project, index) => renderProjectCard(project, index))}
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
                direction: isAr ? "rtl" : "ltr",
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-6 sm:-ml-7 lg:-ml-8">
                {projects.map((project, index) => (
                  <CarouselItem key={project.id} className="pl-6 sm:pl-7 lg:pl-8 md:basis-1/2 lg:basis-1/3">
                    {renderProjectCard(project, index)}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center gap-4 mt-10">
                <CarouselPrevious className="static translate-y-0 translate-x-0 hover:bg-primary/10 border-border/80" />
                <CarouselNext className="static translate-y-0 translate-x-0 hover:bg-primary/10 border-border/80" />
              </div>
            </Carousel>
          )
        ) : (
          /* Empty State */
          <div className="rounded-3xl border border-dashed border-border/70 p-12 text-center text-muted-foreground">
            <p>{dict.projects.empty}</p>
          </div>
        )}
      </div>
    </section>
  );
}
