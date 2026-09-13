'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { deleteProject, reorderProjects } from '@/lib/admin-projects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArrowUp, ArrowDown, Edit, Trash2, GripVertical } from 'lucide-react';

interface ProjectTableProps {
  projects: Project[];
  onUpdate: () => void;
}

export function ProjectTable({ projects, onUpdate }: ProjectTableProps) {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  const sortedProjects = [...projects].sort((a, b) => a.order - b.order);

  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    setIsDeleting(true);
    
    try {
      await deleteProject(deleteConfirmId);
      onUpdate();
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project. Please try again.');
    } finally {
      setIsDeleting(false);
      setDeleteConfirmId(null);
    }
  };

  const moveProject = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === sortedProjects.length - 1)
    ) return;

    setIsReordering(true);
    const newProjects = [...sortedProjects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;
    
    try {
      const orderedIds = newProjects.map((p) => p.id);
      await reorderProjects(orderedIds);
      onUpdate();
    } catch (error) {
      console.error('Failed to reorder projects:', error);
      alert('Failed to reorder projects.');
    } finally {
      setIsReordering(false);
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-xl border border-border overflow-hidden bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted/50 text-muted-foreground border-b border-border">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Order</th>
                <th scope="col" className="px-6 py-4 font-semibold">Image</th>
                <th scope="col" className="px-6 py-4 font-semibold">Title (EN)</th>
                <th scope="col" className="px-6 py-4 font-semibold">Slug</th>
                <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedProjects.map((project, index) => (
                <tr key={project.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <GripVertical className="size-4 text-muted-foreground mr-1" />
                      <div className="flex flex-col">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          disabled={index === 0 || isReordering}
                          onClick={() => moveProject(index, 'up')}
                        >
                          <ArrowUp className="size-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          disabled={index === sortedProjects.length - 1 || isReordering}
                          onClick={() => moveProject(index, 'down')}
                        >
                          <ArrowDown className="size-3" />
                        </Button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative h-12 w-20 rounded-md overflow-hidden bg-muted border border-border">
                      {project.coverImage ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={project.coverImage}
                          alt={project.title_en}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-muted-foreground">
                          No Img
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground max-w-[200px] truncate">
                    {project.title_en}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <code className="text-[11px] bg-muted px-2 py-1 rounded border border-border">{project.slug}</code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.featured ? (
                      <Badge variant="default" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20">Featured</Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground border-border/60">Standard</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <Button variant="outline" size="sm" className="h-8 gap-1.5 border-border/80">
                          <Edit className="size-3.5" />
                          <span>Edit</span>
                        </Button>
                      </Link>
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        className="h-8 gap-1.5"
                        onClick={() => setDeleteConfirmId(project.id)}
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {sortedProjects.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No projects found. Create one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!deleteConfirmId} onOpenChange={(open) => !open && setDeleteConfirmId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Yes, delete project'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
