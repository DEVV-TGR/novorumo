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
 * começar. Aqui as fotos vêm em dois grupos com título, seis e três, em duas
 * colunas — em qualquer largura, telemóvel incluído.
 *
 * No telemóvel as duas colunas são o que faz a diferença: numa coluna só, a
 * 360 px, esta secção media 3686 px, quase seis ecrãs para nove fotografias.
 * Em duas, com o cartão compacto, mede 1641. O cartão compacto conta tanto
 * como as colunas: com 154 px de largura, o padding de 20 px de cada lado
 * deixava 112 px de texto e a legenda ficava com o dobro da altura da foto.
 *
 * As que faltam estão noutro sítio: a francesinha, os hambúrgueres e a
 * esplanada nos destaques, a sobremesa na secção das sobremesas. A pizza e a
 * travessa de petiscos aparecem cá e nos destaques — lá são provisórias, à
 * espera das fotos certas da casa, e no dia em que essas chegarem a repetição
 * desaparece.
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
            <div key={grupo.id} className={g === 0 ? "mt-8 sm:mt-12" : "mt-10 sm:mt-14"}>
              <Revelar>
                <h3 className="display-3 font-display font-semibold text-marca-viva">
                  {grupo.titulo}
                </h3>
              </Revelar>

              {/*
                Duas colunas e não três. Em três, cada fotografia ficava com
                380 px de largura num portátil, e uma travessa de petiscos com
                doze coisas em cima não se vê a 380 px. Em duas, a mesma foto
                fica com 590 e passa a distinguir-se o que lá está.

                E duas também no telemóvel, sem `sm:`. O intervalo entre
                cartões é que encolhe: 20 px roubados a uma coluna de 154 são
                13% da fotografia.
              */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5">
                {escolhidas.map((f, i) => {
                  /*
                    Num grupo com um número ímpar de fotografias, a última
                    ficava sozinha com meia fila vazia ao lado. Passa a ocupar
                    a fila inteira, mais baixa e mais larga, e a fila fecha.
                  */
                  const largo = escolhidas.length % 2 === 1 && i === escolhidas.length - 1;

                  return (
                  <Revelar
                    key={f.id}
                    atraso={(i % 2) * 0.05}
                    className={`h-full ${largo ? "col-span-2" : ""}`}
                  >
                    <figure className="h-full overflow-hidden rounded-[14px] border border-linha bg-cartao">
                      {/*
                        Todas as caixas com a mesma proporção, e a fotografia a
                        cortar-se para lá caber. É o que alinha as filas: com o
                        formato de cada foto, umas ficavam mais altas do que as
                        outras e a fila deixava de ser uma fila.
                      */}
                      <div className={`relative ${largo ? "aspect-[2/1]" : "aspect-[4/3]"}`}>
                        <Image
                          src={f.src}
                          alt={texto(f.legenda, "pt")}
                          fill
                          sizes={
                            largo
                              ? "(max-width: 1200px) 100vw, 72rem"
                              : "(max-width: 1200px) 50vw, 36rem"
                          }
                          style={f.foco ? { objectPosition: f.foco } : undefined}
                          className="object-cover"
                        />
                      </div>
                      {/*
                        No telemóvel a legenda aperta-se: menos padding e letra
                        mais pequena. Não é para caber mais texto, é para a
                        fotografia continuar a ser a coisa maior do cartão.
                      */}
                      <figcaption className="p-3 pt-2.5 sm:p-5 sm:pt-4">
                        <h4 className="font-display text-[15px] leading-tight font-semibold text-texto sm:text-lg">
                          {texto(f.titulo, "pt")}
                        </h4>
                        <p className="mt-1 text-xs leading-snug text-texto-suave sm:mt-1.5 sm:text-sm sm:leading-relaxed">
                          {texto(f.legenda, "pt")}
                        </p>
                      </figcaption>
                    </figure>
                  </Revelar>
                  );
                })}
              </div>
            </div>
          );
        })}

        <Revelar atraso={0.1}>
          <p className="mt-8 text-sm text-texto-suave sm:mt-10">
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
