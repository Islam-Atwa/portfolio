import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  MessageCircle,
  TrendingUp,
  AlertCircle,
  Settings,
} from 'lucide-react';
import { type Locale, isValidLocale } from '@/lib/i18n';
import { getDictionary } from '../../dictionaries';
import { getProject, getProjects } from '@/lib/projects';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/sections/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { Button } from '@/components/ui/button';

interface ProjectPageProps {
  params: Promise<{
    locale: string;
    projectId: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  const locales: Locale[] = ['ar', 'en'];

  const params: { locale: string; projectId: string }[] = [];
  for (const locale of locales) {
    for (const project of projects) {
      params.push({
        locale,
        projectId: project.id,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, projectId } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const project = await getProject(projectId);
  if (!project) {
    return {};
  }

  const isAr = locale === 'ar';
  const title = isAr ? project.title_ar : project.title_en;
  const description = isAr ? project.shortDescription_ar : project.shortDescription_en;

  return {
    title: `${title} | Islam Atwa`,
    description,
    openGraph: {
      title,
      description,
      images: project.coverImage ? [{ url: project.coverImage }] : [],
      url: `/${locale}/projects/${projectId}`,
      siteName: isAr ? 'إسلام عطوة — دراسة حالة' : 'Islam Atwa — Case Study',
      locale: isAr ? 'ar_AR' : 'en_US',
      type: 'article',
    },
    alternates: {
      canonical: `/${locale}/projects/${projectId}`,
      languages: {
        ar: `/ar/projects/${projectId}`,
        en: `/en/projects/${projectId}`,
      },
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, projectId } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const project = await getProject(projectId);
  if (!project) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const isAr = locale === 'ar';

  const title = isAr ? project.title_ar : project.title_en;
  const description = isAr ? project.shortDescription_ar : project.shortDescription_en;
  const problem = isAr ? project.problem_ar : project.problem_en;
  const solution = isAr ? project.solution_ar : project.solution_en;
  const result = isAr ? project.result_ar : project.result_en;

  // Direct WhatsApp link with pre-filled message for this specific project
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201005683716';
  const whatsappMessage = encodeURIComponent(
    isAr
      ? `مرحباً إسلام، لقد اطلعت على مشروع (${title}) وأود مناقشة تنفيذ حل تقني مشابه لعملي.`
      : `Hi Islam, I reviewed your project (${title}) and would like to discuss building a similar solution for my business.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navbar locale={locale} dict={dict} />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <section className="border-b border-border/30 bg-muted/10 py-4 sm:py-5">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Link
                href={`/${locale}#projects`}
                className="inline-flex items-center gap-1.5 font-medium hover:text-foreground transition-colors group"
              >
                {isAr ? (
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                ) : (
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
                )}
                <span>{dict.projects.backToProjects}</span>
              </Link>
              <span className="text-border">/</span>
              <span className="truncate text-foreground font-medium max-w-[240px] sm:max-w-md">
                {title}
              </span>
            </div>
          </div>
        </section>

        {/* Project Showcase & Case Study Section — Two Column Layout */}
        <section className="py-10 sm:py-16 lg:py-20 border-b border-border/30 bg-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center [direction:ltr]">
              {/* Left Column — Project Image */}
              <div className="lg:col-span-6 w-full [direction:inherit]">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full rounded-2xl sm:rounded-3xl border border-border/70 dark:border-white/10 overflow-hidden bg-card shadow-xl dark:shadow-2xl">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-muted/40 to-primary/5 flex items-center justify-center">
                      <Layers className="size-16 text-primary/40" />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column — Project Details */}
              <div
                className="lg:col-span-6 flex flex-col space-y-6 sm:space-y-8"
                dir={isAr ? 'rtl' : 'ltr'}
              >
                {/* Project Badge & Title */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary mb-3.5">
                    <Layers className="size-3.5" />
                    <span>{dict.projects.caseStudyBadge}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground leading-[1.25]">
                    {title}
                  </h1>

                  {description && (
                    <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>

                {/* Case Study Steps: Challenge, Solution, Results */}
                <div className="space-y-5 sm:space-y-6 divide-y divide-border/30">
                  {/* The Challenge */}
                  <div className="flex items-start gap-4 pt-1 first:pt-0">
                    <div className="size-11 sm:size-12 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertCircle className="size-5 sm:size-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base sm:text-lg font-bold text-foreground">
                        {dict.projects.problemTitle}
                      </h2>
                      <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {problem}
                      </p>
                    </div>
                  </div>

                  {/* The Solution */}
                  <div className="flex items-start gap-4 pt-5 sm:pt-6">
                    <div className="size-11 sm:size-12 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Settings className="size-5 sm:size-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base sm:text-lg font-bold text-foreground">
                        {dict.projects.solutionTitle}
                      </h2>
                      <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {solution}
                      </p>
                    </div>
                  </div>

                  {/* The Results */}
                  <div className="flex items-start gap-4 pt-5 sm:pt-6">
                    <div className="size-11 sm:size-12 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <TrendingUp className="size-5 sm:size-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base sm:text-lg font-bold text-foreground">
                        {dict.projects.resultTitle}
                      </h2>
                      <p className="mt-1.5 text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed">
                        {result}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button
                        size="lg"
                        className="rounded-full px-6 sm:px-7 font-semibold gap-2 shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <ExternalLink className="size-4" />
                        <span>{dict.projects.viewLive}</span>
                      </Button>
                    </a>
                  )}

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-6 sm:px-7 font-semibold gap-2 border-border/80 hover:bg-accent/40 bg-card/60 backdrop-blur-sm"
                    >
                      <MessageCircle className="size-4 text-primary" />
                      <span>{dict.projects.discussProject}</span>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 sm:py-20 bg-muted/15 relative overflow-hidden">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-5">
              <CheckCircle2 className="size-3.5" />
              <span>{isAr ? 'جاهز للانطلاق' : 'Ready to Launch'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground leading-tight max-w-2xl mx-auto">
              {dict.projects.similarProjectCtaTitle}
            </h2>

            <p className="mt-4 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
              {dict.projects.similarProjectCtaDesc}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="rounded-full px-8 font-semibold shadow-lg gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <MessageCircle className="size-5" />
                  <span>{dict.projects.discussProject}</span>
                  <ArrowUpRight className="size-4 rtl:rotate-270" />
                </Button>
              </a>

              <Link href={`/${locale}#projects`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-7 font-medium border-border/80 hover:bg-accent/50"
                >
                  <span>{dict.projects.backToProjects}</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer locale={locale} dict={dict} />

      {/* Floating WhatsApp Quick Action */}
      <WhatsAppButton locale={locale} tooltipText={dict.whatsapp.tooltip} />
    </div>
  );
}
