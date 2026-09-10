/**
 * O modelo de dados da carta.
 *
 * A carta do Novo Rumo não é uma lista de "nome + preço": a batata vem em três
 * feitios com três preços, a torrada e a francesinha vendem-se a meias, o vinho
 * tem 0,37L e 0,75L, alguns pratos já trazem acompanhamento e a rúcula só
 * existe no inverno. Se o modelo não souber disto, a carta digital volta a
 * mentir — que é exatamente o problema do PDF que eles têm hoje.
 *
 * Tudo é bilingue à cabeça. O turista que aparece em agosto é metade do
 * argumento de venda, e uma tradução acrescentada depois nunca chega ao fim.
 */

import type { Texto } from "./site";

export type Idioma = "pt" | "en";

/**
 * Uma forma de pedir o mesmo item, com o seu próprio preço.
 * Ex.: batata palito / rústica / doce, meia / inteira, 0,37L / 0,75L.
 */
export type Variante = {
  id: string;
  nome: Texto;
  preco: number;
};

/**
 * Janela do ano em que o item existe. Os meses são 1–12 e o intervalo é
 * inclusivo; `de` maior que `ate` atravessa o ano (ex.: 10 a 3 = outubro a março).
 */
export type Sazonalidade = { de: number; ate: number };

export type Item = {
  id: string;
  nome: Texto;
  descricao?: Texto;
  /** Preço único. Ausente quando o item só existe em variantes. */
  preco?: number;
  variantes?: Variante[];
  /** O que já vem incluído no prato, ex.: "com batata e salada". */
  acompanhamento?: Texto;
  /** Aparece nos destaques da página inicial. */
  destaque?: boolean;
  vegetariano?: boolean;
  picante?: boolean;
  /** Códigos dos alergénios do Reg. (UE) 1169/2011. */
  alergenios?: string[];
  sazonalidade?: Sazonalidade;
  /** Caminho em `/public`. A carta atual só tem fotos das sobremesas. */
  foto?: string;
  /** Falso quando está temporariamente fora — é isto que o painel liga e desliga. */
  disponivel?: boolean;
  /** Letra miúda do prato, ex.: "não é permitida nenhuma alteração". */
  nota?: Texto;
};

export type Categoria = {
  id: string;
  nome: Texto;
  descricao?: Texto;
  /** Só aparece dentro da janela horária, ex.: o pequeno-almoço até às 12h. */
  janela?: { abre: string; fecha: string };
  /** Condições que valem para a categoria toda, impressas no fim do bloco. */
  nota?: Texto;
  /** Grupos dentro da categoria, ex.: "Crepes", "Gelado com waffle". */
  subgrupos?: Subgrupo[];
  itens: Item[];
};

/** Um bloco com título dentro de uma categoria. Os itens vivem sempre em `Categoria.itens`. */
export type Subgrupo = {
  id: string;
  nome: Texto;
  /** Ids dos itens que pertencem a este bloco, pela ordem em que aparecem. */
  itens: string[];
};

/** A ordem em que as categorias aparecem na carta e na navegação. */
export const ordemDasCategorias = [
  "pequeno-almoco",
  "entradas",
  "em-pao",
  "em-prato",
  "pizzas",
  "massas",
  "saladas",
  "vegetariano",
  "infantil",
  "sobremesas",
  "cafetaria",
  "bebidas",
  "cocktails",
  "gins",
  "vinhos",
  "licores",
] as const;

export type CategoriaId = (typeof ordemDasCategorias)[number];

// ---------------------------------------------------------------------------
// Funções de leitura
// ---------------------------------------------------------------------------

export function estaNaEpoca(item: Item, data: Date): boolean {
  if (!item.sazonalidade) return true;
  const mes = data.getMonth() + 1;
  const { de, ate } = item.sazonalidade;
  return de <= ate ? mes >= de && mes <= ate : mes >= de || mes <= ate;
}

export function estaDisponivel(item: Item, data: Date): boolean {
  return item.disponivel !== false && estaNaEpoca(item, data);
}

/** O preço a mostrar na listagem: o único, ou o mais baixo das variantes. */
export function precoDesde(item: Item): number | null {
  if (typeof item.preco === "number") return item.preco;
  if (item.variantes?.length) return Math.min(...item.variantes.map((v) => v.preco));
  return null;
}

export function temVariantes(item: Item): boolean {
  return Boolean(item.variantes?.length);
}

/**
 * Formata o preço na convenção de quem está a ler: 8,50 € em português,
 * €8.50 em inglês. O turista que percebe a carta também tem de perceber a
 * conta.
 */
export function euros(valor: number, idioma: Idioma = "pt"): string {
  return new Intl.NumberFormat(idioma === "en" ? "en-IE" : "pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(valor);
}

export function texto(t: Texto, idioma: Idioma): string {
  return t[idioma] || t.pt;
}
