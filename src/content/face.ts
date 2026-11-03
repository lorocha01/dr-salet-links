// Conteúdo da página /face.
// STATUS: rascunho — todos os textos precisam de revisão e aprovação do Dr. Salet antes da publicação.
import type { Common, Media, RemoteVideo, Step, Video } from './types';

export const face = {
  page: 'face',

  hero: {
    a: {
      eyebrow: 'Cirurgia facial · Porto Alegre',
      title: ['Deep Plane', 'e Deep Neck:', '*rejuvenescimento*', '*com naturalidade.*'],
      subtitle:
        'Uma abordagem que reposiciona estruturas profundas da face e do pescoço, planejada a partir das características de cada paciente, para preservar quem você é.',
      cta: 'Agendar avaliação',
    },
    b: {
      eyebrow: 'Cirurgia facial · Porto Alegre',
      title: ['Rejuvenescimento', 'facial que respeita', '*a sua expressão.*'],
      subtitle:
        'Deep Plane e Deep Neck com planejamento individual: avaliação cuidadosa das estruturas profundas da face e do pescoço antes de qualquer indicação.',
      cta: 'Agendar avaliação',
    },
  },
  heroMedia: {
    base: 'face/hero-retrato',
    alt: 'Retrato do Dr. Luís Fernando Salet em seu consultório, de terno azul-marinho, diante de uma estante com livros e esculturas.',
    focus: '55% 30%',
  } satisfies Media,
  // Candidato no Drive: VIDEO_CONSULTORIO_v01.mp4 (377 MB) — requer reedição/compressão e aprovação.
  heroVideo: null as Video,

  nav: [
    { id: 'tecnica', label: 'A técnica' },
    { id: 'deep-neck', label: 'Deep Neck' },
    { id: 'procedimentos', label: 'Procedimentos' },
    { id: 'medico', label: 'O médico' },
    { id: 'atendimento', label: 'Atendimento' },
    { id: 'duvidas', label: 'Dúvidas' },
  ],

  // Primeiro vídeo da página de referência (WordPress/Elementor, arquivo hospedado em disite.com.br).
  // Carregado da URL original — não foi baixado nem re-hospedado.
  featureVideo: {
    kicker: 'Vídeo',
    title: ['Entenda o', '*Deep Plane Facelift*'],
    text: 'Conheça a abordagem utilizada no rejuvenescimento facial e entenda por que a avaliação individualizada é importante para definir o tratamento adequado.',
    cta: 'Quero agendar minha avaliação',
    video: {
      src: 'https://disite.com.br/drsalet/wp-content/uploads/2026/05/Salet_Site-1.webm',
      type: 'video/webm; codecs="vp9, opus"',
      poster: 'https://disite.com.br/drsalet/wp-content/uploads/2026/05/capa1.webp',
      width: 1920,
      height: 1080,
      label: 'Entenda o Deep Plane Facelift, com o Dr. Luís Fernando Salet',
      duration: '1:39',
      sourcePage: 'https://disite.com.br/drsalet/facelift-deep-plane-rejuvenescimento-natural-com-deep-neck/',
    } satisfies RemoteVideo,
  },

  deepPlane: {
    index: '01',
    kicker: 'Entendendo o Deep Plane',
    title: ['Tratar a face', '*pela sua arquitetura,*', 'não apenas pela superfície.'],
    lead:
      'Com o passar do tempo, as estruturas que sustentam a face, e não somente a pele, mudam de posição. O Deep Plane é uma técnica de lifting que trabalha nesse plano mais profundo.',
    body: [
      'Em vez de tracionar principalmente a pele, a técnica atua abaixo de uma camada chamada SMAS, liberando ligamentos de sustentação para que os tecidos possam ser reposicionados em conjunto.',
      'Existem diferentes técnicas de lifting facial, e cada uma tem indicações próprias. A escolha da abordagem depende da anatomia, das expectativas e da saúde de cada pessoa, e é definida somente após a avaliação médica.',
    ],
    layers: [
      { name: 'Pele', note: 'Camada superficial' },
      { name: 'Gordura subcutânea', note: 'Volume e suavidade' },
      { name: 'SMAS', note: 'Sistema músculo-aponeurótico' },
      { name: 'Plano profundo', note: 'Onde a técnica atua', active: true },
      { name: 'Ligamentos de sustentação', note: 'Liberados para reposicionar' },
    ],
    // Candidato no Drive: "VIDEO FULL FACE.mp4" (36,7 MB) — assistir, validar conteúdo e comprimir.
    video: null as Video,
  },

  planning: {
    index: '02',
    kicker: 'Planejamento facial',
    title: ['O que pode ser', '*considerado na avaliação*'],
    intro:
      'Cada face tem proporções, histórias e expectativas próprias. Na consulta, estes são alguns dos aspectos que podem ser analisados individualmente:',
    items: [
      { title: 'Contorno facial e da mandíbula', text: 'A definição da linha da mandíbula e a transição entre face e pescoço.' },
      { title: 'Região do pescoço', text: 'Pele, gordura, músculos e glândulas que podem influenciar o contorno cervical.' },
      { title: 'Aspecto de flacidez', text: 'Onde e como os tecidos mudaram de posição ao longo do tempo.' },
      { title: 'Características individuais', text: 'Traços que fazem parte da sua identidade e que devem ser preservados.' },
    ],
    note: 'Nem todas as pessoas são candidatas ao mesmo procedimento. A indicação é sempre individual.',
  },

  deepNeck: {
    index: '03',
    kicker: 'Deep Neck',
    title: ['O pescoço', '*em profundidade.*'],
    lead:
      'O Deep Neck é uma abordagem cirúrgica do pescoço que avalia, além da gordura superficial, as estruturas localizadas sob o músculo platisma.',
    compare: [
      {
        label: 'Tratar somente a gordura localizada',
        text: 'Pode ser adequado em alguns casos, quando o contorno do pescoço depende principalmente do acúmulo de gordura sob a pele.',
      },
      {
        label: 'Avaliar as estruturas envolvidas',
        text: 'Considera também gordura profunda, músculos e glândulas que podem influenciar o ângulo entre mandíbula e pescoço e que não são alcançados por abordagens superficiais.',
      },
    ],
    note: 'A necessidade de tratar cada estrutura é definida na avaliação, de acordo com a anatomia de cada paciente.',
    media: {
      base: 'face/deep-neck-perfil',
      alt: 'Dr. Luís Fernando Salet em retrato de três quartos no consultório.',
      focus: '62% 40%',
    } satisfies Media,
  },

  procedures: {
    index: '04',
    kicker: 'Outros procedimentos faciais',
    title: ['Outros cuidados', '*para a face*'],
    items: [
      {
        name: 'Blefaroplastia',
        text: 'Cirurgia das pálpebras, que pode tratar excesso de pele e bolsas de gordura nas pálpebras superiores e inferiores, com atenção à expressão do olhar.',
      },
      {
        name: 'Cirurgia do nariz',
        text: 'Rinoplastia planejada em harmonia com as proporções da face, considerando aspectos estéticos e, quando indicado, funcionais.',
      },
      {
        name: 'Cirurgia endoscópica facial',
        text: 'Procedimentos realizados por pequenas incisões com auxílio de câmera, como em algumas abordagens da testa e do terço médio da face.',
      },
    ],
  },

  male: {
    index: '05',
    kicker: 'Cirurgia facial masculina',
    title: ['Planejamento que', '*respeita traços masculinos.*'],
    body: [
      'A face masculina tem particularidades anatômicas, como distribuição de pelos, espessura da pele e contorno da mandíbula e da testa, que pedem um planejamento próprio.',
      'O objetivo é que cada decisão cirúrgica considere as características pessoais de quem está sendo avaliado, sem padronizar resultados.',
    ],
    media: {
      base: 'face/masculino',
      alt: 'Dr. Luís Fernando Salet, de terno, em retrato sério no consultório.',
      focus: '58% 35%',
    } satisfies Media,
  },

  doctor: {
    index: '06',
    media: {
      base: 'face/medico',
      alt: 'Dr. Luís Fernando Salet de braços cruzados em seu consultório em Porto Alegre.',
      focus: '52% 30%',
    } satisfies Media,
    intro:
      'Médico e cirurgião plástico em Porto Alegre, o Dr. Luís Fernando Salet dedica sua prática a cirurgias faciais e corporais, com atendimento conduzido de forma pessoal, da primeira conversa ao acompanhamento pós-operatório.',
  },

  steps: [
    { title: 'Avaliação presencial ou por videochamada', text: 'Uma conversa para entender suas expectativas e analisar a face e o pescoço. Para quem mora fora de Porto Alegre, o primeiro contato pode ser feito por vídeo.', highlight: true },
    { title: 'Planejamento individual', text: 'Definição conjunta da abordagem mais adequada, com explicação das possibilidades e dos limites de cada técnica.' },
    { title: 'Exames', text: 'Solicitação e análise dos exames necessários para avaliar a segurança do procedimento.' },
    { title: 'Organização da cirurgia', text: 'Quando houver indicação, organização da data, do hospital e das orientações pré-operatórias.' },
    { title: 'Acompanhamento e revisões', text: 'Consultas de revisão e orientações durante a recuperação.' },
  ] satisfies Step[],

  testimonials: null,

  faq: [
    { q: 'O resultado fica natural?', a: 'O planejamento busca preservar as características e a expressão de cada pessoa. O resultado depende de fatores individuais, como anatomia, qualidade da pele, hábitos e cicatrização, e não pode ser garantido. Na avaliação, conversamos sobre expectativas realistas para o seu caso.' },
    { q: 'Qual a diferença entre o Deep Plane e outras técnicas de lifting?', a: 'As técnicas diferem principalmente no plano em que os tecidos são tratados. No Deep Plane, o reposicionamento acontece abaixo do SMAS, com liberação de ligamentos. Outras técnicas têm indicações próprias, e a escolha depende da avaliação individual.' },
    { q: 'Quando os resultados podem ser avaliados?', a: 'O inchaço diminui progressivamente nas primeiras semanas, mas a acomodação dos tecidos e a maturação das cicatrizes levam meses. O tempo varia de pessoa para pessoa e é acompanhado nas consultas de revisão.' },
    { q: 'Como ficam as cicatrizes?', a: 'As incisões costumam ser planejadas em regiões de transição natural, como ao redor da orelha e no couro cabeludo. A cicatrização é individual e recebe orientações específicas no pós-operatório.' },
    { q: 'A cirurgia trata a flacidez e o contorno da mandíbula?', a: 'A flacidez e a perda de definição da mandíbula estão entre os aspectos analisados na avaliação. Se e como podem ser tratados depende da anatomia de cada paciente.' },
    { q: 'O pescoço é tratado junto com a face?', a: 'Em muitos casos, face e pescoço são avaliados em conjunto, porque a transição entre eles influencia o contorno. A necessidade de uma abordagem do pescoço, como o Deep Neck, é definida na consulta.' },
    { q: 'Quanto tempo dura a cirurgia?', a: 'A duração varia conforme os procedimentos indicados e as características de cada caso. Essa informação é detalhada durante o planejamento.' },
    { q: 'Quais são os riscos e como é a recuperação?', a: 'Toda cirurgia tem riscos, que são explicados de forma individual na consulta, junto com os cuidados para reduzi-los. A recuperação inclui um período de inchaço e restrições de atividades, com orientações e revisões ao longo do processo.' },
  ],

  booking: {
    title: ['Agende sua', '*avaliação facial.*'],
    text: 'Preencha os dados abaixo e continue a conversa com a recepção. A avaliação pode ser presencial em Porto Alegre ou por videochamada.',
    procedures: ['Deep Plane (lifting facial)', 'Deep Neck (pescoço)', 'Blefaroplastia', 'Cirurgia do nariz', 'Cirurgia endoscópica facial', 'Ainda não sei, quero orientação'],
  },

  crossLink: { href: '/corporal', label: 'Contorno corporal', text: 'Conheça também a página de cirurgia corporal' },
} satisfies Common & Record<string, unknown>;
