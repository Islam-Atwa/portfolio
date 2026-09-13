/**
 * Sanitizes a title string into a URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

/**
 * Generates a unique, URL-safe slug from a project title.
 * Automatically appends a random 4-character alphanumeric suffix
 * to prevent slug collisions across projects.
 */
export function generateSlug(title: string): string {
  const base = slugify(title) || 'project';
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${base}-${suffix}`;
}
