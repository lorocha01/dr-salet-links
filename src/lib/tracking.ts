// Rastreamento com consentimento (LGPD), igual ao do site principal.
// - Nenhum script de terceiros carrega antes do aceite.
// - Nenhum dado pessoal é enviado às plataformas.
import { tracking } from '../config/site';

export type ConsentState = { analytics: boolean; marketing: boolean; decidedAt: string };

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

const loaded = { google: false, meta: false };

export function applyConsent(state: ConsentState | null) {
  if (!state) return;
  if (state.analytics && tracking.ga4Id && !loaded.google) loadGoogle(state);
  if (state.marketing && tracking.metaPixelId && !loaded.meta) loadMeta();
}

function loadScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadGoogle(state: ConsentState) {
  loaded.google = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer!.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: state.analytics ? 'granted' : 'denied',
    ad_storage: state.marketing ? 'granted' : 'denied',
    ad_user_data: state.marketing ? 'granted' : 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  window.gtag('config', tracking.ga4Id, { anonymize_ip: true });
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tracking.ga4Id!)}`);
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

/* ---------- Cliques ---------- */

/**
 * Clique em um destino da página de links. Evento neutro, não é conversão:
 * as conversões de WhatsApp/formulário são disparadas apenas nas landing pages do site principal.
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
