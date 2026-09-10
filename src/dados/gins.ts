/**
 * A carta de gins.
 *
 * Estas duas páginas do PDF estavam com o texto convertido em curvas, o que
 * quer dizer que nenhum motor de busca alguma vez as leu e que nem copiar e
 * colar delas era possível. Foram transcritas à mão a partir da carta. É o
 * exemplo mais claro do que se ganha em ter a carta em dados em vez de em PDF.
 *
 * Cada gin tem o botânico com que é servido, e a foto do botânico sai do PDF
 * pelo `scripts/extrair-da-carta.mjs`.
 */

import type { Categoria } from "@/lib/carta";

export const gins: Categoria = {
  id: "gins",
  nome: { pt: "Gins", en: "Gin" },
  descricao: {
    pt: "Servidos em copo de balão, com o botânico de cada um.",
    en: "Served in a balloon glass, each with its own botanical.",
  },
  itens: [
    {
      id: "monkey-47",
      nome: { pt: "Monkey 47", en: "Monkey 47" },
      descricao: {
        pt: "Gin britânico de carácter citrino, com lima, limão e laranja",
        en: "British gin with a citrus character, with lime, lemon and orange",
      },
      preco: 14.5,
      foto: "/fotos/botanico-laranja",
      destaque: true,
    },
    {
      id: "gin-mare",
      nome: { pt: "Gin Mare", en: "Gin Mare" },
      descricao: {
        pt: "Gin da costa dourada de Espanha, com alecrim e um twist de lima",
        en: "Spanish golden coast gin, with rosemary and a lime twist",
      },
      preco: 11.0,
      foto: "/fotos/botanico-lima",
    },
    {
      id: "the-london-1",
      nome: { pt: "The London N.º 1", en: "The London No. 1" },
      descricao: {
        pt: "Gin britânico com lima e limão",
        en: "British gin with lime and lemon",
      },
      preco: 10.0,
      foto: "/fotos/botanico-limao",
    },
    {
      id: "hendricks",
      nome: { pt: "Hendrick's", en: "Hendrick's" },
      descricao: {
        pt: "Gin escocês com pepino e um twist de lima",
        en: "Scottish gin with cucumber and a lime twist",
      },
      preco: 10.0,
      foto: "/fotos/botanico-pepino",
      destaque: true,
    },
    {
      id: "martin-millers",
      nome: { pt: "Martin Miller's", en: "Martin Miller's" },
      descricao: {
        pt: "Gin destilado em Inglaterra com água da Islândia, com zimbro e maçã verde",
        en: "Distilled in England with Icelandic water, with juniper and green apple",
      },
      preco: 9.5,
      foto: "/fotos/botanico-maca-verde",
    },
    {
      id: "bulldog",
      nome: { pt: "Bulldog", en: "Bulldog" },
      descricao: {
        pt: "Gin artesanal de Londres, com pau de canela e twist de laranja",
        en: "London handcrafted gin, with a cinnamon stick and an orange twist",
      },
      preco: 9.0,
      foto: "/fotos/botanico-canela",
    },
    {
      id: "gordons-pink",
      nome: { pt: "Gordon's Pink", en: "Gordon's Pink" },
      descricao: {
        pt: "Gin inglês de três destilações com framboesa, servido com frutos vermelhos e pimenta rosa",
        en: "Three-distillation English gin with raspberry, served with red berries and pink peppercorns",
      },
      preco: 9.0,
      foto: "/fotos/botanico-frutos-vermelhos",
    },
    {
      id: "tanqueray",
      nome: { pt: "Tanqueray", en: "Tanqueray" },
      descricao: {
        pt: "Gin destilado na Escócia, com zimbro e limão",
        en: "Distilled in Scotland, with juniper and lemon",
      },
      preco: 8.0,
      foto: "/fotos/botanico-zimbro",
    },
    {
      id: "bombay-sapphire",
      nome: { pt: "Bombay Sapphire", en: "Bombay Sapphire" },
      descricao: {
        pt: "Gin clássico seco de Londres, com zimbro e um twist de lima",
        en: "Classic London dry gin, with juniper and a lime twist",
      },
      preco: 8.0,
      foto: "/fotos/botanico-lima",
    },
    {
      id: "gordons",
      nome: { pt: "Gordon's", en: "Gordon's" },
      descricao: {
        pt: "Gin seco de Londres, com twist de limão",
        en: "London dry gin, with a lemon twist",
      },
      preco: 8.0,
      foto: "/fotos/botanico-limao",
    },
  ],
};
