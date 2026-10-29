import { Fragment } from 'react';
import dims from '../content/media-dimensions.json';
import type { Media } from '../content/types';

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

const SIZES = [720, 1440] as const;

export function Picture({
  media, sizes = '100vw', className = '', priority = false,
}: { media: Media; sizes?: string; className?: string; priority?: boolean }) {
  const d = (dims as Record<string, { width: number; height: number }>)[media.base] ?? { width: 1280, height: 853 };
  const set = (ext: string) =>
    SIZES.map((w) => `/media/${media.base}-${w}.${ext} ${Math.min(w, d.width)}w`).join(', ');
  return (
    <picture className={`pic ${className}`}>
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

export function Monogram({ size = 44, title }: { size?: number; title?: string }) {
  return (
    <svg className="monogram" width={size} height={size} viewBox="0 0 48 48" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <rect x="4.5" y="4.5" width="39" height="39" fill="none" stroke="currentColor" strokeWidth="0.9" />
      <rect x="7.5" y="7.5" width="33" height="33" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.55" />
      <text x="24" y="34" textAnchor="middle" className="monogram__s">S</text>
    </svg>
  );
}

export function ArrowIcon({ dir = 'right' }: { dir?: 'right' | 'down' | 'up-right' }) {
  const rot = dir === 'down' ? 90 : dir === 'up-right' ? -45 : 0;
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
