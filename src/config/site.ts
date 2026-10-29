// Dados institucionais do Dr. Salet — mesmos de https://github.com/lorocha01/dr-luis-fernando-salet (src/config/site.ts).
// Regra do projeto: somente informações confirmadas entram aqui. Pendências ficam como `null`.

const env = import.meta.env;

/** Site principal, onde estão as landing pages /face e /corporal. Trocar para https://drsalet.com.br quando o domínio apontar para ele. */
export const mainSiteUrl = ((env.VITE_MAIN_SITE_URL as string | undefined) || 'https://dr-luis-fernando-salet.vercel.app').replace(/\/$/, '');

export const doctor = {
  name: 'Dr. Luís Fernando Salet',
  role: 'Médico · Cirurgião plástico',
  crm: 'CRM/RS 22192',
  rqe: 'RQE 19116',
  rqeArea: 'Cirurgia Plástica',
};

export const clinic = {
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
  // PENDENTE: número de WhatsApp da recepção. Sem ele, "Agendar" liga para o telefone fixo.
  whatsapp: (env.VITE_WHATSAPP_NUMBER as string | undefined)?.replace(/\D/g, '') || null,
};

export const tracking = {
  ga4Id: (env.VITE_GA4_ID as string | undefined) || null,
  metaPixelId: (env.VITE_META_PIXEL_ID as string | undefined) || null,
};
