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
  // O id do item é este; "crepe-mel-nozes" é o nome do ficheiro da foto. Com
  // o nome trocado o crepe nunca chegou a aparecer e a grelha ficava com
  // cinco cartões, um deles sozinho na última fila.
  "mel-nozes",
];

export function Sobremesas() {
  const itens = mostrar
    .map((id) => sobremesas.itens.find((i) => i.id === id))
    .filter((i): i is NonNullable<typeof i> => Boolean(i) && Boolean(i?.foto));
  const daCasa = foto("sobremesa-de-morango");

  return (
    <section className="bg-sup-marca py-16 text-white sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Revelar>
          <h2 className="display-2 max-w-[22ch] font-display font-semibold">
            As sobremesas saem da cozinha ao lado da máquina de gelados.
          </h2>
        </Revelar>

        <Revelar atraso={0.06}>
          <figure className="mt-8 overflow-hidden rounded-[14px] bg-white/10 sm:mt-10">
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

        {/*
          Duas colunas, como no mosaico das fotografias da casa, e também no
          telemóvel. Numa coluna só esta secção media 2636 px a 360 px de
          largura — quatro ecrãs para seis gelados.
        */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5">
          {itens.map((item, i) => (
            <Revelar key={item.id} atraso={(i % 2) * 0.05} className="h-full">
              <article className="relative h-full overflow-hidden rounded-[14px] bg-white/10 backdrop-blur-sm">
                <div className="relative aspect-[4/3] bg-white/5">
                  <Image
                    src={`${item.foto}.webp`}
                    alt={texto(item.nome, "pt")}
                    fill
                    sizes="(max-width: 1200px) 50vw, 36rem"
                    className="object-contain p-3"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 p-3 pt-2.5 sm:p-5 sm:pt-3">
                  <div>
                    <h3 className="font-display text-[15px] leading-tight font-semibold sm:text-lg">
                      {texto(item.nome, "pt")}
                    </h3>
                    {/*
                      No telemóvel a descrição fica em três linhas. É uma
                      lista de ingredientes que numa coluna de 150 px dava
                      treze, e o cartão ficava uma torre de texto ao lado de
                      uma foto pequena. A partir de `sm:` vem inteira, e a
                      carta tem-na sempre inteira. É por isto que a nota das
                      alergias está no fim da grelha: o que se corta aqui pode
                      ser a palavra que interessa a quem tem uma alergia.
                    */}
                    {item.descricao && (
                      <p className="mt-1 line-clamp-3 text-xs leading-snug text-white/70 sm:mt-1.5 sm:line-clamp-none sm:text-sm sm:leading-relaxed">
                        {texto(item.descricao, "pt")}
                      </p>
                    )}
                  </div>
                  {/*
                    No telemóvel o preço sai da linha do nome, onde não cabia
                    ao lado dele em 150 px, e vai para o canto de cima da
                    fotografia. A pastilha é opaca, o contraste do número não
                    depende do que está por baixo; o que depende é o recorte
                    da pastilha contra a foto, e estas são recortes sobre fundo
                    liso com o canto vazio. Se uma foto de sobremesa mudar,
                    conferir o canto.
                  */}
                  <span className="tabular absolute top-2 right-2 z-10 shrink-0 rounded-full bg-acento px-2 py-0.5 font-display text-xs font-semibold text-tinta sm:static sm:px-3 sm:py-1 sm:text-sm">
                    {euros(item.preco!)}
                  </span>
                </div>
              </article>
            </Revelar>
          ))}
        </div>

        {/* A mesma frase que fecha a carta, em `carta/Carta.tsx`. */}
        <Revelar atraso={0.1}>
          <p className="mt-8 max-w-[60ch] text-sm leading-relaxed text-white/70 sm:mt-10">
            Se tiver alguma alergia ou intolerância, diga-nos antes de pedir e
            confirmamos os ingredientes consigo.
          </p>
        </Revelar>
      </div>
    </section>
  );
}
