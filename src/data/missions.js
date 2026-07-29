export const DAILY_MISSIONS = [
  { id: 'd1', title: 'Verificar algum canal de Comunicação', reward: '+3 XP', done: false },
  { id: 'd2', title: 'Registrar informações ao Superior', reward: '+1 XP', done: false },
  { id: 'd3', title: 'Conferir todos os lugares no Setor 44', reward: '+10 XP', done: false },
  { id: 'd4', title: 'Confirmar presença no ponto de encontro', reward: '+1 XP', done: false },
];

export const MAIN_MISSIONS = [
  {
    id: 'm1',
    code: 'ORD-001',
    title: 'O Sinal do Setor 44',
    description:
      'Rastrear a origem da interferência eletromagnética registrada na última semana.',
    stage: 'Em andamento',
    progress: 0,
  },
  {
    id: 'm2',
    code: 'ORD-002',
    title: 'Arquivo 1998',
    description:
      'Reunir todas as informações e partes do...',
    stage: 'Em andamento',
    progress: 0,
  },
  {
    id: 'm3',
    code: 'ORD-003',
    title: 'Pulmão de Deus',
    description:
      'Identificar o local e investigar origens',
    stage: 'Bloqueada',
    progress: 70,
  },
];

export const SIDE_MISSIONS = [
  {
    id: 's1',
    code: 'SEC-014',
    title: 'Converse com todos do Setor 44',
    difficulty: 'Fácil',
    status: 'Disponível',
  },
  {
    id: 's2',
    code: 'SEC-015',
    title: 'Informante desaparecido',
    difficulty: 'Difícil',
    status: 'Disponível',
  },
  {
    id: 's3',
    code: 'SEC-016',
    title: 'Interferência eletromagnética no Setor 44',
    difficulty: 'Difícil',
    status: 'Disponível',
  },
  {
    id: 's4',
    code: 'SEC-017',
    title: 'Documento antigo do "Pulmão de Deus"',
    difficulty: '???',
    status: 'Disponível',
  },
];
