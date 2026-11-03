import { clinic, type PageKey } from '../config/site';

export type LeadData = {
  name: string;
  city: string;
  procedure: string;
  moment: string;
  period: string;
};

export function hasWhatsapp() {
  return Boolean(clinic.whatsapp);
}

/** Mensagem do formulário. Campos vazios são omitidos: o botão abre o WhatsApp mesmo com o formulário incompleto. */
export function buildLeadMessage(d: LeadData, page: PageKey) {
  const intro = d.name ? `Olá, sou ${d.name}${d.city ? `, de ${d.city}` : ''}.` : d.city ? `Olá, sou de ${d.city}.` : 'Olá!';
  const interest = d.procedure ? `Tenho interesse em ${d.procedure} e gostaria` : 'Gostaria';
  const lines = [`${intro} ${interest} de obter informações sobre uma avaliação com o Dr. Salet. Conheci o consultório pela página ${page}.`];
  if (d.moment || d.period) lines.push('');
  if (d.moment) lines.push(`Momento: ${d.moment}`);
  if (d.period) lines.push(`Melhor horário para contato: ${d.period}`);
  return lines.join('\n');
}

export function whatsappUrl(message?: string) {
  if (!clinic.whatsapp) return null;
  const base = `https://wa.me/${clinic.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function defaultMessage(page: PageKey) {
  const topic = page === 'face' ? 'cirurgia facial' : 'cirurgia de contorno corporal';
  return `Olá! Gostaria de informações sobre uma avaliação de ${topic} com o Dr. Salet. Conheci o consultório pela página ${page}.`;
}

/** Máscara (DD) 9XXXX-XXXX enquanto o usuário digita. */
export function maskPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function isValidPhone(value: string) {
  const d = value.replace(/\D/g, '');
  return d.length === 11 && d[2] === '9' && Number(d.slice(0, 2)) >= 11;
}
