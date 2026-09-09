import { ProjectCard } from '@/components/project-card';
import type { Project } from '@/lib/types';
import type { Locale } from '@/lib/i18n';

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
  return (
    <section id="projects" className="py-20 sm:py-28 border-b border-border/30 bg-background relative">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-medium text-primary mb-4">
            <span>{dict.projects.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            {dict.projects.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {dict.projects.description}
          </p>
        </div>

        {/* Projects Grid or Empty State */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                locale={locale}
                dict={dict}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border/70 p-12 text-center text-muted-foreground">
            <p>{dict.projects.empty}</p>
          </div>
        )}
      </div>
    </section>
  );
}
