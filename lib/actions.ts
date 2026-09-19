'use server';

import { revalidatePath } from 'next/cache';

/**
 * Server Action to revalidate public pages after admin CRUD operations.
 * Runs on the server only — the secret never leaves the server.
 * Called from client-side admin code via React Server Actions.
 */
export async function revalidateProjectPages(slug?: string): Promise<void> {
  // Revalidate both locale home pages (projects section)
  revalidatePath('/ar');
  revalidatePath('/en');

  // If a specific project slug was provided, also revalidate its detail pages
  if (slug) {
    revalidatePath(`/ar/projects/${slug}`);
    revalidatePath(`/en/projects/${slug}`);
  }
}
