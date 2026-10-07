import { PETSHOP } from './petshop.config';

export function buildWhatsAppLink(texto: string): string {
  return `https://wa.me/${PETSHOP.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export function openWhatsApp(texto: string): void {
  window.open(buildWhatsAppLink(texto), '_blank', 'noopener');
}

export function formatBRL(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
