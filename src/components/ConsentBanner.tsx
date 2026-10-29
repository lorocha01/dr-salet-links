// Banner de consentimento (LGPD), igual ao do site principal. Política de privacidade fica no site principal.
import { useEffect, useState } from 'react';
import { mainSiteUrl } from '../config/site';
import { readConsent, saveConsent } from '../lib/tracking';

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

  if (!open) return null;
  const decide = (a: boolean, m: boolean) => {
    saveConsent(a, m);
    setOpen(false);
  };
  return (
    <div className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title">
      <p id="consent-title" className="consent__title">Privacidade</p>
      <p className="consent__text">
        Usamos cookies essenciais para o funcionamento do site e, com a sua permissão, cookies de medição e de publicidade.
        Nenhum dado de saúde ou de contato é compartilhado com plataformas de anúncios. <a href={`${mainSiteUrl}/privacidade`}>Saiba mais</a>.
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
  );
}
