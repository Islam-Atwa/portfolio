/**
 * Image optimization utilities for remote project covers
 * Provides shimmer blurDataURL placeholders for smooth, layout-shift-free loading
 */

// Elegant neutral shimmer SVG matching the portfolio aesthetic
const generateShimmerSvg = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop stop-color="#0f172a" offset="20%" />
      <stop stop-color="#1e293b" offset="50%" />
      <stop stop-color="#0f172a" offset="80%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#0b1220" />
  <rect id="shimmer-rect" width="${w}" height="${h}" fill="url(#shimmer)" />
  <animate xlink:href="#shimmer-rect" attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
</svg>`;

const toBase64 = (str: string): string => {
  if (typeof window === 'undefined') {
    return Buffer.from(str).toString('base64');
  }
  return window.btoa(str);
};

/**
 * Returns a base64 encoded SVG data URL to use as Next.js Image blurDataURL placeholder
 */
export function getBlurPlaceholder(width = 16, height = 10): string {
  const svg = generateShimmerSvg(width, height);
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

/**
 * Pre-computed default blur placeholder for 16:10 aspect ratio project covers
 */
export const DEFAULT_PROJECT_BLUR_DATA_URL = getBlurPlaceholder(16, 10);
