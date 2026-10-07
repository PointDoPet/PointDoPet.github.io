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
  /** Último horário de cada dia com folga para o serviço terminar antes de fechar. */
  horariosAgendamento: {
    segundaASabado: [
      '08:30', '09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30', '16:30', '17:30', '18:30',
    ],
    domingo: ['08:30', '09:30', '10:30', '11:30'],
  },
  servicos: [
    { value: 'Banho', label: 'Banho', icon: 'pi pi-sparkles', descricao: 'Banho com shampoo adequado, secagem e perfume.' },
    { value: 'Tosa', label: 'Tosa', icon: 'pi pi-star', descricao: 'Tosa higiênica ou na tesoura, do jeito que seu pet gosta.' },
    { value: 'Banho e Tosa', label: 'Banho e Tosa', icon: 'pi pi-paw', descricao: 'O pacote completo para seu pet sair lindo e cheiroso.' },
  ],
  especies: ['Cachorro', 'Gato'],
  portes: [
    { value: 'pequeno', label: 'Pequeno (até 10kg)' },
    { value: 'médio', label: 'Médio (10kg a 25kg)' },
    { value: 'grande', label: 'Grande (acima de 25kg)' },
  ],
};
