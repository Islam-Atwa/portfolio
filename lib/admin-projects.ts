import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { ProjectFormData } from './types';
import { generateSlug } from './slug';
import { revalidateProjectPages } from './actions';

const COLLECTION_NAME = 'projects';

/**
 * Create a new project
 */
export async function createProject(data: ProjectFormData): Promise<string> {
  if (!db) throw new Error('Firebase Firestore is not configured');

  const projectsCol = collection(db, COLLECTION_NAME);
  
  // Auto-generate slug from English title
  const slug = generateSlug(data.title_en);
  
  const docRef = await addDoc(projectsCol, {
    ...data,
    slug,
    createdAt: serverTimestamp(),
  });
  
  // Purge cached public pages so the new project appears immediately
  await revalidateProjectPages(slug).catch(() => {});

  return docRef.id;
}

/**
 * Update an existing project
 */
export async function updateProject(id: string, data: Partial<ProjectFormData> & { slug?: string }): Promise<void> {
  if (!db) throw new Error('Firebase Firestore is not configured');

  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, data);

  // Purge cached public pages so edits are reflected immediately
  await revalidateProjectPages(data.slug).catch(() => {});
}

/**
 * Delete a project
 */
export async function deleteProject(id: string, slug?: string): Promise<void> {
  if (!db) throw new Error('Firebase Firestore is not configured');

  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);

  // Purge cached public pages so deleted project disappears immediately
  await revalidateProjectPages(slug).catch(() => {});
}

/**
 * Reorder projects in batch
 */
export async function reorderProjects(orderedIds: string[]): Promise<void> {
  if (!db) throw new Error('Firebase Firestore is not configured');

  const firestore = db;
  const batch = writeBatch(firestore);

  orderedIds.forEach((id, index) => {
    const docRef = doc(firestore, COLLECTION_NAME, id);
    batch.update(docRef, { order: index });
  });

  await batch.commit();

  // Purge cached home pages so the new order is reflected
  await revalidateProjectPages().catch(() => {});
}
