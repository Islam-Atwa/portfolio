'use client';

import { AdminHeader } from '@/components/admin/admin-header';
import { AuthGuard } from '@/components/admin/auth-guard';
import { ProjectForm } from '@/components/admin/project-form';

export default function NewProjectPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/20 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create New Project</h1>
            <p className="text-sm text-muted-foreground mt-1">Add a new project to your portfolio showcase.</p>
          </div>

          <ProjectForm isEdit={false} />
        </main>
      </div>
    </AuthGuard>
  );
}
