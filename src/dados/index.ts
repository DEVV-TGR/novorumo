/** A carta inteira, pela ordem em que se lê. */

import type { Categoria } from "@/lib/carta";
import { pequenoAlmoco, entradas, emPao, emPrato, pizzas, massas, saladas, vegetariano, infantil } from "./comida";
import { sobremesas } from "./sobremesas";
import { cafetaria, bebidas, cocktails, vinhos, licores } from "./bebidas";
import { gins } from "./gins";

export const carta: Categoria[] = [
  pequenoAlmoco,
  entradas,
  emPao,
  emPrato,
  pizzas,
  massas,
  saladas,
  vegetariano,
  infantil,
  sobremesas,
  cafetaria,
  bebidas,
  cocktails,
  gins,
  vinhos,
  licores,
];

export function categoria(id: string): Categoria | undefined {
  return carta.find((c) => c.id === id);
}

/** Os pratos marcados como destaque, para a página inicial. */
export function destaques() {
  return carta.flatMap((c) =>
    c.itens.filter((i) => i.destaque).map((item) => ({ item, categoria: c })),
  );
}
