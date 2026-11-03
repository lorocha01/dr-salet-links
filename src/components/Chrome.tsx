// Elementos de moldura da página: agendamento, rodapé, botão fixo de WhatsApp, consentimento e o shell.
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { clinic, doctor, type PageKey } from '../config/site';
import type { Common } from '../content/types';
import { initParallax, initReveal } from '../lib/motion';
import { initTracking, readConsent, saveConsent, trackConversion } from '../lib/tracking';
import { defaultMessage, hasWhatsapp, whatsappUrl } from '../lib/whatsapp';
import { Header } from './Header';
import { LeadForm } from './LeadForm';
import { ArrowIcon, Kicker, Lines, Logo, WhatsIcon } from './primitives';

/** Link de WhatsApp com rastreamento; sem número configurado, cai para o telefone. */
export function WhatsLink({ page, className = '', children }: { page: PageKey; className?: string; children?: ReactNode }) {
  const url = whatsappUrl(defaultMessage(page));
  if (!url) {
    return <a className={className} href={clinic.phoneHref}>{children ?? `Ligar ${clinic.phoneDisplay}`}</a>;
  }
  return (
    <a
      className={className}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackConversion(page === 'face' ? 'CONV-WHATSAPP-FACE' : 'CONV-WHATSAPP-CORPORAL', page)}
    >
      <WhatsIcon /> {children ?? 'Conversar pelo WhatsApp'}
    </a>
  );
}

export function Booking({ page, content, index, tone }: { page: PageKey; content: Common['booking']; index: string; tone: 'light' | 'dark' }) {
  return (
    <section id="agendar" className={`booking tone-${tone}`} aria-labelledby="agendar-title">
      <div className="wrap booking__grid">
        <div className="booking__intro">
          <Kicker index={index} tone="brass">Agendamento</Kicker>
          <Lines id="agendar-title" lines={content.title} className="display-xl" />
          <p className="lead" data-reveal>{content.text}</p>
          <div className="booking__direct" data-reveal>
            <p className="label">Contato direto</p>
            <WhatsLink page={page} className="booking__link" />
            {hasWhatsapp() && <a className="booking__link" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>}
            <address className="booking__addr">
              {clinic.address.street}, {clinic.address.district}<br />
              {clinic.address.city}/{clinic.address.state}
            </address>
          </div>
        </div>
        <div className="booking__form" data-reveal>
          <LeadForm page={page} procedures={content.procedures} />
        </div>
      </div>
    </section>
  );
}

export function Footer({ crossLink }: { crossLink: Common['crossLink'] }) {
  return (
    <footer className="footer tone-dark">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo height={64} />
            <div>
              <p className="footer__name">{doctor.name}</p>
              <p className="footer__meta">{doctor.role}</p>
              <p className="footer__meta">{doctor.crm} · {doctor.rqe} ({doctor.rqeArea})</p>
            </div>
          </div>
          <a className="footer__cross" href={crossLink.href}>
            <span className="label">{crossLink.text}</span>
            <span className="footer__cross-title">{crossLink.label} <ArrowIcon /></span>
          </a>
        </div>
        <div className="footer__cols">
          <div>
            <p className="label">Endereço</p>
            <address>
              {clinic.name && <>{clinic.name}<br /></>}
              {clinic.address.street}<br />
              {clinic.address.district}, {clinic.address.city}/{clinic.address.state}
            </address>
            <a className="footer__link" href={clinic.address.mapsUrl} target="_blank" rel="noopener noreferrer">Ver no mapa</a>
          </div>
          <div>
            <p className="label">Contato</p>
            <a className="footer__link" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
            {hasWhatsapp() && <a className="footer__link" href={whatsappUrl()!} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
            <a className="footer__link" href={clinic.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram {clinic.instagramHandle}</a>
          </div>
          <div>
            <p className="label">Informações</p>
            <a className="footer__link" href="/privacidade">Política de privacidade</a>
            <button type="button" className="footer__link link-btn" onClick={() => window.dispatchEvent(new Event('salet:open-consent'))}>
              Preferências de cookies
            </button>
          </div>
        </div>
        <p className="footer__legal">
          As informações deste site têm caráter informativo e educativo e não substituem a consulta médica.
          A indicação de qualquer procedimento depende de avaliação individual. Resultados variam de pessoa para pessoa.
          Responsável técnico: {doctor.name}, {doctor.crm} · {doctor.rqe}.
        </p>
        <p className="footer__copy">© {new Date().getFullYear()} {doctor.name}</p>
      </div>
    </footer>
  );
}

/** Botão flutuante de WhatsApp, fixo em todas as telas (no celular, só o ícone). */
export function MobileCta({ page }: { page: PageKey }) {
  if (!hasWhatsapp()) return null;
  return (
    <WhatsLink page={page} className="wa-float">
      <span className="wa-float__label">Fale no WhatsApp</span>
    </WhatsLink>
  );
}

export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
    const reopen = () => {
      const c = readConsent();
      setAnalytics(Boolean(c?.analytics));
      setMarketing(Boolean(c?.marketing));
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener('salet:open-consent', reopen);
    return () => window.removeEventListener('salet:open-consent', reopen);
  }, []);

  // A barra reserva sua própria altura (--consent-h) para nunca cobrir conteúdo nem o CTA fixo.
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    if (!open || !bar.current) {
      root.style.removeProperty('--consent-h');
      return;
    }
    const ro = new ResizeObserver(([e]) => root.style.setProperty('--consent-h', `${Math.ceil(e.borderBoxSize?.[0]?.blockSize ?? e.target.getBoundingClientRect().height)}px`));
    ro.observe(bar.current);
    return () => {
      ro.disconnect();
      root.style.removeProperty('--consent-h');
    };
  }, [open]);

  if (!open) return null;
  const decide = (a: boolean, m: boolean) => {
    saveConsent(a, m);
    setOpen(false);
  };
  return (
    <div ref={bar} className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title">
      <div className="consent__inner">
      <p id="consent-title" className="sr-only">Privacidade</p>
      <p className="consent__text">
        Usamos cookies essenciais para o funcionamento do site e, com a sua permissão, cookies de medição e de publicidade.{' '}
        <span className="consent__more">Nenhum dado de saúde ou de contato é compartilhado com plataformas de anúncios.</span>{' '}
        <a href="/privacidade">Saiba mais</a>.
      </p>
      {custom && (
        <div className="consent__opts">
          <label><input type="checkbox" checked disabled /> Essenciais</label>
          <label><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} /> Medição de audiência</label>
          <label><input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} /> Publicidade</label>
        </div>
      )}
      <div className="consent__actions">
        {custom ? (
          <button type="button" className="btn btn--solid btn--sm" onClick={() => decide(analytics, marketing)}>Salvar preferências</button>
        ) : (
          <>
            <button type="button" className="btn btn--line btn--sm" onClick={() => decide(false, false)}>Apenas essenciais</button>
            <button type="button" className="btn btn--solid btn--sm" onClick={() => decide(true, true)}>Aceitar todos</button>
          </>
        )}
        {!custom && <button type="button" className="link-btn" onClick={() => setCustom(true)}>Personalizar</button>}
      </div>
      </div>
    </div>
  );
}

export function PageShell({ content, theme, children, ctaLabel }: { content: Common; theme: 'face' | 'corporal'; children: ReactNode; ctaLabel: string }) {
  useEffect(() => {
    initTracking();
    document.documentElement.classList.add('js');
    const stopReveal = initReveal();
    const stopParallax = initParallax();
    requestAnimationFrame(() => document.documentElement.classList.add('is-ready'));
    // Âncoras vindas de fora (ex.: /face#medico na página de links): a seção só existe depois da renderização.
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' });
    return () => { stopReveal(); stopParallax(); };
  }, []);

  return (
    <div className={`page page--${theme}`}>
      <Header nav={content.nav} crossLink={content.crossLink} cta={ctaLabel} />
      <main id="conteudo-principal">{children}</main>
      <Footer crossLink={content.crossLink} />
      <MobileCta page={content.page} />
      <ConsentBanner />
    </div>
  );
}
