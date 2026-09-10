/**
 * Os grupos da carta.
 *
 * A carta impressa tem dezasseis secções. Postas todas como atalhos no topo,
 * a barra fica com mais opções do que qualquer pessoa lê antes de escolher, e
 * no telemóvel obriga a arrastar de lado à procura do que quer.
 *
 * As secções não mudam: são as mesmas do cartaz, pela mesma ordem, com os
 * mesmos nomes. O que muda é a forma de lá chegar. São quatro portas, e cada
 * uma corresponde a um momento do dia, que é como uma pessoa decide: venho
 * tomar café, venho almoçar, venho beber um copo.
 */

import type { Texto } from "./../lib/site";
import type { CategoriaId } from "@/lib/carta";

export type Grupo = {
  id: string;
  nome: Texto;
  /** Uma linha a dizer o que está lá dentro, para a escolha ser óbvia. */
  resumo: Texto;
  categorias: CategoriaId[];
};

export const grupos: Grupo[] = [
  {
    id: "cafetaria",
    nome: { pt: "Cafetaria", en: "Café" },
    resumo: {
      pt: "Pequeno-almoço, cafés e chás",
      en: "Breakfast, coffee and tea",
    },
    categorias: ["pequeno-almoco", "cafetaria"],
  },
  {
    id: "restaurante",
    nome: { pt: "Restaurante", en: "Restaurant" },
    resumo: {
      pt: "Almoço e jantar, das entradas às pizzas",
      en: "Lunch and dinner, from starters to pizza",
    },
    categorias: [
      "entradas",
      "em-pao",
      "em-prato",
      "pizzas",
      "massas",
      "saladas",
      "vegetariano",
      "infantil",
    ],
  },
  {
    id: "sobremesas",
    nome: { pt: "Sobremesas", en: "Desserts" },
    resumo: { pt: "Crepes, gelados e batidos", en: "Crepes, ice cream and milkshakes" },
    categorias: ["sobremesas"],
  },
  {
    id: "bar",
    nome: { pt: "Bar", en: "Bar" },
    resumo: {
      pt: "Bebidas, cocktails, gins e vinhos",
      en: "Drinks, cocktails, gin and wine",
    },
    categorias: ["bebidas", "cocktails", "gins", "vinhos", "licores"],
  },
];

/** Em que grupo vive uma categoria. Serve para os links diretos, como /carta#gins. */
export function grupoDaCategoria(id: string): Grupo | undefined {
  return grupos.find((g) => (g.categorias as string[]).includes(id));
}
