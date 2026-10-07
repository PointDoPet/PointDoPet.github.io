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
    { value: 'Banho', label: 'Banho', icon: 'pi pi-sparkles', descricao: 'Banho com shampoo adequado, secagem e perfume.' },
    { value: 'Tosa', label: 'Tosa', icon: 'pi pi-star', descricao: 'Tosa higiênica ou na tesoura, do jeito que seu pet gosta.' },
    { value: 'Banho e Tosa', label: 'Banho e Tosa', icon: 'pi pi-paw', descricao: 'O pacote completo para seu pet sair lindo e cheiroso.' },
  ],
  portes: [
    { value: 'pequeno', label: 'Pequeno (até 8kg)' },
    { value: 'médio', label: 'Médio (8kg a 15kg)' },
  ],
};
