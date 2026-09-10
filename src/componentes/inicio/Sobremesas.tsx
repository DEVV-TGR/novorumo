import Image from "next/image";
import { euros, texto } from "@/lib/carta";
import { sobremesas } from "@/dados/sobremesas";
import { foto } from "@/dados/fotos";
import { Revelar } from "../Revelar";

/**
 * As sobremesas são o material fotográfico que a carta impressa tem, e é bom:
 * pratos recortados sobre fundo branco, já com transparência. Merecem a
 * secção que a carta lhes dá.
 *
 * A faixa que abre a secção é a exceção, e é de propósito: uma fotografia de
 * verdade, tirada na casa, de uma sobremesa acabada de montar. Os recortes
 * mostram o prato como ele é desenhado; a faixa mostra-o como ele chega à
 * mesa. Por isso é que está inteira e larga, e não misturada na grelha dos
 * recortes — um recorte com fundo transparente e uma foto com fundo real na
 * mesma fila lêem-se como um erro.
 */
const mostrar = [
  "velvet",
  "croissant-gelado",
  "nata-novo-rumo",
  "quente-frio",
  "buzio",
  "crepe-mel-nozes",
];

export function Sobremesas() {
  const itens = mostrar
    .map((id) => sobremesas.itens.find((i) => i.id === id))
    .filter((i): i is NonNullable<typeof i> => Boolean(i) && Boolean(i?.foto));
  const daCasa = foto("sobremesa-de-morango");

  return (
    <section className="bg-sup-marca py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Revelar>
          <h2 className="display-2 max-w-[22ch] font-display font-semibold">
            As sobremesas saem da cozinha ao lado da máquina de gelados.
          </h2>
        </Revelar>

        <Revelar atraso={0.06}>
          <figure className="mt-10 overflow-hidden rounded-[14px] bg-white/10">
            <div className="relative aspect-[21/9]">
              <Image
                src={daCasa.src}
                alt={texto(daCasa.legenda, "pt")}
                fill
                sizes="(max-width: 1024px) 100vw, 72rem"
                className="object-cover"
              />
            </div>
            <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 p-5 pt-4">
              <span className="font-display text-lg font-semibold">
                {texto(daCasa.titulo, "pt")}
              </span>
              <span className="text-sm text-white/70">
                {texto(daCasa.legenda, "pt")}
              </span>
            </figcaption>
          </figure>
        </Revelar>

        {/* Duas colunas, como no mosaico das fotografias da casa. */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {itens.map((item, i) => (
            <Revelar key={item.id} atraso={i * 0.05} className="h-full">
              <article className="h-full overflow-hidden rounded-[14px] bg-white/10 backdrop-blur-sm">
                <div className="relative aspect-[4/3] bg-white/5">
                  <Image
                    src={`${item.foto}.webp`}
                    alt={texto(item.nome, "pt")}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 36rem"
                    className="object-contain p-3"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 p-5 pt-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      {texto(item.nome, "pt")}
                    </h3>
                    {item.descricao && (
                      <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                        {texto(item.descricao, "pt")}
                      </p>
                    )}
                  </div>
                  <span className="tabular shrink-0 rounded-full bg-acento px-3 py-1 font-display text-sm font-semibold text-tinta">
                    {euros(item.preco!)}
                  </span>
                </div>
              </article>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
