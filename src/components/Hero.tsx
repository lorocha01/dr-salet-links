import { doctor } from '../config/site';
import type { HeroVariant, Media, Video } from '../content/types';
import { WhatsLink } from './Chrome';
import { Lines, Picture } from './primitives';

type Props = {
  variant: HeroVariant;
  variantKey: string;
  media: Media;
  video: Video;
  layout: 'face' | 'corporal';
  tags?: string[];
};

/**
 * Abertura editorial. Duas composições:
 * - face: escura, título monumental à esquerda e retrato vertical sangrando à direita;
 * - corporal: clara, retrato à esquerda emoldurado e índice de procedimentos.
 */
export function Hero({ variant, variantKey, media, video, layout, tags }: Props) {
  return (
    <section id="topo" className={`hero hero--${layout}`} data-variant={variantKey} aria-labelledby="hero-title">
      <div className="hero__media">
        <div className="hero__frame">
          {video ? (
            <video
              className="hero__video"
              autoPlay muted loop playsInline preload="none"
              poster={`/media/${video.poster.base}-1440.jpg`}
              aria-label={video.title}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          ) : (
            <Picture media={media} priority sizes={layout === 'face' ? '(min-width: 900px) 42vw, 100vw' : '(min-width: 900px) 40vw, 100vw'} />
          )}
        </div>
        <span className="hero__frame-line" aria-hidden="true" />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow">{variant.eyebrow}</p>
        <Lines lines={variant.title} as="h1" className="hero__title" id="hero-title" />
        <p className="hero__subtitle">{variant.subtitle}</p>
        <div className="hero__actions">
          <WhatsLink page={layout} className="btn btn--solid">{variant.cta}</WhatsLink>
          <a className="hero__secondary" href="#medico">Conheça o médico</a>
        </div>

        {tags && (
          <ul className="hero__tags" aria-label="Procedimentos">
            {tags.map((t, i) => <li key={t}><span>{String(i + 1).padStart(2, '0')}</span>{t}</li>)}
          </ul>
        )}

        <dl className="hero__creds">
          <div><dt>Médico</dt><dd>{doctor.name}</dd></div>
          <div><dt>Registro</dt><dd>{doctor.crm}</dd></div>
          <div><dt>{doctor.rqeArea}</dt><dd>{doctor.rqe}</dd></div>
        </dl>
      </div>

      <a className="hero__scroll" href="#conteudo" aria-label="Continuar para o conteúdo">
        <span className="hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
