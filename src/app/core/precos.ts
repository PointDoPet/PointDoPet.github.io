import { PETSHOP } from './petshop.config';

export function precoNormal(servico: string, porte: string): number | undefined {
  return PETSHOP.tabelaPrecos[porte]?.[servico];
}

export function precoFinal(servico: string, porte: string): number | undefined {
  const normal = precoNormal(servico, porte);
  if (normal === undefined || !PETSHOP.promocao.ativa) return normal;
  return normal - PETSHOP.promocao.desconto;
}

/** Menor preço final do serviço entre todos os portes ("a partir de"). */
export function precoAPartirDe(servico: string): number {
  return Math.min(...PETSHOP.portes.map((p) => precoFinal(servico, p.value) ?? Infinity));
}

export function porteLabel(porte: string): string {
  return PETSHOP.portes.find((p) => p.value === porte)?.label ?? porte;
}
