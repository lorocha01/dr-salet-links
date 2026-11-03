import { useEffect, useRef, useState } from 'react';
import { doctor, type PageKey } from '../config/site';
import { WhatsLink } from './Chrome';
import { ArrowIcon, Logo } from './primitives';

type Props = {
  page: PageKey;
  nav: { id: string; label: string }[];
  crossLink: { href: string; label: string };
  cta: string;
};

export function Header({ page, nav, crossLink, cta }: Props) {
  const [state, setState] = useState<'top' | 'solid' | 'hidden'>('top');
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 40) setState('top');
        else if (y > last + 4 && y > 400) setState('hidden');
        else if (y < last - 4) setState('solid');
        last = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
    <header className={`header header--${open ? 'solid' : state}`}>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <div className="header__inner">
        <a className="brand" href="#topo" aria-label={`${doctor.name}, início`}>
          <Logo height={48} />
        </a>

        <nav className="header__nav" aria-label="Seções da página">
          <ul>
            {nav.map((n) => (
              <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <a className="header__home" href="/"><ArrowIcon dir="left" />Início</a>
          <a className="header__cross" href={crossLink.href}>{crossLink.label}<ArrowIcon dir="up-right" /></a>
          <WhatsLink page={page} className="btn btn--line btn--sm header__cta">{cta}</WhatsLink>
          <button
            ref={menuBtn}
            type="button"
            className="header__menu"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">{open ? 'Fechar menu' : 'Abrir menu'}</span>
            <span className="burger" aria-hidden="true"><span /><span /></span>
          </button>
        </div>
      </div>
    </header>

      {/* Fora do <header>: o backdrop-filter do cabeçalho viraria o contêiner do position: fixed
          e espremeria o painel na altura do cabeçalho. */}
      <div id="menu-mobile" className={`menu ${open ? 'is-open' : ''}`} hidden={!open}>
        <nav aria-label="Menu">
          <ol>
            {nav.map((n, i) => (
              <li key={n.id} style={{ ['--i' as string]: i }}>
                <a href={`#${n.id}`} onClick={() => setOpen(false)}>
                  <span className="menu__num">{String(i + 1).padStart(2, '0')}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ol>
          <div className="menu__foot">
            <WhatsLink page={page} className="btn btn--solid">{cta}</WhatsLink>
            <a className="menu__cross" href={crossLink.href}>{crossLink.label} <ArrowIcon dir="up-right" /></a>
            <a className="menu__cross" href="/"><ArrowIcon dir="left" /> Voltar ao início</a>
          </div>
        </nav>
      </div>
    </>
  );
}
