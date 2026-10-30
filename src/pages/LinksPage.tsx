import { useEffect, type CSSProperties, type ReactNode } from 'react';
import { clinic, doctor, mainSiteUrl } from '../config/site';
import type { Media } from '../content/types';
import { ArrowIcon, Picture, Rich, WhatsIcon } from '../components/primitives';
import { ConsentBanner } from '../components/ConsentBanner';
import { initTracking, trackLinkClick } from '../lib/tracking';
import { whatsappUrl } from '../lib/whatsapp';

// Página de links para a bio do Instagram (projeto separado do site principal).
// Somente destinos confirmados: landing pages do site principal (mainSiteUrl), Instagram, telefone e endereço de src/config/site.ts.
// PENDENTE: WhatsApp da recepção (VITE_WHATSAPP_NUMBER). Enquanto não houver, "Agendar" liga para o telefone fixo.

type Dest = { id: string; href: string; external?: boolean };
type PhotoCard = Dest & { kicker: string; title: string; text: string; media: Media };

const booking: Dest & { channel: ReactNode } = (() => {
  const wa = whatsappUrl('Olá! Gostaria de agendar uma consulta com o Dr. Salet. Conheci o consultório pela página de links do Instagram.');
  return wa
    ? { id: 'agendar_whatsapp', href: wa, external: true, channel: 'Conversar com a recepção pelo WhatsApp' }
    : {
        id: 'agendar_telefone',
        href: clinic.phoneHref,
        // O número nunca quebra no hífen
        channel: <>Ligar para a recepção · <span className="nowrap">{clinic.phoneDisplay}</span></>,
      };
})();

const cards: PhotoCard[] = [
  {
    id: 'cirurgia_facial',
    href: `${mainSiteUrl}/face`,
    kicker: 'Face',
    title: 'Cirurgia *facial*',
    text: 'Deep Plane, Deep Neck, pálpebras, nariz',
    media: { base: 'face/deep-neck-perfil', alt: '', focus: '62% 40%' },
  },
  {
    id: 'contorno_corporal',
    href: `${mainSiteUrl}/corporal`,
    kicker: 'Corpo',
    title: 'Contorno *corporal*',
    text: 'Lipoaspiração, abdominoplastia, mamas',
    media: { base: 'corporal/hero-jaleco', alt: '', focus: '50% 22%' },
  },
  {
    id: 'conheca_dr_salet',
    href: `${mainSiteUrl}/face#medico`,
    kicker: 'O médico',
    title: 'Conheça o *Dr. Salet*',
    text: 'Atuação e forma de atendimento',
    media: { base: 'face/medico', alt: '', focus: '52% 30%' },
  },
];

const track = (id: string) => () => trackLinkClick(id);
const ext = (d: Dest) => (d.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

export function LinksPage() {
  useEffect(() => {
    initTracking();
    requestAnimationFrame(() => document.documentElement.classList.add('is-ready'));
  }, []);

  return (
    <div className="links tone-dark">
      <main className="links__col">
        <header className="lk-hero">
          <div className="lk-hero__media">
            <Picture
              media={{
                base: 'face/hero-retrato',
                alt: 'Retrato do Dr. Luís Fernando Salet em seu consultório, de terno azul-marinho, diante de uma estante com livros e esculturas.',
                focus: '55% 24%',
              }}
              sizes="(min-width: 560px) 520px, 100vw"
              priority
            />
          </div>
          <div className="lk-hero__top">
            <img className="lk-hero__symbol" src="/brand/simbolo-dr-salet.png" width={238} height={238} alt={doctor.name} />
            <span className="label">Porto Alegre · {clinic.address.state}</span>
          </div>
          <div className="lk-hero__body">
            <p className="label lk-hero__role">{doctor.role}</p>
            <h1 className="lk-hero__name">
              <span className="lk-hero__dr">Dr.</span> Luís Fernando <em>Salet</em>
            </h1>
            <p className="lk-hero__creds">{doctor.crm} · {doctor.rqe} ({doctor.rqeArea})</p>
          </div>
        </header>

        <p className="lk-bio lk-in" style={{ '--d': 0 } as CSSProperties}>
          Cirurgia facial e contorno corporal com planejamento individual e atendimento pessoal,
          da primeira conversa ao pós-operatório.
        </p>

        <nav className="lk-nav" aria-label="Links principais">
          <a className="lk-cta lk-in" style={{ '--d': 1 } as CSSProperties} href={booking.href} {...ext(booking)} onClick={track(booking.id)}>
            <span className="lk-cta__icon" aria-hidden="true">{booking.external ? <WhatsIcon /> : <PhoneIcon />}</span>
            <span className="lk-cta__body">
              <span className="lk-cta__title">Agendar uma <em>consulta</em></span>
              <span className="lk-cta__text">{booking.channel}</span>
            </span>
            <ArrowIcon />
          </a>

          {cards.map((c, i) => (
            <a
              key={c.id}
              className={`lk-card lk-in ${i % 2 ? 'lk-card--flip' : ''}`}
              style={{ '--d': i + 2 } as CSSProperties}
              href={c.href}
              onClick={track(c.id)}
            >
              <span className="lk-card__media" aria-hidden="true">
                <Picture media={c.media} sizes="(min-width: 560px) 210px, 40vw" />
              </span>
              <span className="lk-card__body">
                <span className="lk-card__kicker">{c.kicker}</span>
                <span className="lk-card__title"><Rich text={c.title} /></span>
                <span className="lk-card__text">{c.text}</span>
                <ArrowIcon />
              </span>
            </a>
          ))}
        </nav>

        <section className="lk-contact lk-in" style={{ '--d': 5 } as CSSProperties} aria-labelledby="lk-contact-title">
          <h2 id="lk-contact-title" className="label">Localização e contato</h2>
          <ul className="lk-rows">
            <Row id="instagram" href={clinic.instagramUrl} external icon={<InstagramIcon />} title="Instagram" text={clinic.instagramHandle} />
            <Row
              id="localizacao"
              href={clinic.address.mapsUrl}
              external
              icon={<PinIcon />}
              title={`${clinic.address.street} · ${clinic.address.district}`}
              text={`${clinic.address.city}/${clinic.address.state} · Ver no mapa`}
            />
            {booking.external && (
              <Row id="telefone" href={clinic.phoneHref} icon={<PhoneIcon />} title="Telefone" text={clinic.phoneDisplay} />
            )}
          </ul>
        </section>

        <footer className="lk-foot">
          <img className="lk-foot__logo" src="/brand/logo-dr-salet.png" width={800} height={238} alt="Dr. Salet, Cirurgia Plástica" loading="lazy" decoding="async" />
          <p>
            Conteúdo informativo, não substitui a consulta médica. Responsável técnico: {doctor.name}, {doctor.crm} · {doctor.rqe}.
          </p>
          <p className="lk-foot__links">
            <a href={`${mainSiteUrl}/privacidade`}>Privacidade</a>
            <button type="button" className="link-btn" onClick={() => window.dispatchEvent(new Event('salet:open-consent'))}>
              Cookies
            </button>
          </p>
        </footer>
      </main>
      <ConsentBanner />
    </div>
  );
}

function Row({ id, href, external, icon, title, text }: Dest & { icon: ReactNode; title: string; text: string }) {
  return (
    <li>
      <a className="lk-row" href={href} {...ext({ id, href, external })} onClick={track(id)}>
        <span className="lk-row__icon" aria-hidden="true">{icon}</span>
        <span className="lk-row__body">
          <span className="lk-row__title">{title}</span>
          <span className="lk-row__text">{text}</span>
        </span>
        <ArrowIcon dir={external ? 'up-right' : 'right'} />
        {external && <span className="sr-only"> (abre em nova aba)</span>}
      </a>
    </li>
  );
}

/* Ícones de traço fino, no mesmo peso do ArrowIcon. */
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" d="M5 3.5h3.2l1.6 4.2-2 1.4a11 11 0 0 0 7.1 7.1l1.4-2 4.2 1.6V19a1.5 1.5 0 0 1-1.6 1.5C10.7 20 4 13.3 3.5 5.1A1.5 1.5 0 0 1 5 3.5Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="1.3" d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}
