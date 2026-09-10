/**
 * As sobremesas são a única parte da carta impressa que tem fotografia, e a
 * única, com os gins, que já vinha traduzida. As fotos saem do PDF pelo
 * `scripts/extrair-da-carta.mjs` e estão em `public/fotos/`.
 */

import type { Categoria } from "@/lib/carta";

export const sobremesas: Categoria = {
  id: "sobremesas",
  nome: { pt: "Sobremesas", en: "Desserts" },
  subgrupos: [
    { id: "crepes", nome: { pt: "Crepes", en: "Crepes" }, itens: ["quente-frio", "mel-nozes", "strawberry-passion"] },
    { id: "waffle", nome: { pt: "Gelado com waffle", en: "Ice cream with waffle" }, itens: ["velvet"] },
    { id: "nata", nome: { pt: "Gelado com nata", en: "Ice cream with cream" }, itens: ["nata-novo-rumo", "buzio"] },
    { id: "croissant", nome: { pt: "Croissant com gelado", en: "Croissant with ice cream" }, itens: ["croissant-gelado"] },
    { id: "batidos", nome: { pt: "Batidos", en: "Milkshakes" }, itens: ["batido-morango", "batido-chocolate", "batido-escolha"] },
    { id: "casa", nome: { pt: "Sobremesa da casa", en: "House dessert" }, itens: ["bolo-casa", "mousse", "doce-casa"] },
  ],
  itens: [
    {
      id: "quente-frio",
      nome: { pt: "Quente & frio", en: "Hot and cold" },
      descricao: {
        pt: "Gelado de baunilha, chocolate quente, chantilly e bolachas moídas",
        en: "Vanilla ice cream, hot chocolate, whipped cream and ground cookies",
      },
      preco: 6.0,
      foto: "/fotos/crepe-quente-frio",
    },
    {
      id: "mel-nozes",
      nome: { pt: "Mel & nozes", en: "Honey and nuts" },
      descricao: {
        pt: "Gelado de noz, mel, topping de caramelo, nozes e doce de abóbora",
        en: "Walnut ice cream, honey, caramel topping, walnuts and pumpkin jam",
      },
      preco: 6.0,
      foto: "/fotos/crepe-mel-nozes",
      alergenios: ["frutos-casca-rija"],
    },
    {
      id: "strawberry-passion",
      nome: { pt: "Strawberry passion", en: "Strawberry passion" },
      descricao: {
        pt: "Gelado de morango, topping de morango, chantilly e bolachas moídas",
        en: "Strawberry ice cream, strawberry topping, whipped cream and ground cookies",
      },
      preco: 5.5,
      foto: "/fotos/crepe-strawberry-passion",
    },
    {
      id: "velvet",
      nome: { pt: "Velvet", en: "Velvet" },
      descricao: {
        pt: "Gelado de baunilha, gelado de chocolate, topping de chocolate, chantilly e bolachas moídas",
        en: "Vanilla ice cream, chocolate ice cream, chocolate topping, whipped cream and ground cookies",
      },
      preco: 7.0,
      foto: "/fotos/waffle-velvet",
      destaque: true,
    },
    {
      id: "nata-novo-rumo",
      nome: { pt: "Novo Rumo", en: "Novo Rumo" },
      descricao: {
        pt: "Gelado de morango, gelado de baunilha, gelado de cheesecake de morango, chantilly, topping de morango e bolachas moídas",
        en: "Strawberry ice cream, vanilla ice cream, strawberry cheesecake ice cream, whipped cream, strawberry topping and ground cookies",
      },
      preco: 6.0,
      foto: "/fotos/nata-novo-rumo",
    },
    {
      id: "buzio",
      nome: { pt: "Búzio", en: "Búzio" },
      descricao: {
        pt: "Gelado de chocolate, gelado de stracciatella, gelado de baunilha, topping de chocolate, chantilly e bolachas moídas",
        en: "Chocolate ice cream, stracciatella ice cream, vanilla ice cream, chocolate topping, whipped cream and ground cookies",
      },
      preco: 6.0,
      foto: "/fotos/nata-buzio",
    },
    {
      id: "croissant-gelado",
      nome: { pt: "Croissant com gelado", en: "Croissant with ice cream" },
      descricao: {
        pt: "Gelado de framboesa, gelado de chocolate e avelã, Nutella, topping de caramelo salgado, chantilly, croissant e açúcar em pó",
        en: "Raspberry ice cream, chocolate and hazelnut ice cream, Nutella, salted caramel topping, whipped cream, croissant and icing sugar",
      },
      preco: 7.0,
      foto: "/fotos/croissant-gelado",
      destaque: true,
      alergenios: ["gluten", "frutos-casca-rija", "lacticinios"],
    },
    {
      id: "batido-morango",
      nome: { pt: "Morango", en: "Strawberry" },
      descricao: { pt: "Gelado, leite e topping", en: "Ice cream, milk and topping" },
      preco: 5.0,
      foto: "/fotos/batidos",
    },
    {
      id: "batido-chocolate",
      nome: { pt: "Chocolate", en: "Chocolate" },
      descricao: { pt: "Gelado, leite e topping", en: "Ice cream, milk and topping" },
      preco: 5.0,
    },
    {
      id: "batido-escolha",
      nome: { pt: "Sabor à escolha", en: "Flavour of your choice" },
      descricao: { pt: "Gelado, leite e topping", en: "Ice cream, milk and topping" },
      preco: 5.0,
    },
    { id: "bolo-casa", nome: { pt: "Bolo da casa", en: "House cake" }, preco: 4.0 },
    { id: "mousse", nome: { pt: "Mousse", en: "Mousse" }, preco: 4.5 },
    { id: "doce-casa", nome: { pt: "Doce da casa", en: "House sweet" }, preco: 5.0 },
  ],
};
