/**
 * O ícone do separador do browser, a partir da rosa dos ventos.
 *
 * A marca a branco sobre o navy, que é como ela aparece na capa da carta.
 * Corre-se à mão quando o SVG da marca mudar:
 *
 *   node scripts/gerar-icone.mjs
 */

import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const marca = readFileSync(path.join(raiz, "public/marca/rosa-dos-ventos.svg"), "utf8");

// O SVG usa currentColor, que fora de um documento não resolve para nada.
const branco = marca.replace(/currentColor/g, "#FFFFFF");
const vb = /viewBox="([\d.\s-]+)"/.exec(marca)[1].split(/\s+/).map(Number);

/** A rosa centrada num quadrado navy, com folga à volta. */
function cartao(lado) {
  const folga = Math.round(lado * 0.16);
  const dentro = lado - folga * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${lado}" height="${lado}">
  <rect width="${lado}" height="${lado}" rx="${Math.round(lado * 0.2)}" fill="#352D74"/>
  <svg x="${folga}" y="${folga}" width="${dentro}" height="${dentro}" viewBox="${vb.join(" ")}">
    ${branco.replace(/<\/?svg[^>]*>/g, "")}
  </svg>
</svg>`;
}

for (const [ficheiro, lado] of [["src/app/icon.png", 512], ["src/app/apple-icon.png", 180]]) {
  await sharp(Buffer.from(cartao(lado))).png().toFile(path.join(raiz, ficheiro));
  console.log(`${ficheiro}  ${lado}x${lado}`);
}

writeFileSync(path.join(raiz, "public/marca/rosa-dos-ventos-branca.svg"), branco);
console.log("public/marca/rosa-dos-ventos-branca.svg");
