import Image from "next/image";
import { fotos } from "@/dados/fotos";
import { site } from "@/lib/site";
import { texto } from "@/lib/carta";
import { Faixa } from "../Faixa";
import { Revelar } from "../Revelar";

/**
 * O mosaico das fotografias da casa.
 *
 * Esta secção não existia enquanto o único material fotográfico era o da carta
 * impressa — sobremesas recortadas sobre branco, que servem a secção delas e
 * mais nada. As fotos do Instagram são outra coisa: mostram a comida à mesa,
 * com a duna atrás, e é isso que uma pessoa quer ver antes de meter o carro a
 * andar.
 *
 * O que aqui está é o que sobra depois de as outras secções se servirem: a
 * francesinha e os hambúrgueres foram para os destaques e a esplanada foi para
 * o mapa. Não se repete nenhuma, porque um site que mostra a mesma fotografia
 * três vezes parece ter três fotografias.
 *
 * A ordem alterna o alto com o quadrado, para as colunas fecharem sem um
 * degrau grande no fim.
 */
const mosaico = [
  "pizza-salmao",
  "ameijoas-na-esplanada",
  "tabua-de-petiscos",
  "mesa-de-petiscos",
  "massa-de-marisco",
  "ovos-e-bacon",
  "prato-de-forno",
  "torrada-e-cafe",
  "pizza-junto-a-lareira",
  "sobremesa-de-morango",
];

export function Galeria() {
  const escolhidas = mosaico
    .map((id) => fotos.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <section id="fotos" className="scroll-mt-20 bg-fundo-alt py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Revelar>
          <Faixa>À mesa</Faixa>
          <h2 className="display-2 mt-6 max-w-[20ch] font-display font-semibold text-marca">
            A comida como ela sai, na mesa onde é servida.
          </h2>
        </Revelar>

        {/*
          Colunas e não grelha: as fotos vêm do telemóvel em dois formatos, umas
          quadradas e outras ao alto, e numa grelha de células iguais teriam
          todas de ser cortadas. Assim cada uma fica com o seu feitio e as
          colunas encaixam-se sozinhas.
        */}
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {escolhidas.map((f, i) => (
            <Revelar key={f.id} atraso={(i % 3) * 0.06} className="mb-4 break-inside-avoid">
              <figure className="overflow-hidden rounded-[14px] border border-linha bg-cartao">
                <div
                  className={`relative ${f.formato === "vertical" ? "aspect-[3/4]" : "aspect-square"}`}
                >
                  <Image
                    src={f.src}
                    alt={texto(f.legenda, "pt")}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm leading-snug text-texto-suave">
                  {texto(f.legenda, "pt")}
                </figcaption>
              </figure>
            </Revelar>
          ))}
        </div>

        <Revelar atraso={0.1}>
          <p className="mt-8 text-sm text-texto-suave">
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
