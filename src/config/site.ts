// Dados institucionais compartilhados pelas duas landing pages.
// Regra do projeto: somente informações confirmadas no briefing entram aqui.
// Tudo que está pendente fica como `null` / lista vazia e a interface se adapta (oculta o bloco).
// Ver docs/PENDENCIAS.md.

const env = import.meta.env;

export const doctor = {
  name: 'Dr. Luís Fernando Salet',
  shortName: 'Dr. Salet',
  role: 'Médico · Cirurgião plástico',
  crm: 'CRM/RS 22192',
  rqe: 'RQE 19116',
  rqeArea: 'Cirurgia Plástica',
  // Briefing: "30 anos de formado e mais de 20 anos de cirurgia plástica" — reconfirmar antes de publicar.
  yearsSinceGraduation: 30,
  yearsInPlasticSurgery: 20,
  // Briefing: "Hospitais Moinhos e Blanc" — reconfirmar grafia oficial.
  hospitals: ['Moinhos', 'Blanc'],
  // PENDENTE: formação detalhada, sociedades médicas, ensino, publicações.
  // O bio do Instagram cita SBCP, ISAPS e ASPS, mas o briefing marca sociedades como "a confirmar".
  education: [] as string[],
  societies: [] as string[],
  teaching: [] as string[],
  publications: [] as string[],
};

export const clinic = {
  // PENDENTE: nome oficial da clínica.
  name: null as string | null,
  phoneDisplay: '(51) 3024-7494',
  phoneHref: 'tel:+555130247494',
  instagramHandle: '@dr.salet',
  instagramUrl: 'https://www.instagram.com/dr.salet/',
  address: {
    street: 'Rua Mariante, 180',
    district: 'Rio Branco',
    city: 'Porto Alegre',
    state: 'RS',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Mariante+180+Rio+Branco+Porto+Alegre+RS',
  },
  // WhatsApp da recepção: +55 51 9365-8237. `VITE_WHATSAPP_NUMBER` sobrescreve.
  whatsapp: ((env.VITE_WHATSAPP_NUMBER as string | undefined) || '555193658237').replace(/\D/g, '') || null,
};

export const tracking = {
  ga4Id: (env.VITE_GA4_ID as string | undefined) || null,
  googleAdsId: (env.VITE_GADS_ID as string | undefined) || null,
  googleAdsLabels: {
    'CONV-WHATSAPP-FACE': (env.VITE_GADS_LABEL_WHATSAPP_FACE as string | undefined) || null,
    'CONV-FORM-FACE': (env.VITE_GADS_LABEL_FORM_FACE as string | undefined) || null,
    'CONV-WHATSAPP-CORPORAL': (env.VITE_GADS_LABEL_WHATSAPP_CORPORAL as string | undefined) || null,
    'CONV-FORM-CORPORAL': (env.VITE_GADS_LABEL_FORM_CORPORAL as string | undefined) || null,
  } as Record<string, string | null>,
  metaPixelId: (env.VITE_META_PIXEL_ID as string | undefined) || null,
};

export type PageKey = 'face' | 'corporal';
