import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { type Locale, isValidLocale } from '@/lib/i18n';
import { getDictionary } from './dictionaries';
import { getProjects } from '@/lib/projects';

// Re-fetch Firestore data at most once every 60 seconds (ISR)
export const revalidate = 60;
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { SocialProof } from '@/components/sections/social-proof';
import { PainPoints } from '@/components/sections/pain-points';
import { Services } from '@/components/sections/services';
import { ProjectsSection } from '@/components/sections/projects';
import { HowIWork } from '@/components/sections/how-i-work';
import { CTA } from '@/components/sections/cta';
import { FAQ } from '@/components/sections/faq';
import { Footer } from '@/components/sections/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const isAr = locale === 'ar';
  const title = isAr
    ? 'إسلام عطوة | مطور منتجات رقمية، أنظمة سحابية ووكلاء ذكاء اصطناعي'
    : 'Islam Atwa | Digital Products, Cloud Systems & AI Agents Developer';
  const description = isAr
    ? 'تصميم وتطوير مواقع احترافية، أنظمة سحابية متكاملة، وحلول ذكاء اصطناعي مؤتمتة بمعايير عالمية وأداء 100%.'
    : 'Designing and building high-performance websites, scalable cloud platforms, and autonomous AI agents engineered for growth.';

  return {
    title,
    description,
    keywords: isAr
      ? ['تطوير مواقع', 'أنظمة سحابية', 'وكلاء ذكاء اصطناعي', 'برمجة مخصصة', 'Next.js', 'Firebase', 'مطور برمجيات']
      : ['Web Development', 'Cloud Systems', 'AI Agents', 'Custom Software', 'Next.js', 'Firebase', 'Software Engineer'],
    authors: [{ name: isAr ? 'إسلام عطوة' : 'Islam Atwa' }],
    creator: isAr ? 'إسلام عطوة' : 'Islam Atwa',
    metadataBase: new URL('https://portfolio-islam.vercel.app'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en',
      },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: isAr ? 'إسلام عطوة — معرض الأعمال' : 'Islam Atwa — Portfolio',
      locale: isAr ? 'ar_AR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const projects = await getProjects();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navigation */}
      <Navbar locale={locale} dict={dict} />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero locale={locale} dict={dict} />

        {/* 2. Social Proof & Credibility */}
        <SocialProof locale={locale} dict={dict} />

        {/* 3. Pain Points & Visitor Challenges */}
        <PainPoints locale={locale} dict={dict} />

        {/* 4. Services Offered */}
        <Services locale={locale} dict={dict} />

        {/* 5. Projects Showcase */}
        <ProjectsSection projects={projects} locale={locale} dict={dict} />

        {/* 6. Interactive How I Work Timeline */}
        <HowIWork locale={locale} dict={dict} />

        {/* 7. Call To Action (WhatsApp) */}
        <CTA locale={locale} dict={dict} />

        {/* 8. Frequently Asked Questions */}
        <FAQ locale={locale} dict={dict} />
      </main>

      {/* Footer */}
      <Footer locale={locale} dict={dict} />

      {/* Persistent Floating WhatsApp Action */}
      <WhatsAppButton locale={locale} tooltipText={dict.whatsapp.tooltip} />
    </div>
  );
}
