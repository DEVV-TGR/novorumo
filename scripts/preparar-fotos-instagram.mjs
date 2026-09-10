/**
 * Prepara para o site as fotografias que a casa publica no Instagram.
 *
 * A carta impressa não tem uma única fotografia de comida salgada — só as
 * sobremesas e os botânicos dos gins. Os pratos, a esplanada e a sala vieram
 * todos do Instagram da casa (@novorumolabruge), em capturas de ecrã guardadas
 * em `originais/fotos-instagram/`. Continuam a ser material da casa, e não
 * fotografias de banco: a regra do projeto mantém-se.
 *
 * O que este script faz é o que uma captura de ecrã obriga a fazer: corta a
 * interface do Instagram que ficou por cima da fotografia — as setas do
 * carrossel, os pontinhos da paginação, a barra das stories — e grava o que
 * sobra em WebP, no tamanho que o site serve.
 *
 * Só entram aqui as fotografias que o site usa. As restantes capturas ficam
 * em `originais/` à espera de vez, e algumas nunca a terão: as que têm
 * clientes de cara levantada não vão para um site sem eles darem licença.
 *
 *   node scripts/preparar-fotos-instagram.mjs
 */

import sharp from "sharp";
import { mkdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const origem = path.join(raiz, "originais", "fotos-instagram");
const destino = path.join(raiz, "public", "fotos", "casa");

/**
 * Quanto se corta de cada lado, em fração do lado. Os valores não são todos
 * iguais porque as capturas também não são: umas apanharam um carrossel, com
 * setas nos dois lados e pontinhos em baixo, outras apanharam a fotografia
 * sozinha e só precisam de perder a franja do ecrã.
 */
const RECORTE_LIMPO = { esquerda: 0.01, cima: 0.01, direita: 0.01, baixo: 0.015 };
const RECORTE_CARROSSEL = { esquerda: 0.05, cima: 0.03, direita: 0.05, baixo: 0.055 };

const FOTOS = [
  { ficheiro: "01-pizza-salmao.jpg", nome: "pizza-salmao", recorte: RECORTE_LIMPO },
  { ficheiro: "05-hamburgueres.jpg", nome: "hamburgueres", recorte: RECORTE_LIMPO },
  { ficheiro: "07-ameijoas-na-esplanada.jpg", nome: "ameijoas-na-esplanada", recorte: RECORTE_LIMPO },
  { ficheiro: "09-mesa-de-petiscos.jpg", nome: "mesa-de-petiscos", recorte: RECORTE_LIMPO },
  { ficheiro: "10-francesinha-na-esplanada.jpg", nome: "francesinha-na-esplanada", recorte: RECORTE_LIMPO },
  { ficheiro: "12-ovos-e-bacon.jpg", nome: "ovos-e-bacon", recorte: RECORTE_LIMPO },
  { ficheiro: "13-prato-de-forno.jpg", nome: "prato-de-forno", recorte: RECORTE_LIMPO },
  { ficheiro: "14-pizza-junto-a-lareira.jpg", nome: "pizza-junto-a-lareira", recorte: RECORTE_LIMPO },
  {
    ficheiro: "15-torrada-e-cafe.jpg",
    nome: "torrada-e-cafe",
    // Esta apanhou a moldura do ecrã à esquerda.
    recorte: { esquerda: 0.025, cima: 0.01, direita: 0.02, baixo: 0.01 },
  },
  {
    ficheiro: "16-esplanada-com-letreiro.jpg",
    nome: "esplanada-com-letreiro",
    // Seta do carrossel encostada à direita, pontinhos em baixo.
    recorte: { esquerda: 0.02, cima: 0.01, direita: 0.05, baixo: 0.05 },
  },
  { ficheiro: "18-tabua-de-petiscos.jpg", nome: "tabua-de-petiscos", recorte: RECORTE_CARROSSEL },
  { ficheiro: "19-sobremesa-de-morango.jpg", nome: "sobremesa-de-morango", recorte: RECORTE_CARROSSEL },
  { ficheiro: "20-massa-de-marisco.jpg", nome: "massa-de-marisco", recorte: RECORTE_CARROSSEL },
];

/** Chega para servir a célula maior do mosaico num ecrã retina. */
const LARGURA_MAXIMA = 1400;

if (!existsSync(origem)) {
  console.error(`Não encontrei as capturas em ${origem}`);
  process.exit(1);
}

mkdirSync(destino, { recursive: true });

let total = 0;
for (const foto of FOTOS) {
  const entrada = path.join(origem, foto.ficheiro);
  if (!existsSync(entrada)) {
    console.error(`  falta ${foto.ficheiro}`);
    continue;
  }

  const { width, height } = await sharp(entrada).metadata();
  const { esquerda, cima, direita, baixo } = foto.recorte;
  const caixa = {
    left: Math.round(width * esquerda),
    top: Math.round(height * cima),
    width: Math.round(width * (1 - esquerda - direita)),
    height: Math.round(height * (1 - cima - baixo)),
  };

  const saida = path.join(destino, `${foto.nome}.webp`);
  const feito = await sharp(entrada)
    .extract(caixa)
    .resize({ width: LARGURA_MAXIMA, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(saida);

  const kb = statSync(saida).size / 1024;
  total += kb;
  console.log(`  ${foto.nome}.webp  ${feito.width}x${feito.height}  ${Math.round(kb)} KB`);
}

console.log(`\n${FOTOS.length} fotografias, ${(total / 1024).toFixed(1)} MB.`);
