'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getProject } from '@/lib/projects';
import type { Project } from '@/lib/types';
import { AdminHeader } from '@/components/admin/admin-header';
import { AuthGuard } from '@/components/admin/auth-guard';
import { ProjectForm } from '@/components/admin/project-form';
import { Loader2 } from 'lucide-react';

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!id) return;
      
      const data = await getProject(id);
      if (data) {
        setProject(data);
      } else {
        alert('Project not found');
        router.push('/admin/projects');
      }
      setLoading(false);
    }
    
    fetchProject();
  }, [id, router]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/20 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Edit Project</h1>
            <p className="text-sm text-muted-foreground mt-1">Update project details and settings.</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12 bg-card rounded-xl border border-border shadow-sm">
              <Loader2 className="size-6 animate-spin text-primary mr-2" />
              <span className="text-muted-foreground font-medium">Loading project details...</span>
            </div>
          ) : project ? (
            <ProjectForm initialData={project} isEdit={true} />
          ) : null}
        </main>
      </div>
    </AuthGuard>
  );
}
