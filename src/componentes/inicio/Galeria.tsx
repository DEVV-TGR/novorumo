import Image from "next/image";
import { fotos } from "@/dados/fotos";
import { site } from "@/lib/site";
import { texto } from "@/lib/carta";
import { Faixa } from "../Faixa";
import { Revelar } from "../Revelar";

/**
 * As fotografias da casa, arrumadas.
 *
 * Esta secção não existia enquanto o único material fotográfico era o da carta
 * impressa — sobremesas recortadas sobre branco, que servem a secção delas e
 * mais nada. As fotos do Instagram são outra coisa: mostram a comida à mesa,
 * com a duna atrás, e é isso que uma pessoa quer ver antes de meter o carro a
 * andar.
 *
 * O cartão é o mesmo das sobremesas — imagem em cima, nome e uma linha por
 * baixo — e a grelha é regular, com as filas alinhadas. A primeira versão
 * disto era um mosaico em colunas, com cada foto no seu feitio: ficava bonito
 * e lia-se mal, porque nada acabava à mesma altura e não havia por onde
 * começar. Aqui as fotos vêm em dois grupos com título, e cada grupo enche as
 * filas: seis e três, em três colunas.
 *
 * As que faltam estão noutro sítio, e não se repetem: a francesinha e os
 * hambúrgueres nos destaques, a esplanada ao pé do mapa e a sobremesa na
 * secção das sobremesas.
 */
const grupos = [
  {
    id: "cozinha",
    titulo: "Da cozinha",
    fotos: [
      "pizza-salmao",
      "prato-de-forno",
      "massa-de-marisco",
      "pizza-junto-a-lareira",
      "torrada-e-cafe",
      "ovos-e-bacon",
    ],
  },
  {
    id: "partilhar",
    titulo: "Para o meio da mesa",
    fotos: ["tabua-de-petiscos", "mesa-de-petiscos", "ameijoas-na-esplanada"],
  },
];

export function Galeria() {
  return (
    <section id="fotos" className="scroll-mt-20 bg-fundo-alt py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Revelar>
          <Faixa>À mesa</Faixa>
          <h2 className="display-2 mt-6 max-w-[20ch] font-display font-semibold text-marca">
            A comida como ela sai, na mesa onde é servida.
          </h2>
        </Revelar>

        {grupos.map((grupo, g) => {
          const escolhidas = grupo.fotos
            .map((id) => fotos.find((f) => f.id === id))
            .filter((f): f is NonNullable<typeof f> => Boolean(f));

          return (
            <div key={grupo.id} className={g === 0 ? "mt-12" : "mt-14"}>
              <Revelar>
                <h3 className="display-3 font-display font-semibold text-marca-viva">
                  {grupo.titulo}
                </h3>
              </Revelar>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {escolhidas.map((f, i) => (
                  <Revelar key={f.id} atraso={(i % 3) * 0.05} className="h-full">
                    <figure className="h-full overflow-hidden rounded-[14px] border border-linha bg-cartao">
                      {/*
                        Todas as caixas com a mesma proporção, e a fotografia a
                        cortar-se para lá caber. É o que alinha as filas: com o
                        formato de cada foto, umas ficavam mais altas do que as
                        outras e a fila deixava de ser uma fila.
                      */}
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={f.src}
                          alt={texto(f.legenda, "pt")}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={f.foco ? { objectPosition: f.foco } : undefined}
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="p-5 pt-4">
                        <h4 className="font-display text-lg font-semibold text-texto">
                          {texto(f.titulo, "pt")}
                        </h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-texto-suave">
                          {texto(f.legenda, "pt")}
                        </p>
                      </figcaption>
                    </figure>
                  </Revelar>
                ))}
              </div>
            </div>
          );
        })}

        <Revelar atraso={0.1}>
          <p className="mt-10 text-sm text-texto-suave">
            As fotografias são da casa, publicadas no{" "}
            <a
              href={site.redes.instagram}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-marca-viva underline underline-offset-4 hover:text-marca"
            >
              Instagram
            </a>
            .
          </p>
        </Revelar>
      </div>
    </section>
  );
}
