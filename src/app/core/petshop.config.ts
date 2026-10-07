export const PETSHOP = {
  nome: 'Point do Pet',
  slogan: 'O cantinho do seu pet no bairro',
  /** Somente dígitos, com DDI 55 e DDD. */
  whatsapp: '5511999999999',
  telefoneExibicao: '(11) 99999-9999',
  endereco: 'Rua dos Pets, 123 - Centro',
  mapsUrl: 'https://maps.google.com/?q=Rua+dos+Pets+123',
  instagram: 'https://instagram.com/pointdopet',
  horarioFuncionamento: ['Seg a Sex: 8h às 19h', 'Sábado: 8h às 14h', 'Domingo: fechado'],
  /** 0 = domingo, 6 = sábado (padrão do DatePicker). */
  diasFechados: [0],
  horariosAgendamento: {
    semana: ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    sabado: ['08:00', '09:00', '10:00', '11:00', '12:00'],
  },
  servicos: [
    { value: 'Banho', label: 'Banho', icon: 'pi pi-sparkles', descricao: 'Banho com shampoo adequado, secagem e perfume.' },
    { value: 'Tosa', label: 'Tosa', icon: 'pi pi-star', descricao: 'Tosa higiênica ou na tesoura, do jeito que seu pet gosta.' },
    { value: 'Banho e Tosa', label: 'Banho e Tosa', icon: 'pi pi-heart', descricao: 'O pacote completo para seu pet sair lindo e cheiroso.' },
  ],
  especies: ['Cachorro', 'Gato'],
  portes: [
    { value: 'pequeno', label: 'Pequeno (até 10kg)' },
    { value: 'médio', label: 'Médio (10kg a 25kg)' },
    { value: 'grande', label: 'Grande (acima de 25kg)' },
  ],
};
