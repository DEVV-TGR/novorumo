import { euros, texto, temVariantes, type Idioma, type Item } from "@/lib/carta";

/**
 * Uma linha da carta.
 *
 * O caso difícil não é o prato com um preço: é o prego, que custa três coisas
 * diferentes conforme a batata, e a torrada, que se vende a meias. Em papel
 * isso resolve-se com colunas e asteriscos. Aqui a linha muda de forma quando
 * o prato tem variantes, em vez de esconder dois terços dos preços.
 */
export function ItemCarta({ item, idioma }: { item: Item; idioma: Idioma }) {
  const variantes = temVariantes(item);

  return (
    <li className="py-4">
      <div className="flex items-baseline justify-between gap-4">
        <h4 className="font-display font-semibold leading-snug text-texto">
          {texto(item.nome, idioma)}
          {item.vegetariano && (
            <span className="ml-2 align-middle text-xs font-medium text-marca-viva">
              {idioma === "pt" ? "vegetariano" : "vegetarian"}
            </span>
          )}
        </h4>

        {!variantes && typeof item.preco === "number" && (
          <span className="tabular shrink-0 font-display font-semibold text-texto">
            {euros(item.preco, idioma)}
          </span>
        )}
      </div>

      {item.descricao && (
        <p className="mt-1 max-w-[62ch] text-sm leading-relaxed text-texto-suave">
          {texto(item.descricao, idioma)}
        </p>
      )}

      {variantes && (
        <div className="mt-3">
          {item.acompanhamento && (
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-texto-suave">
              {texto(item.acompanhamento, idioma)}
            </p>
          )}
          <ul className="flex flex-wrap gap-2">
            {item.variantes!.map((v) => (
              <li
                key={v.id}
                className="flex items-baseline gap-2 rounded-full border border-linha bg-fundo-alt px-3 py-1.5"
              >
                <span className="text-sm text-texto-suave">{texto(v.nome, idioma)}</span>
                <span className="tabular font-display text-sm font-semibold text-texto">
                  {euros(v.preco, idioma)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.nota && (
        <p className="mt-2 text-xs leading-relaxed text-texto-suave">
          {texto(item.nota, idioma)}
        </p>
      )}
    </li>
  );
}
