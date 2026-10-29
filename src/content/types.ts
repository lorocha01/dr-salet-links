export type Media = {
  /** Caminho base em /public/media sem sufixo (ex.: "face/hero-retrato"). */
  base: string;
  alt: string;
  /** Ponto focal para object-position (ex.: "50% 30%"). */
  focus?: string;
};
