'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Project, ProjectFormData } from '@/lib/types';
import { createProject, updateProject } from '@/lib/admin-projects';
import { slugify } from '@/lib/slug';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  X, 
  Loader2, 
  Save, 
  ArrowLeft,
  AlertCircle,
  ImageIcon
} from 'lucide-react';
import Link from 'next/link';

interface ProjectFormProps {
  initialData?: Project;
  isEdit?: boolean;
}

export function ProjectForm({ initialData, isEdit = false }: ProjectFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState<ProjectFormData>({
    title_ar: initialData?.title_ar || '',
    title_en: initialData?.title_en || '',
    shortDescription_ar: initialData?.shortDescription_ar || '',
    shortDescription_en: initialData?.shortDescription_en || '',
    problem_ar: initialData?.problem_ar || '',
    problem_en: initialData?.problem_en || '',
    solution_ar: initialData?.solution_ar || '',
    solution_en: initialData?.solution_en || '',
    result_ar: initialData?.result_ar || '',
    result_en: initialData?.result_en || '',
    coverImage: initialData?.coverImage || '',
    liveUrl: initialData?.liveUrl || '',
    order: initialData?.order ?? 0,
    featured: initialData?.featured ?? false,
  });

  const [imageLoadError, setImageLoadError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'coverImage') {
      setImageLoadError(false);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, featured: checked }));
  };

  const clearImage = () => {
    setFormData((prev) => ({ ...prev, coverImage: '' }));
    setImageLoadError(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const coverImageTrimmed = formData.coverImage.trim();

      if (!coverImageTrimmed) {
        throw new Error('A cover image URL is required.');
      }

      const submissionData: ProjectFormData = {
        ...formData,
        coverImage: coverImageTrimmed,
        order: Number(formData.order) || 0,
      };

      if (isEdit && initialData) {
        await updateProject(initialData.id, submissionData);
      } else {
        await createProject(submissionData);
      }

      router.push('/admin/projects');
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the project.');
      setIsSubmitting(false);
      window.scrollTo(0, 0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-16 max-w-5xl">
      {error && (
        <div className="p-4 text-sm bg-destructive/10 text-destructive border border-destructive/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex items-center justify-between sticky top-14 z-30 py-4 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects">
            <Button type="button" variant="outline" size="sm" className="h-9 gap-1.5">
              <ArrowLeft className="size-4" />
              <span>Cancel</span>
            </Button>
          </Link>
          {isEdit && initialData?.slug ? (
            <span className="text-sm text-muted-foreground hidden sm:inline-block">
              Slug: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{initialData.slug}</code>
            </span>
          ) : formData.title_en ? (
            <span className="text-sm text-muted-foreground hidden sm:inline-block">
              Generated Slug: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{slugify(formData.title_en)}-xxxx</code>
            </span>
          ) : null}
        </div>
        <Button type="submit" disabled={isSubmitting} className="h-9 gap-2 shadow-sm font-medium">
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          <span>{isEdit ? 'Update Project' : 'Publish Project'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
            <h2 className="text-lg font-semibold border-b border-border pb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title_en" className="text-sm font-medium">Title (English) <span className="text-destructive">*</span></Label>
                <Input
                  id="title_en"
                  name="title_en"
                  required
                  value={formData.title_en}
                  onChange={handleChange}
                  placeholder="e.g. AI Customer Agents"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2" dir="rtl">
                <Label htmlFor="title_ar" className="text-sm font-medium">Title (Arabic) <span className="text-destructive">*</span></Label>
                <Input
                  id="title_ar"
                  name="title_ar"
                  required
                  value={formData.title_ar}
                  onChange={handleChange}
                  placeholder="مثال: نظام وكلاء الذكاء الاصطناعي"
                  className="bg-background font-cairo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="shortDescription_en">Short Description (English) <span className="text-destructive">*</span></Label>
                <Textarea
                  id="shortDescription_en"
                  name="shortDescription_en"
                  required
                  value={formData.shortDescription_en}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Brief summary for cards and search..."
                  className="bg-background resize-none"
                />
              </div>
              <div className="space-y-2" dir="rtl">
                <Label htmlFor="shortDescription_ar">Short Description (Arabic) <span className="text-destructive">*</span></Label>
                <Textarea
                  id="shortDescription_ar"
                  name="shortDescription_ar"
                  required
                  value={formData.shortDescription_ar}
                  onChange={handleChange}
                  rows={3}
                  placeholder="وصف مختصر للبطاقة ومحركات البحث..."
                  className="bg-background resize-none font-cairo"
                />
              </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
            <h2 className="text-lg font-semibold border-b border-border pb-4">Case Study Details</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="problem_en">The Problem / Challenge (EN)</Label>
                  <Textarea
                    id="problem_en"
                    name="problem_en"
                    value={formData.problem_en}
                    onChange={handleChange}
                    rows={4}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2" dir="rtl">
                  <Label htmlFor="problem_ar">The Problem / Challenge (AR)</Label>
                  <Textarea
                    id="problem_ar"
                    name="problem_ar"
                    value={formData.problem_ar}
                    onChange={handleChange}
                    rows={4}
                    className="bg-background font-cairo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="solution_en">The Solution (EN)</Label>
                  <Textarea
                    id="solution_en"
                    name="solution_en"
                    value={formData.solution_en}
                    onChange={handleChange}
                    rows={4}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2" dir="rtl">
                  <Label htmlFor="solution_ar">The Solution (AR)</Label>
                  <Textarea
                    id="solution_ar"
                    name="solution_ar"
                    value={formData.solution_ar}
                    onChange={handleChange}
                    rows={4}
                    className="bg-background font-cairo"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="result_en">The Results (EN)</Label>
                  <Textarea
                    id="result_en"
                    name="result_en"
                    value={formData.result_en}
                    onChange={handleChange}
                    rows={4}
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2" dir="rtl">
                  <Label htmlFor="result_ar">The Results (AR)</Label>
                  <Textarea
                    id="result_ar"
                    name="result_ar"
                    value={formData.result_ar}
                    onChange={handleChange}
                    rows={4}
                    className="bg-background font-cairo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          {/* Cover Image URL */}
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-4">
            <h2 className="text-base font-semibold border-b border-border pb-3">
              Cover Image <span className="text-destructive">*</span>
            </h2>

            <div className="space-y-2">
              <Label htmlFor="coverImage" className="text-sm font-medium">
                Image URL <span className="text-destructive">*</span>
              </Label>
              <Input
                id="coverImage"
                name="coverImage"
                type="url"
                required
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">
                Enter a direct image link (e.g. Unsplash, Imgur, Cloudinary, etc.)
              </p>
            </div>

            {formData.coverImage ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-medium">Live Preview</span>
                  <button
                    type="button"
                    onClick={clearImage}
                    className="hover:text-destructive transition-colors flex items-center gap-1"
                  >
                    <X className="size-3" /> Clear URL
                  </button>
                </div>

                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-border bg-muted/30 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoadError(false)}
                    onError={() => setImageLoadError(true)}
                  />
                  {imageLoadError && (
                    <div className="absolute inset-0 bg-background/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center">
                      <AlertCircle className="size-6 text-destructive mb-1.5" />
                      <p className="text-xs font-medium text-destructive">Unable to load image</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">Please check that the URL is a valid, publicly accessible image.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-lg border-2 border-dashed border-border p-6 flex flex-col items-center justify-center text-center text-muted-foreground bg-muted/10">
                <ImageIcon className="size-8 mb-2 opacity-50" />
                <p className="text-xs font-medium">No image URL specified</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Enter a URL above to see a live preview</p>
              </div>
            )}
          </div>

          {/* Project Settings */}
          <div className="bg-card p-6 rounded-xl border border-border shadow-sm space-y-6">
            <h2 className="text-base font-semibold border-b border-border pb-3">Settings</h2>
            
            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live Project URL</Label>
              <Input
                id="liveUrl"
                name="liveUrl"
                type="url"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className="bg-background"
              />
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg border border-border p-4 bg-muted/20">
              <div className="space-y-0.5">
                <Label htmlFor="featured" className="text-base font-semibold">Featured Project</Label>
                <p className="text-sm text-muted-foreground">
                  Highlight this project on the homepage
                </p>
              </div>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={handleSwitchChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                name="order"
                type="number"
                min="0"
                value={formData.order}
                onChange={handleChange}
                className="bg-background"
              />
              <p className="text-xs text-muted-foreground">Lower numbers appear first.</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
