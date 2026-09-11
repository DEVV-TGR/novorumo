import { Faixa } from "../Faixa";
import { Revelar } from "../Revelar";

/**
 * O dia da casa, do café ao pôr do sol.
 *
 * A casa abre às nove e fecha às onze: são catorze horas em que serve coisas
 * muito diferentes. Quem chega ao site às quatro da tarde precisa de saber que
 * a cozinha ainda serve, e quem chega às dez da manhã que há torradas.
 */
const momentos = [
  {
    hora: "09h",
    titulo: "Pequeno-almoço",
    texto: "Torradas em pão saloio, croissants e pastelaria, até ao meio-dia.",
  },
  {
    hora: "12h",
    titulo: "Cozinha",
    texto: "Francesinhas, pizzas, massas e o peixe do dia, sem paragem até à noite.",
  },
  {
    hora: "16h",
    titulo: "Esplanada",
    texto: "Café, sangria e uma travessa de batata rústica com o mar pela frente.",
  },
  {
    hora: "19h",
    titulo: "Gins e pôr do sol",
    texto: "Dez gins servidos com o seu botânico, à hora a que a luz muda.",
  },
];

export function ODia() {
  return (
    <section className="bg-fundo-alt py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Revelar>
          <Faixa>Do café ao pôr do sol</Faixa>
          <h2 className="display-2 mt-6 max-w-[20ch] font-display font-semibold text-marca">
            Catorze horas abertos, e cada uma sabe a coisa diferente.
          </h2>
        </Revelar>

        <ol className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {momentos.map((m, i) => (
            <Revelar key={m.hora} atraso={i * 0.07} className="h-full">
              <li className="h-full rounded-[14px] border border-linha bg-cartao p-5 sm:p-7">
                <span className="tabular font-display text-3xl font-semibold text-marca-viva">
                  {m.hora}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-texto">
                  {m.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-texto-suave">{m.texto}</p>
              </li>
            </Revelar>
          ))}
        </ol>
      </div>
    </section>
  );
}
