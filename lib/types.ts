export interface Project {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  shortDescription_ar: string;
  shortDescription_en: string;
  problem_ar: string;
  problem_en: string;
  solution_ar: string;
  solution_en: string;
  result_ar: string;
  result_en: string;
  coverImage: string;
  liveUrl: string;
  order: number;
  featured: boolean;
  createdAt?: string | number | Date | null;
}

export type ProjectFormData = Omit<Project, 'id' | 'createdAt' | 'slug'>;
