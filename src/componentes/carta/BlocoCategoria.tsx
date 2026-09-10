import { texto, estaDisponivel, type Categoria, type Idioma } from "@/lib/carta";
import { Faixa } from "../Faixa";
import { ItemCarta } from "./ItemCarta";

/**
 * Uma categoria da carta, com os subgrupos que a carta impressa tem
 * (os crepes dentro das sobremesas, o vinho verde dentro dos vinhos).
 */
export function BlocoCategoria({
  categoria,
  idioma,
  agora,
}: {
  categoria: Categoria;
  idioma: Idioma;
  agora: Date;
}) {
  const disponiveis = categoria.itens.filter((i) => estaDisponivel(i, agora));

  const grupos = categoria.subgrupos
    ? categoria.subgrupos.map((s) => ({
        titulo: texto(s.nome, idioma),
        itens: s.itens
          .map((id) => disponiveis.find((i) => i.id === id))
          .filter((i): i is NonNullable<typeof i> => Boolean(i)),
      }))
    : [{ titulo: null, itens: disponiveis }];

  return (
    <section id={categoria.id} className="scroll-mt-40 py-10">
      <Faixa>{texto(categoria.nome, idioma)}</Faixa>

      {categoria.descricao && (
        <p className="mt-4 text-sm text-texto-suave">
          {texto(categoria.descricao, idioma)}
        </p>
      )}

      {grupos.map((g, i) => (
        <div key={g.titulo ?? i} className={i === 0 ? "mt-6" : "mt-9"}>
          {g.titulo && (
            <h3 className="mb-1 font-display text-sm font-semibold uppercase tracking-[0.12em] text-marca-viva">
              {g.titulo}
            </h3>
          )}
          <ul className="divide-y divide-linha/70">
            {g.itens.map((item) => (
              <ItemCarta key={item.id} item={item} idioma={idioma} />
            ))}
          </ul>
        </div>
      ))}

      {categoria.nota && (
        <p className="mt-6 rounded-[10px] bg-fundo-alt px-4 py-3 text-xs leading-relaxed text-texto-suave">
          {texto(categoria.nota, idioma)}
        </p>
      )}
    </section>
  );
}
