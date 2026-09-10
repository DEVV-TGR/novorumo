/**
 * Extrai os assets do site a partir da carta impressa.
 *
 * A carta em PDF (`originais/CartaNovoRumo.pdf`, feita em CorelDRAW) é o único
 * material de marca que existe: não há vetorial do logótipo nem banco de fotos.
 * Este script tira de lá tudo o que o site usa, para que ninguém tenha de abrir
 * o Corel nem redesenhar nada à mão:
 *
 *   - o fundo low-poly da capa, e a mesma textura rodada como na contracapa
 *   - as fotografias das sobremesas, recompostas com o canal de transparência
 *     que no PDF vem numa máscara à parte
 *
 * O logótipo saiu daqui uma vez, já está em `public/marca/rosa-dos-ventos.svg`
 * como vetor, e não precisa de voltar a ser extraído.
 *
 * Precisa do poppler: `brew install poppler`.
 *
 *   node scripts/extrair-da-carta.mjs
 */

import sharp from "sharp";
import { execFileSync } from "node:child_process";
import { readdirSync, mkdirSync, rmSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pdf = path.join(raiz, "originais", "CartaNovoRumo.pdf");
const temp = path.join(raiz, ".assets-temp");

if (!existsSync(pdf)) {
  console.error(`Não encontrei a carta em ${pdf}`);
  process.exit(1);
}

rmSync(temp, { recursive: true, force: true });
mkdirSync(temp, { recursive: true });

// --- Fundos -----------------------------------------------------------------
// A capa e a contracapa partilham a mesma textura de 1152x1152. O que muda é a
// rotação: na capa o azul escuro cai no canto inferior direito, na contracapa
// está em cima à esquerda.

console.log("Fundos…");
execFileSync("pdfimages", ["-j", "-f", "1", "-l", "1", pdf, path.join(temp, "capa")]);
const textura = path.join(temp, "capa-001.jpg");
const fundos = path.join(raiz, "public", "fundos");
mkdirSync(fundos, { recursive: true });

for (const [nome, rodar] of [["lowpoly", 0], ["lowpoly-invertido", 180]]) {
  await sharp(textura)
    .rotate(rodar)
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(fundos, `${nome}.jpg`));
  console.log(`  ${nome}.jpg`);
}

// --- Fotografias ------------------------------------------------------------
// As sobremesas são as únicas fotos da carta. Vêm recortadas sobre fundo
// branco, com a transparência numa máscara em tons de cinzento guardada logo a
// seguir à imagem. O pdfimages exporta as duas como ficheiros separados, e é
// aqui que se voltam a juntar.

console.log("Fotografias…");
execFileSync("pdfimages", ["-png", "-f", "6", "-l", "12", pdf, path.join(temp, "img")]);

const ficheiros = readdirSync(temp).filter((f) => f.startsWith("img-")).sort();
const meta = [];
for (const f of ficheiros) {
  const m = await sharp(path.join(temp, f)).metadata();
  meta.push({ f, w: m.width, h: m.height, c: m.channels });
}

// As fotos saem do PDF pela ordem em que aparecem nas páginas. Este mapa
// dá-lhes o nome do prato, para o código não andar a citar "foto-07".
// O que não está no mapa é material de apoio e fica de fora do site.
const NOMES = {
  1: "sobremesa-abertura",
  2: "crepe-quente-frio",
  3: "crepe-mel-nozes",
  4: "crepe-strawberry-passion",
  5: "waffle-velvet",
  6: "nata-novo-rumo",
  7: "nata-buzio",
  8: "batidos",
  9: "croissant-gelado",
  15: "gins",
  17: "botanico-lima",
  18: "botanico-canela",
  19: "botanico-pepino",
  20: "botanico-limao",
  21: "botanico-frutos-vermelhos",
  22: "botanico-zimbro",
  23: "botanico-maca-verde",
  24: "botanico-laranja",
};

const destino = path.join(raiz, "public", "fotos");
rmSync(destino, { recursive: true, force: true });
mkdirSync(destino, { recursive: true });

let n = 0;
let guardadas = 0;
for (let i = 0; i < meta.length; i++) {
  const img = meta[i];
  const mascara = meta[i + 1];
  if (img.c === 1) continue;                    // é uma máscara, já foi usada
  if (img.w < 90 || img.h < 90) continue;       // ícones, separadores e ruído

  const casam = mascara && mascara.c === 1 && mascara.w === img.w && mascara.h === img.h;
  const nome = NOMES[n];
  n++;
  if (!nome) {
    if (casam) i++;
    continue;
  }
  let saida = sharp(path.join(temp, img.f));

  if (casam) {
    const alpha = await sharp(path.join(temp, mascara.f)).toColourspace("b-w").raw().toBuffer();
    saida = saida.ensureAlpha().joinChannel(alpha, {
      raw: { width: img.w, height: img.h, channels: 1 },
    });
    i++;
  }

  // WebP e não PNG: estas fotos têm recorte, e um PNG do mesmo prato pesa
  // dez vezes mais para o mesmo resultado no ecrã.
  await saida.webp({ quality: 88 }).toFile(path.join(destino, `${nome}.webp`));
  console.log(`  ${nome}  ${img.w}x${img.h}${casam ? "  (recortada)" : ""}`);
  guardadas++;
}

rmSync(temp, { recursive: true, force: true });
console.log(`\n${guardadas} fotografias, 2 fundos.`);
