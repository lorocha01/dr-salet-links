import { clinic } from '../config/site';

export function whatsappUrl(message?: string) {
  if (!clinic.whatsapp) return null;
  const base = `https://wa.me/${clinic.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
