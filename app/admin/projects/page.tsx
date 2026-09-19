'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Project } from '@/lib/types';
import { mapDocToProject } from '@/lib/projects';
import { AdminHeader } from '@/components/admin/admin-header';
import { AuthGuard } from '@/components/admin/auth-guard';
import { ProjectTable } from '@/components/admin/project-table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map((docSnap) =>
        mapDocToProject(docSnap.id, docSnap.data())
      );
      
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching projects:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/20 flex flex-col">
        <AdminHeader />
        
        <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Projects CMS</h1>
              <p className="text-sm text-muted-foreground mt-1">Manage all projects displayed on the portfolio.</p>
            </div>
            
            <Link href="/admin/projects/new">
              <Button className="gap-2 shadow-sm font-medium">
                <PlusCircle className="size-4" />
                <span>Add New Project</span>
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-12 bg-card rounded-xl border border-border shadow-sm">
              <Loader2 className="size-6 animate-spin text-primary mr-2" />
              <span className="text-muted-foreground font-medium">Loading projects...</span>
            </div>
          ) : (
            <ProjectTable projects={projects} onUpdate={() => {}} />
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
