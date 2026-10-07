import { formatBRL } from './whatsapp';

export type Categoria = 'racao' | 'higiene' | 'acessorios' | 'animais';

export interface Product {
  id: string;
  nome: string;
  categoria: Categoria;
  descricao: string;
  imagem: string;
  /** Preço fixo ou mínimo da faixa. Ausente em 'animais': animais são só para consulta. */
  preco?: number;
  /** Quando presente, o preço é uma faixa (`preco` a `precoMax`) confirmada pela loja. */
  precoMax?: number;
  /** Vendido a granel; a quantidade no carrinho passa a ser em kg. */
  unidade?: 'kg';
}

export const CATEGORIAS = [
  { value: 'racao', label: 'Ração', icon: 'pi pi-box', descricao: 'Rações para cães e gatos, vendidas por kg' },
  { value: 'higiene', label: 'Higiene', icon: 'pi pi-sparkles', descricao: 'Shampoos, tapetes higiênicos e areia' },
  { value: 'acessorios', label: 'Acessórios', icon: 'pi pi-tag', descricao: 'Comedouros, bebedouros e mais' },
  { value: 'animais', label: 'Animais', icon: 'pi pi-paw', descricao: 'Hamster, periquito e peixe betta' },
] as const satisfies readonly { value: Categoria; label: string; icon: string; descricao: string }[];

export function isCategoria(value: unknown): value is Categoria {
  return CATEGORIAS.some((c) => c.value === value);
}

export function categoriaLabel(categoria: Categoria): string {
  return CATEGORIAS.find((c) => c.value === categoria)?.label ?? categoria;
}

export function isVendavel(product: Product): boolean {
  return product.categoria !== 'animais' && product.preco !== undefined;
}

export function formatFaixa(min: number, max: number): string {
  return max > min ? `${formatBRL(min)} a ${formatBRL(max)}` : formatBRL(min);
}

/** Subtotal mínimo e máximo de uma quantidade do produto. */
export function subtotal(product: Product, quantidade: number): { min: number; max: number } {
  const min = (product.preco ?? 0) * quantidade;
  return { min, max: (product.precoMax ?? product.preco ?? 0) * quantidade };
}

export function formatPreco(product: Product): string {
  const { min, max } = subtotal(product, 1);
  return formatFaixa(min, max);
}

export function formatQuantidade(product: Product, quantidade: number): string {
  return product.unidade === 'kg' ? `${quantidade} kg de` : `${quantidade}x`;
}
