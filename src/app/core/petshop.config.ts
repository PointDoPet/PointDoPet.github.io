export const PETSHOP = {
  nome: 'Point do Pet',
  slogan: 'O cantinho do seu pet no bairro',
  /** Somente dígitos, com DDI 55 e DDD. */
  whatsapp: '5511994223943',
  telefoneExibicao: '(11) 99422-3943',
  endereco: 'Rua Ilha Mexicana, 25C - Jardim Pérola III',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Ilha+Mexicana+25C+Jardim+P%C3%A9rola+III',
  instagram: 'https://instagram.com/pointdopet',
  horarioFuncionamento: ['Seg a Sáb: 8h30 às 20h', 'Domingo: 8h30 às 13h'],
  /** 0 = domingo, 6 = sábado (padrão do DatePicker). */
  diasFechados: [] as number[],
  /** Expediente usado para gerar os horários de agendamento (formato HH:MM). */
  expediente: {
    segundaASabado: { abertura: '08:30', fechamento: '20:00' },
    domingo: { abertura: '08:30', fechamento: '13:00' },
  },
  agendamento: {
    intervaloMinutos: 60,
    /** O último horário marcável fica pelo menos esse tempo antes de fechar. */
    ultimoHorarioAntesDeFecharMinutos: 60,
  },
  servicos: [
    { value: 'Banho', icon: 'pi pi-sparkles', descricao: 'Banho com shampoo adequado, secagem e perfume.' },
    { value: 'Tosa', icon: 'pi pi-star', descricao: 'Tosa do jeito que seu pet gosta.' },
    { value: 'Banho + Tosa na máquina', icon: 'pi pi-paw', descricao: 'Banho completo e tosa feita na máquina.' },
    { value: 'Banho + Tosa higiênica', icon: 'pi pi-check-circle', descricao: 'Banho completo e tosa higiênica.' },
    {
      value: 'Banho + Tosa máquina + tesoura',
      icon: 'pi pi-star-fill',
      descricao: 'Banho completo, tosa na máquina e acabamento na tesoura.',
    },
  ],
  portes: [
    { value: 'XP', label: 'XP (mini)' },
    { value: 'pequeno', label: 'Pequeno (até 8kg)' },
    { value: 'médio', label: 'Médio (8kg a 15kg)' },
  ],
  /** Preço normal (sem promoção) por porte e serviço. */
  tabelaPrecos: {
    XP: {
      Banho: 55,
      Tosa: 45,
      'Banho + Tosa na máquina': 85,
      'Banho + Tosa higiênica': 68,
      'Banho + Tosa máquina + tesoura': 80,
    },
    pequeno: {
      Banho: 60,
      Tosa: 55,
      'Banho + Tosa na máquina': 95,
      'Banho + Tosa higiênica': 76,
      'Banho + Tosa máquina + tesoura': 92,
    },
    médio: {
      Banho: 70,
      Tosa: 65,
      'Banho + Tosa na máquina': 104,
      'Banho + Tosa higiênica': 88,
      'Banho + Tosa máquina + tesoura': 103,
    },
  } as Record<string, Record<string, number>>,
  /** Desconto aplicado em todos os serviços enquanto `ativa` for true. */
  promocao: {
    ativa: true,
    desconto: 20,
    titulo: 'R$ 20,00 OFF em todos os serviços',
    texto: 'Promoção válida durante o mês de inauguração!',
  },
};
