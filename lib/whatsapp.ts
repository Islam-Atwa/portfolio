export const DEFAULT_WHATSAPP_NUMBER = '201005683716';

/**
 * Returns the configured WhatsApp phone number (with country code, no + or spaces).
 */
export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
}

/**
 * Builds a direct wa.me link with an optional pre-filled message.
 */
export function getWhatsAppUrl(message?: string): string {
  const number = getWhatsAppNumber();
  if (!message) {
    return `https://wa.me/${number}`;
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
