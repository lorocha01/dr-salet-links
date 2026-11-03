// Blocos compartilhados entre as duas páginas: médico, jornada, perguntas e depoimentos.
import { useId, useState, type CSSProperties } from 'react';
import { doctor } from '../config/site';
import type { Faq as FaqItem, Media, Step } from '../content/types';
import { Kicker, Lines, Picture } from './primitives';

export function DoctorSection({
  index, media, intro, layout, tone,
}: { index: string; media: Media; intro: string; layout: 'face' | 'corporal'; tone: 'light' | 'dark' }) {
  const facts = [
    { n: doctor.yearsSinceGraduation, suffix: '', label: 'anos de formado em Medicina' },
    { n: doctor.yearsInPlasticSurgery, suffix: '+', label: 'anos dedicados à cirurgia plástica' },
  ];
  const extra = [
    ['Formação', doctor.education],
    ['Sociedades médicas', doctor.societies],
    ['Ensino', doctor.teaching],
    ['Publicações', doctor.publications],
  ].filter(([, list]) => (list as string[]).length) as [string, string[]][];

  return (
    <section id="medico" className={`doctor doctor--${layout} tone-${tone}`} aria-labelledby="medico-title">
      <div className="wrap doctor__grid">
        <div className="doctor__media" data-reveal="mask">
          <Picture media={media} sizes="(min-width: 900px) 45vw, 100vw" parallax={0.05} />
        </div>
        <div className="doctor__body">
          <Kicker index={index}>Conheça o médico</Kicker>
          <Lines id="medico-title" lines={['Dr. Luís', '*Fernando Salet*']} className="display-l" />
          <p className="doctor__creds" data-reveal>
            {doctor.role} <span aria-hidden="true">·</span> {doctor.crm} <span aria-hidden="true">·</span> {doctor.rqe}
          </p>
          <p className="lead" data-reveal>{intro}</p>

          <dl className="facts">
            {facts.map((f, i) => (
              <div key={f.label} data-reveal style={{ '--d': i } as CSSProperties}>
                <dt className="facts__n">{f.n}{f.suffix && <span className="facts__plus" aria-label="mais de">{f.suffix}</span>}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
            <div data-reveal style={{ '--d': 2 } as CSSProperties}>
              <dt className="facts__n facts__n--text">Porto Alegre</dt>
              <dd>Atuação nos hospitais {doctor.hospitals.join(' e ')}</dd>
            </div>
          </dl>

          {extra.length > 0 && (
            <dl className="doctor__extra">
              {extra.map(([label, list]) => (
                <div key={label}><dt>{label}</dt>{list.map((x) => <dd key={x}>{x}</dd>)}</div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}

export function Journey({
  id, index, kicker, title, steps, tone, note,
}: { id: string; index: string; kicker: string; title: string[]; steps: Step[]; tone: 'light' | 'dark'; note?: string }) {
  return (
    <section id={id} className={`journey tone-${tone}`} aria-labelledby={`${id}-title`}>
      <div className="wrap journey__grid">
        <div className="journey__head">
          <Kicker index={index}>{kicker}</Kicker>
          <Lines id={`${id}-title`} lines={title} className="display-l" />
          {note && <p className="journey__note" data-reveal>{note}</p>}
        </div>
        <ol className="journey__list">
          {steps.map((s, i) => (
            <li key={s.title} className={s.highlight ? 'is-highlight' : ''} data-reveal style={{ '--d': i % 3 } as CSSProperties}>
              <span className="journey__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {s.highlight && <span className="journey__badge">Disponível para quem mora fora de Porto Alegre</span>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faq({ index, items, tone }: { index: string; items: FaqItem[]; tone: 'light' | 'dark' }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();
  return (
    <section id="duvidas" className={`faq tone-${tone}`} aria-labelledby="duvidas-title">
      <div className="wrap faq__grid">
        <div className="faq__head">
          <Kicker index={index}>Perguntas frequentes</Kicker>
          <Lines id="duvidas-title" lines={['Dúvidas', '*comuns*']} className="display-l" />
          <p className="faq__aside" data-reveal>
            As respostas são informativas e não substituem a consulta. Cada caso é avaliado individualmente.
          </p>
        </div>
        <div className="faq__list">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} className={`faq__item ${isOpen ? 'is-open' : ''}`} data-reveal>
                <h3>
                  <button
                    type="button"
                    id={`${uid}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="faq__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="faq__q">{it.q}</span>
                    <span className="faq__icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={`${uid}-a${i}`} role="region" aria-labelledby={`${uid}-q${i}`} className="faq__a">
                  <div><p>{it.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Renderiza somente quando houver depoimentos autorizados e revisados. */
export function Testimonials({ items }: { items: { quote: string; author: string }[] | null }) {
  if (!items?.length) return null;
  return (
    <section className="testimonial tone-dark" aria-label="Depoimento">
      <div className="wrap">
        {items.map((t) => (
          <blockquote key={t.author} data-reveal>
            <p>“{t.quote}”</p>
            <footer>{t.author}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
