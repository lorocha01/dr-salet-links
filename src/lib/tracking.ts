// Rastreamento com consentimento (LGPD).
// - Nenhum script de terceiros carrega antes do aceite.
// - Nenhum dado pessoal (nome, telefone, cidade, procedimento) é enviado às plataformas.
// - Cada conversão recebe um event_id único e é disparada uma única vez.
import { tracking, type PageKey } from '../config/site';

export type ConsentState = { analytics: boolean; marketing: boolean; decidedAt: string };
export type ConversionKey =
  | 'CONV-WHATSAPP-FACE'
  | 'CONV-FORM-FACE'
  | 'CONV-WHATSAPP-CORPORAL'
  | 'CONV-FORM-CORPORAL';

const CONSENT_KEY = 'salet.consent.v1';
const ATTR_KEY = 'salet.attribution.v1';
const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as const;

type Attribution = Partial<Record<(typeof UTM_FIELDS)[number], string>> & { referrer?: string; landing?: string };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: unknown; push?: unknown };
    _fbq?: unknown;
  }
}

function safeGet(storage: Storage | undefined, key: string): string | null {
  try { return storage?.getItem(key) ?? null; } catch { return null; }
}
function safeSet(storage: Storage | undefined, key: string, value: string) {
  try { storage?.setItem(key, value); } catch { /* armazenamento indisponível */ }
}

/* ---------- Consentimento ---------- */

export function readConsent(): ConsentState | null {
  const raw = safeGet(globalThis.localStorage, CONSENT_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as ConsentState; } catch { return null; }
}

export function saveConsent(analytics: boolean, marketing: boolean) {
  const state: ConsentState = { analytics, marketing, decidedAt: new Date().toISOString() };
  safeSet(globalThis.localStorage, CONSENT_KEY, JSON.stringify(state));
  applyConsent(state);
  window.dispatchEvent(new CustomEvent('salet:consent', { detail: state }));
}

let loaded = { google: false, meta: false };

export function applyConsent(state: ConsentState | null) {
  if (!state) return;
  // Landing pages com GTM: o gtag já existe (snippet no <head>) e precisa saber da escolha do visitante.
  if (window.gtag) {
    window.gtag('consent', 'update', googleConsent(state));
    window.dataLayer!.push({ event: 'consent_update', consent_analytics: state.analytics, consent_marketing: state.marketing });
  }
  const needsGoogle = (state.analytics && tracking.ga4Id) || (state.marketing && tracking.googleAdsId);
  if (needsGoogle && !loaded.google) loadGoogle(state);
  if (state.marketing && tracking.metaPixelId && !loaded.meta) loadMeta();
}

function loadScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function googleConsent(state: ConsentState) {
  return {
    analytics_storage: state.analytics ? 'granted' : 'denied',
    ad_storage: state.marketing ? 'granted' : 'denied',
    ad_user_data: state.marketing ? 'granted' : 'denied',
    ad_personalization: 'denied',
  };
}

function loadGoogle(state: ConsentState) {
  loaded.google = true;
  const firstId = tracking.ga4Id ?? tracking.googleAdsId!;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    // Sem GTM na página: inicializa o gtag aqui. Com GTM, o snippet do <head> já fez isso.
    window.gtag = function gtag() { window.dataLayer!.push(arguments); };
    window.gtag('consent', 'default', googleConsent(state));
    window.gtag('js', new Date());
  }
  if (tracking.ga4Id && state.analytics) window.gtag('config', tracking.ga4Id, { anonymize_ip: true });
  if (tracking.googleAdsId && state.marketing) window.gtag('config', tracking.googleAdsId);
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(firstId)}`);
}

function loadMeta() {
  loaded.meta = true;
  // Snippet oficial do Meta Pixel, reescrito sem eval.
  const fbq = function (...args: unknown[]) {
    const f = fbq as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
    if (f.callMethod) f.callMethod(...args); else f.queue.push(args);
  } as unknown as NonNullable<Window['fbq']>;
  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.push = fbq;
  window.fbq = fbq;
  window._fbq = fbq;
  loadScript('https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', tracking.metaPixelId);
  fbq('track', 'PageView');
}

/* ---------- Atribuição (UTM / origem) ---------- */

export function captureAttribution() {
  const params = new URLSearchParams(location.search);
  const found: Attribution = {};
  for (const k of UTM_FIELDS) {
    const v = params.get(k);
    if (v) found[k] = v.slice(0, 120);
  }
  const existing = readAttribution();
  // Primeiro toque da sessão prevalece; uma nova campanha na URL substitui.
  if (Object.keys(found).length || !existing) {
    found.referrer = document.referrer ? new URL(document.referrer).hostname : 'direto';
    found.landing = location.pathname;
    safeSet(globalThis.sessionStorage, ATTR_KEY, JSON.stringify(found));
  }
}

export function readAttribution(): Attribution | null {
  const raw = safeGet(globalThis.sessionStorage, ATTR_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as Attribution; } catch { return null; }
}

/* ---------- Conversões ---------- */

const fired = new Set<string>();

function newEventId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/**
 * Registra uma conversão uma única vez por `actionId`.
 * Use um actionId por interação (ex.: o id de envio do formulário) para evitar contagens duplicadas
 * em cliques repetidos ou re-renderizações.
 */
export function trackConversion(key: ConversionKey, page: PageKey, actionId: string = newEventId()) {
  if (fired.has(actionId)) return;
  fired.add(actionId);

  const attr = readAttribution() ?? {};
  // Somente dados não pessoais.
  const params = {
    page,
    event_id: actionId,
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
  };

  // dataLayer para o GTM (instalado em /face e /corporal): use estes eventos como acionadores.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: key, ...params });

  const consent = readConsent();
  const gaEvent = key.toLowerCase().replace(/-/g, '_'); // GA4 não aceita hífen em nomes de evento

  if (window.gtag) {
    if (consent?.analytics && tracking.ga4Id) window.gtag('event', gaEvent, params);
    const label = tracking.googleAdsLabels[key];
    if (consent?.marketing && tracking.googleAdsId && label) {
      window.gtag('event', 'conversion', { send_to: `${tracking.googleAdsId}/${label}`, transaction_id: actionId });
    }
  }
  if (consent?.marketing && window.fbq) {
    // eventID permite deduplicação com a API de Conversões quando ela existir no servidor.
    window.fbq('trackCustom', gaEvent, { page }, { eventID: actionId });
    window.fbq('track', 'Contact', {}, { eventID: `${actionId}-c` });
  }
  if (import.meta.env.DEV) console.info('[tracking]', key, params);
}

/**
 * Clique em um destino da página de links (/links). Evento neutro, não é conversão:
 * as conversões de WhatsApp/formulário continuam sendo disparadas apenas nas landing pages.
 */
export function trackLinkClick(destination: string) {
  const attr = readAttribution() ?? {};
  const params = {
    link_destination: destination,
    page: 'links',
    utm_source: attr.utm_source,
    utm_medium: attr.utm_medium,
    utm_campaign: attr.utm_campaign,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'link_click', ...params });

  const consent = readConsent();
  if (window.gtag && consent?.analytics && tracking.ga4Id) {
    // transport_type beacon: o evento é enviado mesmo quando o clique sai da página.
    window.gtag('event', 'link_click', { ...params, transport_type: 'beacon' });
  }
  if (consent?.marketing && window.fbq) window.fbq('trackCustom', 'link_click', { link_destination: destination });
  if (import.meta.env.DEV) console.info('[tracking] link_click', params);
}

export function initTracking() {
  captureAttribution();
  applyConsent(readConsent());
}
