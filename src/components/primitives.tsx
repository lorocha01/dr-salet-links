import { Fragment, useState, type CSSProperties, type ReactNode } from 'react';
import dims from '../content/media-dimensions.json';
import type { Media, RemoteVideo, Video } from '../content/types';

/** Renderiza texto em que trechos entre *asteriscos* viram itálico editorial. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('*') ? <em key={i}>{p.slice(1, -1)}</em> : <Fragment key={i}>{p}</Fragment>,
      )}
    </>
  );
}

/** Título em linhas, cada linha com máscara de revelação própria. */
export function Lines({ lines, as: Tag = 'h2', className = '', id }: { lines: string[]; as?: 'h1' | 'h2' | 'h3'; className?: string; id?: string }) {
  return (
    <Tag id={id} className={`lines ${className}`}>
      {lines.map((l, i) => (
        <span className="line" key={i} style={{ '--i': i } as CSSProperties}>
          <span className="line__inner"><Rich text={l} /></span>
        </span>
      ))}
    </Tag>
  );
}

const SIZES = [720, 1440] as const;

export function Picture({
  media, sizes = '100vw', className = '', priority = false, parallax,
}: { media: Media; sizes?: string; className?: string; priority?: boolean; parallax?: number }) {
  const d = (dims as Record<string, { width: number; height: number }>)[media.base] ?? { width: 1280, height: 853 };
  const set = (ext: string) =>
    SIZES.map((w) => `/media/${media.base}-${w}.${ext} ${Math.min(w, d.width)}w`).join(', ');
  return (
    <picture className={`pic ${className}`} {...(parallax ? { 'data-parallax': parallax } : {})}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`/media/${media.base}-720.jpg`}
        srcSet={set('jpg')}
        sizes={sizes}
        width={d.width}
        height={d.height}
        alt={media.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchpriority: 'high' } : {})}
        style={{ objectPosition: media.focus ?? '50% 50%' }}
      />
    </picture>
  );
}

export function Kicker({ index, children, tone }: { index?: string; children: ReactNode; tone?: 'brass' }) {
  return (
    <p className={`kicker ${tone ? `kicker--${tone}` : ''}`} data-reveal>
      {index && <span className="kicker__index">{index}</span>}
      <span className="kicker__rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

/** Logo oficial (PNG branco) usado como máscara: herda `currentColor`, então serve no fundo claro e no escuro. */
export function Logo({ height = 44, className = '' }: { height?: number; className?: string }) {
  return (
    <span
      className={`logo ${className}`}
      role="img"
      aria-label="Dr. Salet — Cirurgia Plástica"
      style={{ width: Math.round(height * (800 / 238)) }}
    />
  );
}

export function ArrowIcon({ dir = 'right' }: { dir?: 'right' | 'left' | 'down' | 'up-right' }) {
  const rot = dir === 'down' ? 90 : dir === 'up-right' ? -45 : dir === 'left' ? 180 : 0;
  return (
    <svg className="arrow" width="18" height="10" viewBox="0 0 18 10" aria-hidden="true" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M0 5h16M12 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function WhatsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.35-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

/** Vídeo carregado sob demanda: apenas o pôster é baixado até o clique. */
export function VideoFeature({ video, className = '' }: { video: NonNullable<Video>; className?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className={`video ${className}`}>
      {playing ? (
        <video controls autoPlay playsInline preload="metadata" poster={`/media/${video.poster.base}-1440.jpg`} aria-label={video.title}>
          <source src={video.src} type="video/mp4" />
          {video.captions && <track kind="captions" src={video.captions} srcLang="pt-BR" label="Português" default />}
        </video>
      ) : (
        <button type="button" className="video__poster" onClick={() => setPlaying(true)} aria-label={`Reproduzir vídeo: ${video.title}`}>
          <Picture media={video.poster} sizes="(min-width: 900px) 50vw, 100vw" />
          <span className="video__play" aria-hidden="true"><span /></span>
        </button>
      )}
      <figcaption>{video.title}</figcaption>
    </figure>
  );
}

/**
 * Vídeo carregado diretamente da URL original (sem nova hospedagem).
 * Só a miniatura é baixada; o arquivo começa a carregar quando a pessoa clica em reproduzir.
 */
export function RemoteVideoPlayer({ video }: { video: RemoteVideo }) {
  const [state, setState] = useState<'poster' | 'playing' | 'unsupported'>('poster');
  const play = () => {
    const probe = document.createElement('video');
    setState(probe.canPlayType(video.type) ? 'playing' : 'unsupported');
  };
  const ratio = { aspectRatio: `${video.width} / ${video.height}` };

  return (
    <div className="rvideo" style={ratio}>
      {state === 'playing' ? (
        <video
          controls
          autoPlay
          playsInline
          preload="metadata"
          poster={video.poster}
          width={video.width}
          height={video.height}
          aria-label={video.label}
          onError={() => setState('unsupported')}
        >
          <source src={video.src} type={video.type} />
        </video>
      ) : state === 'unsupported' ? (
        <div className="rvideo__fallback" role="status">
          <p>Este navegador não reproduz o formato do vídeo. Atualize o navegador ou assista em outro dispositivo.</p>
        </div>
      ) : (
        <button type="button" className="rvideo__poster" onClick={play} aria-label={`Reproduzir vídeo: ${video.label}`}>
          <img src={video.poster} alt="" width={video.width} height={video.height} loading="lazy" decoding="async" />
          <span className="rvideo__play" aria-hidden="true"><span /></span>
          {video.duration && <span className="rvideo__dur">{video.duration}</span>}
        </button>
      )}
    </div>
  );
}
