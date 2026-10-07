export type Categoria = 'racao' | 'higiene' | 'acessorios' | 'animais';

export interface Product {
  id: string;
  nome: string;
  categoria: Categoria;
  descricao: string;
  imagem: string;
  /** Ausente em 'animais': animais são só para consulta. */
  preco?: number;
}

export const CATEGORIAS = [
  { value: 'racao', label: 'Ração', icon: 'pi pi-box', descricao: 'Rações secas e úmidas para cães e gatos' },
  { value: 'higiene', label: 'Higiene', icon: 'pi pi-sparkles', descricao: 'Shampoos, tapetes e areia' },
  { value: 'acessorios', label: 'Acessórios', icon: 'pi pi-tag', descricao: 'Coleiras, comedouros e brinquedos' },
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
