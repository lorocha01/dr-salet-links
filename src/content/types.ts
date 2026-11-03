import type { PageKey } from '../config/site';

export type Media = {
  /** Caminho base em /public/media sem sufixo (ex.: "face/hero-retrato"). */
  base: string;
  alt: string;
  /** Ponto focal para object-position (ex.: "50% 30%"). */
  focus?: string;
};

export type Video = {
  src: string;
  poster: Media;
  title: string;
  captions?: string;
} | null;

/** Vídeo servido pela fonte original (URL externa), sem cópia no projeto. */
export type RemoteVideo = {
  src: string;
  /** MIME com codecs, usado para checar suporte antes de carregar. */
  type: string;
  poster: string;
  width: number;
  height: number;
  label: string;
  duration?: string;
  /** Página onde o vídeo foi identificado. */
  sourcePage: string;
};

export type HeroVariant = {
  eyebrow: string;
  /** Linhas do título; trechos entre *asteriscos* ficam em itálico. */
  title: string[];
  subtitle: string;
  cta: string;
};

export type Faq = { q: string; a: string };
export type Step = { title: string; text: string; highlight?: boolean };

export type Common = {
  page: PageKey;
  /** Variantes do hero para teste A/B: ?v=b na URL. */
  hero: Record<string, HeroVariant>;
  heroMedia: Media;
  heroVideo: Video;
  nav: { id: string; label: string }[];
  faq: Faq[];
  /** null = seção oculta até haver depoimento autorizado. */
  testimonials: { quote: string; author: string; authorization: string }[] | null;
  booking: { title: string[]; text: string; procedures: string[] };
  crossLink: { href: string; label: string; text: string };
};
