import type { CSSProperties } from 'react';
import { corporal } from '../content/corporal';
import { Booking, PageShell } from '../components/Chrome';
import { Hero } from '../components/Hero';
import { Kicker, Lines, Picture } from '../components/primitives';
import { DoctorSection, Faq, Journey, Testimonials } from '../components/Sections';
import { pickVariant } from '../lib/variant';

export function CorporalPage() {
  const hero = pickVariant(corporal.hero, 'corporal');
  const { situations, procedures, versus, technologies, travel } = corporal;

  return (
    <PageShell content={corporal} theme="corporal" ctaLabel={hero.value.cta}>
      <Hero
        variant={hero.value}
        variantKey={hero.key}
        media={corporal.heroMedia}
        video={corporal.heroVideo}
        layout="corporal"
        tags={['Lipoaspiração de alta definição', 'Abdominoplastia', 'Cirurgia das mamas']}
      />

      {/* 01 — Situações: grade editorial 2×2 com fios finos */}
      <section className="situations tone-paper" aria-labelledby="sit-title">
        <span id="conteudo" />
        <div className="wrap situations__grid">
          <div className="situations__head">
            <Kicker index={situations.index}>{situations.kicker}</Kicker>
            <Lines id="sit-title" lines={situations.title} className="display-l" />
            <p className="muted" data-reveal>{situations.intro}</p>
          </div>
          <ul className="situations__list">
            {situations.items.map((s, i) => (
              <li key={s.title} data-reveal style={{ '--d': i % 2 } as CSSProperties}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 — Procedimentos: três composições distintas */}
      <section id="procedimentos" className="procs tone-dark" aria-labelledby="procs-title">
        <div className="wrap">
          <div className="procs__head">
            <Kicker index={procedures.index} tone="brass">{procedures.kicker}</Kicker>
            <Lines id="procs-title" lines={procedures.title} className="display-xl" />
          </div>
          <ol className="procs__list">
            {procedures.items.map((p, i) => (
              <li key={p.name} className={`procs__item procs__item--${i + 1}`} data-reveal>
                <span className="procs__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="procs__name">{p.name}</h3>
                <p className="procs__text">{p.text}</p>
                <ul className="procs__tags">
                  {p.detail.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </li>
            ))}
          </ol>
          <p className="note note--center" data-reveal>{procedures.note}</p>
        </div>
      </section>

      {/* 03 — Lipo ou abdominoplastia */}
      <section id="lipo-ou-abdominoplastia" className="versus tone-sand" aria-labelledby="versus-title">
        <div className="wrap">
          <Kicker index={versus.index}>{versus.kicker}</Kicker>
          <Lines id="versus-title" lines={versus.title} className="display-l versus__title" />
          <div className="versus__table" role="table" aria-label="Comparação entre lipoaspiração e abdominoplastia">
            <div className="versus__row versus__row--head" role="row">
              <span role="columnheader" className="versus__aspect versus__corner">Comparativo</span>
              {versus.columns.map((c) => <span key={c.name} role="columnheader" className="versus__name">{c.name}</span>)}
            </div>
            {versus.columns[0].rows.map(([aspect], r) => (
              <div className="versus__row" role="row" key={aspect} data-reveal style={{ '--d': r } as CSSProperties}>
                <span role="rowheader" className="versus__aspect">{aspect}</span>
                {versus.columns.map((c) => <span role="cell" key={c.name}>{c.rows[r][1]}</span>)}
              </div>
            ))}
            <span className="versus__or" aria-hidden="true">ou</span>
          </div>
          <p className="versus__conclusion" data-reveal>{versus.conclusion}</p>
        </div>
      </section>

      {technologies.enabled && technologies.items.length > 0 && (
        <section className="tech tone-paper" aria-label="Tecnologias de apoio">
          <div className="wrap">
            <Kicker>Tecnologias de apoio</Kicker>
            <ul>{technologies.items.map((t) => <li key={t.name}><h3>{t.name}</h3><p>{t.text}</p><small>Registro Anvisa: {t.anvisa}</small></li>)}</ul>
          </div>
        </section>
      )}

      <DoctorSection index={corporal.doctor.index} media={corporal.doctor.media} intro={corporal.doctor.intro} layout="corporal" tone="dark" />

      <Journey
        id="jornada"
        index="05"
        kicker="Jornada do paciente"
        title={['Cada etapa,', '*com acompanhamento.*']}
        steps={corporal.steps}
        tone="light"
      />

      {/* 06 — Outras cidades */}
      <section className="travel tone-sand" aria-labelledby="travel-title">
        <div className="wrap travel__grid">
          <div className="travel__body">
            <Kicker index={travel.index}>{travel.kicker}</Kicker>
            <Lines id="travel-title" lines={travel.title} className="display-l" />
            {travel.body.map((p) => <p key={p} data-reveal>{p}</p>)}
            <a className="btn btn--line" href="#agendar" data-reveal>Solicitar avaliação por vídeo</a>
          </div>
          <div className="travel__media" data-reveal="mask">
            <div className="travel__screen">
              <Picture media={travel.media} sizes="(min-width: 900px) 46vw, 100vw" />
              <span className="travel__rec" aria-hidden="true">Videochamada</span>
            </div>
          </div>
        </div>
      </section>

      <Testimonials items={corporal.testimonials} />

      <Faq index="07" items={corporal.faq} tone="light" />

      <Booking page="corporal" content={corporal.booking} index="08" tone="dark" />
    </PageShell>
  );
}
