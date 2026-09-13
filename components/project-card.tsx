'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types';
import type { Locale } from '@/lib/i18n';

interface ProjectCardProps {
  project: Project;
  locale: Locale;
  dict: {
    projects: {
      viewDetails: string;
      viewLive: string;
      featured: string;
    };
  };
}

export function ProjectCard({ project, locale, dict }: ProjectCardProps) {
  const isAr = locale === 'ar';
  const title = isAr ? project.title_ar : project.title_en;
  const description = isAr ? project.shortDescription_ar : project.shortDescription_en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-card shadow-xs transition-all hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
    >
      <div>
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
          <Image
            src={project.coverImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={project.featured}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 start-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-background/90 px-3 py-1 text-[11px] font-semibold text-primary shadow-sm backdrop-blur-md">
              <Sparkles className="size-3" />
              <span>{dict.projects.featured}</span>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="p-6 sm:p-7">
          <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 sm:p-7 pt-0 flex flex-wrap items-center gap-3">
        <Link href={`/${locale}/projects/${project.slug}`} className="flex-1 min-w-[130px]">
          <Button
            variant="default"
            size="sm"
            className="w-full rounded-full text-xs font-medium gap-1.5 shadow-xs"
          >
            <span>{dict.projects.viewDetails}</span>
            <ArrowUpRight className="size-3.5 rtl:rotate-270" />
          </Button>
        </Link>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[120px]"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-full text-xs font-medium gap-1.5 border-border/80 hover:bg-accent/40"
            >
              <span>{dict.projects.viewLive}</span>
              <ExternalLink className="size-3" />
            </Button>
          </a>
        )}
      </div>
    </motion.div>
  );
}
