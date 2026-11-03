// Conteúdo da página /corporal.
// STATUS: rascunho — todos os textos precisam de revisão e aprovação do Dr. Salet antes da publicação.
import type { Common, Media, Step, Video } from './types';

export const corporal = {
  page: 'corporal',

  hero: {
    a: {
      eyebrow: 'Cirurgia corporal · Porto Alegre',
      title: ['Contorno corporal', 'com planejamento', '*individualizado.*'],
      subtitle:
        'Lipoaspiração de alta definição, abdominoplastia e cirurgia das mamas. A indicação de cada procedimento depende de uma avaliação médica cuidadosa e individual.',
      cta: 'Agendar avaliação',
    },
    b: {
      eyebrow: 'Cirurgia corporal · Porto Alegre',
      title: ['Cada corpo,', '*um planejamento.*'],
      subtitle:
        'Lipoaspiração de alta definição, abdominoplastia e cirurgia das mamas, sempre a partir de uma avaliação médica individual.',
      cta: 'Agendar avaliação',
    },
  },
  heroMedia: {
    base: 'corporal/hero-jaleco',
    alt: 'Dr. Luís Fernando Salet de jaleco branco e braços cruzados, em frente à estante do consultório.',
    focus: '50% 25%',
  } satisfies Media,
  heroVideo: null as Video,

  nav: [
    { id: 'procedimentos', label: 'Procedimentos' },
    { id: 'lipo-ou-abdominoplastia', label: 'Lipo ou abdominoplastia' },
    { id: 'medico', label: 'O médico' },
    { id: 'jornada', label: 'Jornada' },
    { id: 'duvidas', label: 'Dúvidas' },
  ],

  situations: {
    index: '01',
    kicker: 'Motivos para uma avaliação',
    title: ['Situações que podem', '*motivar uma conversa*'],
    intro: 'Mudanças no corpo fazem parte da vida. Algumas situações levam pacientes a buscar orientação sobre o contorno corporal:',
    items: [
      { title: 'Após a gestação', text: 'Alterações no abdome e nas mamas que permanecem depois da gravidez e da amamentação.' },
      { title: 'Após o emagrecimento', text: 'Excesso de pele que pode surgir após uma perda de peso significativa.' },
      { title: 'Gordura localizada', text: 'Acúmulos que persistem apesar de hábitos saudáveis e peso estável.' },
      { title: 'Mudanças no contorno', text: 'Alterações nas proporções corporais ao longo do tempo.' },
    ],
  },

  procedures: {
    index: '02',
    kicker: 'Procedimentos',
    title: ['Três frentes,', '*uma avaliação individual.*'],
    items: [
      {
        name: 'Lipoaspiração de alta definição',
        text: 'Técnica de remoção de gordura localizada que busca valorizar o contorno anatômico de cada região, respeitando as proporções do corpo.',
        detail: ['Gordura localizada', 'Contorno por regiões'],
      },
      {
        name: 'Abdominoplastia',
        text: 'Cirurgia que pode tratar o excesso de pele do abdome e, quando indicado, a separação dos músculos abdominais.',
        detail: ['Excesso de pele', 'Diástase, se indicada'],
      },
      {
        name: 'Cirurgia das mamas',
        text: 'Procedimentos planejados conforme a anatomia e o objetivo de cada paciente.',
        detail: ['Aumento', 'Redução', 'Elevação'],
      },
    ],
    note: 'A indicação depende da avaliação individual. Em alguns casos, procedimentos podem ser combinados.',
  },

  versus: {
    index: '03',
    kicker: 'Lipoaspiração ou abdominoplastia?',
    title: ['Procedimentos diferentes', '*para objetivos diferentes.*'],
    columns: [
      {
        name: 'Lipoaspiração',
        rows: [
          ['Atua principalmente', 'Na remoção de gordura localizada'],
          ['Pele', 'Não tem como objetivo retirar excesso de pele'],
          ['Músculos', 'Não trata a separação dos músculos abdominais'],
        ],
      },
      {
        name: 'Abdominoplastia',
        rows: [
          ['Atua principalmente', 'No excesso de pele do abdome'],
          ['Pele', 'Remove o excesso e reposiciona os tecidos'],
          ['Músculos', 'Pode tratar a separação dos músculos, conforme a indicação'],
        ],
      },
    ],
    conclusion: 'Os dois procedimentos podem ser combinados. Essa decisão depende da avaliação médica e das características de cada paciente.',
  },

  // Seção oculta: só ativar após o médico confirmar os aparelhos e os registros na Anvisa.
  technologies: { enabled: false, items: [] as { name: string; anvisa: string; text: string }[] },

  doctor: {
    index: '04',
    media: {
      base: 'corporal/medico',
      alt: 'Dr. Luís Fernando Salet, de terno, com as mãos à frente do corpo, em seu consultório.',
      focus: '50% 20%',
    } satisfies Media,
    intro:
      'Médico e cirurgião plástico em Porto Alegre, o Dr. Luís Fernando Salet conduz pessoalmente cada etapa do atendimento, da avaliação ao acompanhamento pós-operatório.',
  },

  steps: [
    { title: 'Avaliação', text: 'Presencial em Porto Alegre ou por videochamada, para entender suas expectativas e analisar o corpo de forma individual.', highlight: true },
    { title: 'Planejamento e orçamento individual', text: 'Explicação da abordagem indicada, das possibilidades e dos limites, com orçamento personalizado.' },
    { title: 'Exames pré-operatórios', text: 'Solicitação e análise dos exames que avaliam a segurança da cirurgia.' },
    { title: 'Organização da cirurgia', text: 'Quando houver indicação, definição da data, do hospital e das orientações pré-operatórias.' },
    { title: 'Equipe e acompanhamento', text: 'Cirurgia realizada com equipe médica e acompanhamento ao longo da recuperação.' },
    { title: 'Revisões pós-operatórias', text: 'Consultas de revisão e orientações para cada fase da recuperação.' },
  ] satisfies Step[],

  travel: {
    index: '06',
    kicker: 'Para pacientes de outras cidades',
    title: ['A primeira conversa', '*pode acontecer à distância.*'],
    body: [
      'Para quem mora fora de Porto Alegre, a avaliação inicial pode ser feita por videochamada. Nela, é possível conversar sobre expectativas, histórico de saúde e as possibilidades para o seu caso.',
      'Quando houver indicação cirúrgica, a recepção orienta sobre a organização da viagem, o período em Porto Alegre e o acompanhamento após o retorno, de acordo com o planejamento individual.',
    ],
    media: {
      base: 'corporal/videochamada',
      alt: 'Dr. Luís Fernando Salet sorrindo, enquadrado de frente, em seu consultório.',
      focus: '48% 30%',
    } satisfies Media,
  },

  testimonials: null,

  faq: [
    { q: 'Lipoaspiração serve para emagrecer?', a: 'Não. A lipoaspiração é indicada para gordura localizada e para o contorno corporal, e não é um tratamento para perda de peso. Em geral, é considerada quando o peso está estável.' },
    { q: 'Qual a diferença entre lipoaspiração e abdominoplastia?', a: 'A lipoaspiração atua principalmente na gordura localizada. A abdominoplastia trata o excesso de pele do abdome e, conforme a indicação, a separação dos músculos abdominais. A combinação depende da avaliação médica.' },
    { q: 'Como é a recuperação?', a: 'A recuperação varia conforme o procedimento e cada organismo. Inclui um período de inchaço, uso de cinta quando indicado e restrições de atividades, com orientações específicas a cada consulta de revisão.' },
    { q: 'Como as cicatrizes são planejadas?', a: 'As incisões são planejadas para ficar, sempre que possível, em regiões discretas. A cicatrização é individual e recebe acompanhamento no pós-operatório.' },
    { q: 'Quando posso retomar minhas atividades?', a: 'O retorno ao trabalho, aos exercícios e às demais atividades é orientado individualmente, conforme o procedimento realizado e a evolução da recuperação.' },
    { q: 'Como funcionam a drenagem e o acompanhamento pós-operatório?', a: 'As orientações sobre drenagem linfática e demais cuidados são definidas pelo médico para cada caso, junto com o calendário de consultas de revisão.' },
  ],

  booking: {
    title: ['Agende sua', '*avaliação corporal.*'],
    text: 'Preencha os dados abaixo e continue a conversa com a recepção. A avaliação pode ser presencial em Porto Alegre ou por videochamada.',
    procedures: ['Lipoaspiração de alta definição', 'Abdominoplastia', 'Aumento das mamas', 'Redução das mamas', 'Elevação das mamas', 'Ainda não sei, quero orientação'],
  },

  crossLink: { href: '/face', label: 'Cirurgia facial', text: 'Conheça também a página de cirurgia facial' },
} satisfies Common & Record<string, unknown>;
