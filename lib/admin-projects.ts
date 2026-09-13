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
  
  return docRef.id;
}

/**
 * Update an existing project
 */
export async function updateProject(id: string, data: Partial<ProjectFormData> & { slug?: string }): Promise<void> {
  if (!db) throw new Error('Firebase Firestore is not configured');

  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, data);
}

/**
 * Delete a project
 */
export async function deleteProject(id: string): Promise<void> {
  if (!db) throw new Error('Firebase Firestore is not configured');

  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
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
}
