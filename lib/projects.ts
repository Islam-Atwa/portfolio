import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import type { Project } from './types';

// Fallback showcase projects when Firestore is not yet populated or configured
export const fallbackProjects: Project[] = [
  {
    id: 'ai-customer-agent',
    slug: 'ai-customer-agent',
    title_ar: 'نظام وكلاء الذكاء الاصطناعي لخدمة العملاء وأتمتة العمليات',
    title_en: 'AI Customer Agents & Workflow Automation System',
    shortDescription_ar:
      'نظام سحابي يدمج وكلاء أذكياء للتواصل مع العملاء والرد الفوري وأتمتة إدخال البيانات في أنظمة CRM.',
    shortDescription_en:
      'An intelligent cloud system integrating autonomous agents for real-time customer support and automated CRM pipeline updates.',
    problem_ar:
      'كانت الشركة تعاني من بطء الرد على استفسارات العملاء خارج أوقات العمل الرسمية وتراكم المهام الروتينية اليدوية، مما تسبب في فقدان أكثر من 30% من الفرص البيعية المحتملة.',
    problem_en:
      'The client suffered from delayed response times outside operating hours and overloaded support staff, resulting in over 30% lost sales leads.',
    solution_ar:
      'بناء وتدريب وكيل ذكاء اصطناعي مخصص يفهم اللهجات المحلية، متصل بقاعدة بيانات المنتجات وأنظمة الدفع لتقديم دعم فوري وتأكيد الطلبات تلقائياً على مدار الساعة.',
    solution_en:
      'Engineered and fine-tuned a custom conversational AI agent integrated with inventory databases and payment gateways for instant 24/7 lead capture and booking.',
    result_ar:
      'انخفاض زمن الاستجابة إلى أقل من 5 ثوانٍ، وزيادة معدل إغلاق الصفقات بنسبة 42% مع توفير أكثر من 25 ساعة عمل أسبوعياً لفريق المبيعات.',
    result_en:
      'Reduced average response time to under 5 seconds, boosted lead conversion by 42%, and saved the team over 25 hours per week in manual administration.',
    coverImage:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://example.com/demo/ai-agents',
    order: 1,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'cloud-logistics-system',
    slug: 'cloud-logistics-system',
    title_ar: 'منصة إدارة العمليات اللوجستية وتتبع الشحنات الذكية',
    title_en: 'Smart Logistics & Fleet Tracking Operations Platform',
    shortDescription_ar:
      'لوحة تحكم إدارية سحابية لمراقبة الأساطيل وإدارة الشحنات وتقديم تقارير دقيقة لحظة بلحظة.',
    shortDescription_en:
      'A scalable enterprise dashboard providing fleet telematics, real-time shipment dispatch, and automated performance analytics.',
    problem_ar:
      'تشتت العمليات بين جداول Excel ورسائل واتساب، وصعوبة تتبع السائقين وحالة الشحنات في الوقت الفعلي مما تسبب في تأخير التسليم وغموض المسارات.',
    problem_en:
      'Fragmented operational tracking across spreadsheets and messaging apps, leading to untracked delays, routing inefficiencies, and poor shipment visibility.',
    solution_ar:
      'تطوير نظام مركزي متكامل يربط السائقين والمدراء بلوحة تحكم تفاعلية مع خرائط حية وأتمتة إشعارات الرسائل النصية للعملاء عند كل مرحلة تسليم.',
    solution_en:
      'Developed a centralized cloud management suite linking drivers with management via live interactive maps and automated customer SMS status updates.',
    result_ar:
      'تحسين كفاءة التوصيل بنسبة 35%، والقضاء التام على الأخطاء اليدوية في إدخال الشحنات مع زيادة رضا العملاء بنسبة 95%.',
    result_en:
      'Enhanced delivery efficiency by 35%, completely eliminated manual data entry errors, and raised customer satisfaction to 95%.',
    coverImage:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://example.com/demo/logistics',
    order: 2,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'luxury-brand-experience',
    slug: 'luxury-brand-experience',
    title_ar: 'متجر إلكتروني فاخر بهوية عصرية وسرعة استثنائية',
    title_en: 'Luxury Brand E-Commerce & Interactive Experience',
    shortDescription_ar:
      'تجربة تسوق رقمية مستوحاة من فلسفة التصميم البسيط لشركة Apple بتجربة بصرية فائقة وأداء 100%.',
    shortDescription_en:
      'A refined, minimalist shopping platform designed with museum-grade aesthetics, subtle animations, and 100% performance rating.',
    problem_ar:
      'الموقع القديم كان بطيئاً ومعقداً ولا يعكس القيمة العالية للمنتجات، مما سبب معدل ارتداد عالي وانخفاض في ثقة المشترين الجدد.',
    problem_en:
      'The legacy store was sluggish, outdated, and failed to communicate premium brand value, leading to high bounce rates and low trust among buyers.',
    solution_ar:
      'إعادة تصميم وتطوير المنصة باستخدام Next.js وTailwind CSS بتجربة تصفح غامرة، وانتقالات بصرية سلسة وسرعة تحميل فورية أقل من ثانية واحدة.',
    solution_en:
      'Engineered a bespoke storefront with Next.js and Tailwind CSS featuring smooth visual micro-interactions and sub-second page loads.',
    result_ar:
      'تحقيق علامة أداء 100 على Lighthouse، ومضاعفة المبيعات بنسبة 60% خلال أول شهرين من الإطلاق.',
    result_en:
      'Achieved a 100 Lighthouse performance score, doubled average time on site, and increased sales by 60% in the first two months.',
    coverImage:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    liveUrl: 'https://example.com/demo/luxury-store',
    order: 3,
    featured: true,
    createdAt: new Date().toISOString(),
  },
];

/**
 * Fetch all projects ordered by order field
 */
export async function getProjects(): Promise<Project[]> {
  if (!isFirebaseConfigured || !db) {
    return fallbackProjects;
  }

  try {
    const projectsCol = collection(db, 'projects');
    const q = query(projectsCol, orderBy('order', 'asc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return fallbackProjects;
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        slug: data.slug || docSnap.id,
        title_ar: data.title_ar || '',
        title_en: data.title_en || '',
        shortDescription_ar: data.shortDescription_ar || '',
        shortDescription_en: data.shortDescription_en || '',
        problem_ar: data.problem_ar || '',
        problem_en: data.problem_en || '',
        solution_ar: data.solution_ar || '',
        solution_en: data.solution_en || '',
        result_ar: data.result_ar || '',
        result_en: data.result_en || '',
        coverImage: data.coverImage || '',
        liveUrl: data.liveUrl || '',
        order: typeof data.order === 'number' ? data.order : 0,
        featured: Boolean(data.featured),
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
      } as Project;
    });
  } catch (error) {
    console.warn('Could not fetch projects from Firestore, using fallback:', error);
    return fallbackProjects;
  }
}

/**
 * Fetch featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}

/**
 * Fetch a single project by document ID
 */
export async function getProject(id: string): Promise<Project | null> {
  if (!isFirebaseConfigured || !db) {
    return fallbackProjects.find((p) => p.id === id) || null;
  }

  try {
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        slug: data.slug || docSnap.id,
        title_ar: data.title_ar || '',
        title_en: data.title_en || '',
        shortDescription_ar: data.shortDescription_ar || '',
        shortDescription_en: data.shortDescription_en || '',
        problem_ar: data.problem_ar || '',
        problem_en: data.problem_en || '',
        solution_ar: data.solution_ar || '',
        solution_en: data.solution_en || '',
        result_ar: data.result_ar || '',
        result_en: data.result_en || '',
        coverImage: data.coverImage || '',
        liveUrl: data.liveUrl || '',
        order: typeof data.order === 'number' ? data.order : 0,
        featured: Boolean(data.featured),
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
      } as Project;
    }

    return fallbackProjects.find((p) => p.id === id) || null;
  } catch (error) {
    console.warn(`Could not fetch project ${id} from Firestore, using fallback:`, error);
    return fallbackProjects.find((p) => p.id === id) || null;
  }
}

/**
 * Fetch a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!isFirebaseConfigured || !db) {
    return fallbackProjects.find((p) => p.slug === slug || p.id === slug) || null;
  }

  try {
    const projectsCol = collection(db, 'projects');
    const q = query(projectsCol, where('slug', '==', slug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      const data = docSnap.data();
      return {
        id: docSnap.id,
        slug: data.slug || docSnap.id,
        title_ar: data.title_ar || '',
        title_en: data.title_en || '',
        shortDescription_ar: data.shortDescription_ar || '',
        shortDescription_en: data.shortDescription_en || '',
        problem_ar: data.problem_ar || '',
        problem_en: data.problem_en || '',
        solution_ar: data.solution_ar || '',
        solution_en: data.solution_en || '',
        result_ar: data.result_ar || '',
        result_en: data.result_en || '',
        coverImage: data.coverImage || '',
        liveUrl: data.liveUrl || '',
        order: typeof data.order === 'number' ? data.order : 0,
        featured: Boolean(data.featured),
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
      } as Project;
    }

    return fallbackProjects.find((p) => p.slug === slug || p.id === slug) || null;
  } catch (error) {
    console.warn(`Could not fetch project with slug ${slug} from Firestore, using fallback:`, error);
    return fallbackProjects.find((p) => p.slug === slug || p.id === slug) || null;
  }
}
