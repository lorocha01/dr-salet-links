import type { CSSProperties } from 'react';
import { face } from '../content/face';
import { Booking, PageShell, WhatsLink } from '../components/Chrome';
import { Hero } from '../components/Hero';
import { Kicker, Lines, Picture, RemoteVideoPlayer, VideoFeature } from '../components/primitives';
import { DoctorSection, Faq, Journey, Testimonials } from '../components/Sections';
import { pickVariant } from '../lib/variant';

export function FacePage() {
  const hero = pickVariant(face.hero, 'face');
  const { featureVideo: fv, deepPlane: dp, planning, deepNeck: dn, procedures, male } = face;

  return (
    <PageShell content={face} theme="face" ctaLabel={hero.value.cta}>
      <Hero variant={hero.value} variantKey={hero.key} media={face.heroMedia} video={face.heroVideo} layout="face" />

      {/* Vídeo: Entenda o Deep Plane Facelift */}
      <section id="video" className="film tone-dark" aria-labelledby="video-title">
        <span id="conteudo" />
        <div className="wrap">
          <div className="film__head">
            <div>
              <Kicker tone="brass">{fv.kicker}</Kicker>
              <Lines id="video-title" lines={fv.title} className="display-l" />
            </div>
            <p className="lead muted film__text" data-reveal>{fv.text}</p>
          </div>
          <div className="film__frame" data-reveal="mask">
            <RemoteVideoPlayer video={fv.video} />
          </div>
          <div className="film__cta" data-reveal>
            <WhatsLink page="face" className="btn btn--solid">{fv.cta}</WhatsLink>
          </div>
        </div>
      </section>

      {/* 01 — Deep Plane: texto editorial + diagrama das camadas */}
      <section id="tecnica" className="dp tone-light" aria-labelledby="tecnica-title">
        <div className="wrap">
          <Kicker index={dp.index}>{dp.kicker}</Kicker>
          <div className="dp__grid">
            <Lines id="tecnica-title" lines={dp.title} className="display-xl dp__title" />
            <div className="dp__text">
              <p className="lead" data-reveal>{dp.lead}</p>
              {dp.body.map((p) => <p key={p} data-reveal>{p}</p>)}
            </div>
            <figure className="layers" data-reveal aria-label="Representação esquemática das camadas da face">
              <ol>
                {dp.layers.map((l, i) => (
                  <li key={l.name} className={'active' in l && l.active ? 'is-active' : ''} style={{ '--i': i } as CSSProperties}>
                    <span className="layers__band" aria-hidden="true" />
                    <span className="layers__name">{l.name}</span>
                    <span className="layers__note">{l.note}</span>
                  </li>
                ))}
              </ol>
              <figcaption>Esquema ilustrativo, fora de escala.</figcaption>
            </figure>
          </div>
          {dp.video && <VideoFeature video={dp.video} className="dp__video" />}
        </div>
      </section>

      {/* 02 — Planejamento: lista numerada em linhas, sem cards */}
      <section className="planning tone-dark" aria-labelledby="planning-title">
        <div className="wrap planning__grid">
          <div className="planning__head">
            <Kicker index={planning.index} tone="brass">{planning.kicker}</Kicker>
            <Lines id="planning-title" lines={planning.title} className="display-l" />
            <p className="muted" data-reveal>{planning.intro}</p>
          </div>
          <ol className="planning__list">
            {planning.items.map((it, i) => (
              <li key={it.title} data-reveal style={{ '--d': i } as CSSProperties}>
                <span className="planning__num">{['i', 'ii', 'iii', 'iv'][i]}</span>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </li>
            ))}
          </ol>
          <p className="planning__note" data-reveal>{planning.note}</p>
        </div>
      </section>

      {/* 03 — Deep Neck: retrato em perfil + comparação de abordagens */}
      <section id="deep-neck" className="neck tone-light" aria-labelledby="neck-title">
        <div className="wrap neck__grid">
          <div className="neck__media" data-reveal="mask">
            <Picture media={dn.media} sizes="(min-width: 900px) 48vw, 100vw" parallax={0.06} />
          </div>
          <div className="neck__body">
            <Kicker index={dn.index}>{dn.kicker}</Kicker>
            <Lines id="neck-title" lines={dn.title} className="display-xl" />
            <p className="lead" data-reveal>{dn.lead}</p>
            <div className="compare">
              {dn.compare.map((c, i) => (
                <div key={c.label} className={`compare__col ${i === 1 ? 'is-emph' : ''}`} data-reveal style={{ '--d': i } as CSSProperties}>
                  <p className="compare__label">{c.label}</p>
                  <p>{c.text}</p>
                </div>
              ))}
            </div>
            <p className="note" data-reveal>{dn.note}</p>
          </div>
        </div>
      </section>

      {/* 04 — Outros procedimentos: índice tipográfico */}
      <section id="procedimentos" className="index-list tone-navy" aria-labelledby="proc-title">
        <div className="wrap">
          <div className="index-list__head">
            <Kicker index={procedures.index} tone="brass">{procedures.kicker}</Kicker>
            <Lines id="proc-title" lines={procedures.title} className="display-l" />
          </div>
          <ol className="index-list__items">
            {procedures.items.map((p, i) => (
              <li key={p.name} data-reveal style={{ '--d': i } as CSSProperties}>
                <span className="index-list__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="index-list__name">{p.name}</h3>
                <p className="index-list__text">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 05 — Masculina: fotografia sangrando + texto */}
      <section className="male tone-dark" aria-labelledby="male-title">
        <div className="male__media" data-reveal="mask">
          <Picture media={male.media} sizes="(min-width: 900px) 55vw, 100vw" parallax={0.05} />
        </div>
        <div className="male__body">
          <Kicker index={male.index} tone="brass">{male.kicker}</Kicker>
          <Lines id="male-title" lines={male.title} className="display-l" />
          {male.body.map((p) => <p key={p} className="muted" data-reveal>{p}</p>)}
        </div>
      </section>

      <DoctorSection index={face.doctor.index} media={face.doctor.media} intro={face.doctor.intro} layout="face" tone="light" />

      <Journey
        id="atendimento"
        index="07"
        kicker="Como funciona o atendimento"
        title={['Do primeiro contato', '*ao acompanhamento.*']}
        steps={face.steps}
        tone="dark"
        note="Mora fora de Porto Alegre? A avaliação inicial pode ser feita por videochamada."
      />

      <Testimonials items={face.testimonials} />

      <Faq index="08" items={face.faq} tone="light" />

      <Booking page="face" content={face.booking} index="09" tone="dark" />
    </PageShell>
  );
}
