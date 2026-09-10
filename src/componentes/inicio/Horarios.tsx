import { Faixa } from "../Faixa";
import { Revelar } from "../Revelar";
import { Estado } from "../Estado";
import { horarioDoDia, nomesDosDias, hora } from "@/lib/horarios";

/**
 * Os horários dos sete dias, nas duas épocas.
 *
 * A casa muda de horário em julho e agosto e a carta impressa diz isso em
 * letra pequena numa das pontas. Aqui está lado a lado, porque é a pergunta
 * que mais gente faz por telefone.
 */
function linhas(epoca: "baixa" | "alta") {
  // Uma segunda-feira de fevereiro e uma de julho, para ler as duas tabelas.
  const base = epoca === "alta" ? new Date(2026, 6, 6) : new Date(2026, 1, 2);
  return [0, 1, 2, 3, 4, 5, 6].map((dia) => {
    const d = new Date(base);
    d.setDate(base.getDate() + ((dia - base.getDay() + 7) % 7));
    return { dia, ...horarioDoDia(d) };
  });
}

function Tabela({ epoca, hoje }: { epoca: "baixa" | "alta"; hoje?: number }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-linha text-left text-xs uppercase tracking-wider text-texto-suave">
          <th className="pb-3 font-semibold">Dia</th>
          <th className="pb-3 font-semibold">Casa</th>
          <th className="pb-3 text-right font-semibold">Cozinha</th>
        </tr>
      </thead>
      <tbody>
        {linhas(epoca).map((l) => (
          <tr
            key={l.dia}
            className={`border-b border-linha/60 last:border-0 ${
              l.dia === hoje ? "font-semibold text-marca" : ""
            }`}
          >
            <td className="py-2.5 capitalize">{nomesDosDias.pt[l.dia]}</td>
            <td className="tabular py-2.5">
              {l.casa ? `${hora(l.casa.abre)} - ${hora(l.casa.fecha)}` : "encerrado"}
            </td>
            <td className="tabular py-2.5 text-right text-texto-suave">
              {l.cozinha ? `${hora(l.cozinha.abre)} - ${hora(l.cozinha.fecha)}` : "encerrada"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Horarios() {
  const hoje = new Date().getDay();

  return (
    <section id="horarios" className="scroll-mt-20 bg-fundo-alt py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Revelar>
          <Faixa cor="viva">Horários</Faixa>
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-4">
            <h2 className="font-display text-3xl font-semibold text-marca sm:text-4xl">
              Quando estamos abertos.
            </h2>
            <Estado compacto />
          </div>
        </Revelar>

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-14">
          <Revelar>
            <div className="rounded-[14px] bg-cartao p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-texto">
                De setembro a junho
              </h3>
              <p className="mt-1 mb-5 text-sm text-texto-suave">
                Descanso à quarta a partir das 15h e à quinta o dia todo.
              </p>
              <Tabela epoca="baixa" hoje={hoje} />
            </div>
          </Revelar>

          <Revelar atraso={0.08}>
            <div className="rounded-[14px] border border-marca-viva/30 bg-cartao p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-texto">
                Julho e agosto
              </h3>
              <p className="mt-1 mb-5 text-sm text-texto-suave">
                Abertos todos os dias, com a cozinha a servir até às 22h.
              </p>
              <Tabela epoca="alta" />
            </div>
          </Revelar>
        </div>

        <p className="mt-8 text-sm text-texto-suave">
          O pequeno-almoço serve-se das 9h às 12h.
        </p>
      </div>
    </section>
  );
}
