import { useRef, useState, type FormEvent } from 'react';
import { clinic, type PageKey } from '../config/site';
import { trackConversion } from '../lib/tracking';
import { buildLeadMessage, hasWhatsapp, isValidPhone, maskPhone, whatsappUrl } from '../lib/whatsapp';
import { ArrowIcon, WhatsIcon } from './primitives';

type Fields = { name: string; phone: string; city: string; procedure: string; moment: string; period: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'loading' | 'done' | 'no-channel';

const MOMENTS = ['Desejo agendar uma avaliação', 'Estou pesquisando para os próximos meses'];
const PERIODS = ['Manhã', 'Tarde'];

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Informe seu nome.';
  if (!isValidPhone(f.phone)) e.phone = 'Informe um celular com DDD, ex.: (51) 99999-9999.';
  if (f.city.trim().length < 3) e.city = 'Informe sua cidade e estado.';
  if (!f.procedure) e.procedure = 'Selecione um procedimento.';
  if (!f.moment) e.moment = 'Selecione uma opção.';
  if (!f.period) e.period = 'Selecione um período.';
  return e;
}

export function LeadForm({ page, procedures }: { page: PageKey; procedures: string[] }) {
  const [f, setF] = useState<Fields>({ name: '', phone: '', city: '', procedure: '', moment: '', period: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [link, setLink] = useState<string | null>(null);
  const submitId = useRef<string | null>(null);
  const busy = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof Fields, v: string) => {
    const next = { ...f, [k]: k === 'phone' ? maskPhone(v) : v };
    setF(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Fields) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(f));
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    // ref (e não o state) para barrar cliques duplos que chegam antes da nova renderização
    if (busy.current) return;

    if (!hasWhatsapp()) {
      setStatus('no-channel');
      return;
    }

    // O botão sempre abre o WhatsApp, mesmo com campos faltando: a mensagem leva só o que foi preenchido.
    busy.current = true;
    setStatus('loading');
    const message = buildLeadMessage(
      { name: f.name.trim(), city: f.city.trim(), procedure: f.procedure.replace(', quero orientação', ''), moment: f.moment, period: f.period },
      page,
    );
    const url = whatsappUrl(message)!;
    setLink(url);
    if (Object.keys(validate(f)).length === 0) {
      // Um id por envio: cliques repetidos no mesmo envio não duplicam a conversão.
      submitId.current ??= `form-${page}-${Date.now()}`;
      trackConversion(page === 'face' ? 'CONV-FORM-FACE' : 'CONV-FORM-CORPORAL', page, submitId.current);
    } else {
      // Formulário incompleto não conta como lead do formulário, e sim como clique no WhatsApp.
      trackConversion(page === 'face' ? 'CONV-WHATSAPP-FACE' : 'CONV-WHATSAPP-CORPORAL', page);
    }
    // Abrir na mesma interação do clique evita bloqueio de pop-up.
    // (com a flag "noopener" o window.open sempre retorna null, então o opener é anulado manualmente)
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url;
    window.setTimeout(() => {
      busy.current = false;
      setStatus('done');
    }, 450);
  };

  const reset = () => {
    submitId.current = null;
    busy.current = false;
    setStatus('idle');
  };

  if (status === 'done' || status === 'no-channel') {
    const first = f.name.trim().split(' ')[0];
    return (
      <div className="form-result" role="status" aria-live="polite">
        {status === 'done' ? (
          <>
            <p className="form-result__title">Tudo certo{first && `, ${first}`}.</p>
            <p>Abrimos o WhatsApp da recepção com sua mensagem pronta. É só enviar para continuar o atendimento.</p>
            {link && <a className="btn btn--line" href={link} target="_blank" rel="noopener noreferrer"><WhatsIcon /> Abrir o WhatsApp novamente</a>}
          </>
        ) : (
          <>
            <p className="form-result__title">Obrigado{first && `, ${first}`}.</p>
            <p>O atendimento por WhatsApp está sendo configurado. Para agendar agora, ligue para a recepção:</p>
            <a className="btn btn--line" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
          </>
        )}
        <button type="button" className="link-btn" onClick={reset}>Editar meus dados</button>
      </div>
    );
  }

  const fieldProps = (k: keyof Fields) => ({
    id: `lf-${page}-${k}`,
    name: k,
    'aria-invalid': Boolean(touched[k] && errors[k]),
    'aria-describedby': touched[k] && errors[k] ? `lf-${page}-${k}-err` : undefined,
  });
  const Err = ({ k }: { k: keyof Fields }) =>
    touched[k] && errors[k] ? <span className="field__err" id={`lf-${page}-${k}-err`}>{errors[k]}</span> : null;

  return (
    <form ref={formRef} className="lead-form" onSubmit={onSubmit} noValidate aria-label="Solicitar avaliação">
      <div className={`field ${f.name ? 'has-value' : ''}`}>
        <input {...fieldProps('name')} type="text" autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} onBlur={() => blur('name')} placeholder=" " />
        <label htmlFor={`lf-${page}-name`}>Nome</label>
        <Err k="name" />
      </div>
      <div className="field-row">
        <div className={`field ${f.phone ? 'has-value' : ''}`}>
          <input {...fieldProps('phone')} type="tel" inputMode="numeric" autoComplete="tel-national" value={f.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => blur('phone')} placeholder=" " />
          <label htmlFor={`lf-${page}-phone`}>WhatsApp com DDD</label>
          <Err k="phone" />
        </div>
        <div className={`field ${f.city ? 'has-value' : ''}`}>
          <input {...fieldProps('city')} type="text" autoComplete="address-level2" value={f.city} onChange={(e) => set('city', e.target.value)} onBlur={() => blur('city')} placeholder=" " />
          <label htmlFor={`lf-${page}-city`}>Cidade e estado</label>
          <Err k="city" />
        </div>
      </div>
      <div className={`field field--select ${f.procedure ? 'has-value' : ''}`}>
        <select {...fieldProps('procedure')} value={f.procedure} onChange={(e) => set('procedure', e.target.value)} onBlur={() => blur('procedure')}>
          <option value="" disabled>Selecione</option>
          {procedures.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <label htmlFor={`lf-${page}-procedure`}>Interesse no procedimento</label>
        <Err k="procedure" />
      </div>

      <fieldset className="choice" aria-invalid={Boolean(touched.moment && errors.moment)}>
        <legend>Momento do contato</legend>
        <div className="choice__opts">
          {MOMENTS.map((m) => (
            <label key={m} className={`chip ${f.moment === m ? 'is-on' : ''}`}>
              <input type="radio" name={`moment-${page}`} value={m} checked={f.moment === m} onChange={() => set('moment', m)} onBlur={() => blur('moment')} />
              {m}
            </label>
          ))}
        </div>
        <Err k="moment" />
      </fieldset>
      <fieldset className="choice" aria-invalid={Boolean(touched.period && errors.period)}>
        <legend>Melhor horário para contato</legend>
        <div className="choice__opts">
          {PERIODS.map((p) => (
            <label key={p} className={`chip ${f.period === p ? 'is-on' : ''}`}>
              <input type="radio" name={`period-${page}`} value={p} checked={f.period === p} onChange={() => set('period', p)} onBlur={() => blur('period')} />
              {p}
            </label>
          ))}
        </div>
        <Err k="period" />
      </fieldset>

      <button type="submit" className="btn btn--solid btn--block" disabled={status === 'loading'} aria-busy={status === 'loading'}>
        {status === 'loading' ? <span className="spinner" aria-hidden="true" /> : null}
        {status === 'loading' ? 'Abrindo o WhatsApp…' : hasWhatsapp() ? 'Continuar no WhatsApp' : 'Solicitar avaliação'}
        {status !== 'loading' && <ArrowIcon />}
      </button>
      <p className="form-note">
        {hasWhatsapp()
          ? 'Ao continuar, o WhatsApp da recepção abre com sua mensagem preenchida. Este site não armazena os dados digitados.'
          : 'Este site não armazena os dados digitados.'}{' '}
        <a href="/privacidade">Política de privacidade</a>.
      </p>
    </form>
  );
}
