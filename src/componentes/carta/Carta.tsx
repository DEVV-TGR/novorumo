"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { texto, type Idioma } from "@/lib/carta";
import { categoria } from "@/dados";
import { grupos, grupoDaCategoria } from "@/dados/grupos";
import { BlocoCategoria } from "./BlocoCategoria";

/**
 * A carta, com quatro portas em cima e as secções do cartaz por dentro.
 *
 * A primeira barra escolhe o momento do dia: cafetaria, restaurante,
 * sobremesas, bar. A segunda, quando o grupo tem mais do que uma secção, salta
 * dentro dele. Assim o topo da página nunca tem mais de meia dúzia de opções,
 * e continua a haver um atalho direto para cada secção da carta.
 *
 * Um link como `/carta#gins` continua a funcionar: abre o grupo certo e desce
 * até lá.
 */
/** Segue o `#seccao` do endereço. No servidor não há nenhum, e é isso que devolve. */
function useAncora() {
  return useSyncExternalStore(
    (avisar) => {
      window.addEventListener("hashchange", avisar);
      return () => window.removeEventListener("hashchange", avisar);
    },
    () => window.location.hash.slice(1),
    () => "",
  );
}

export function Carta() {
  const [idioma, setIdioma] = useState<Idioma>("pt");
  const [escolhido, setEscolhido] = useState<string | null>(null);
  const [ativa, setAtiva] = useState<string | null>(null);
  const barra = useRef<HTMLDivElement>(null);

  // O grupo é deduzido, não sincronizado: vale o que a pessoa escolheu na
  // barra e, enquanto não escolher nada, o grupo a que pertence a secção
  // pedida no endereço.
  const ancora = useAncora();
  const grupoId = escolhido ?? grupoDaCategoria(ancora)?.id ?? grupos[0].id;
  const grupo = grupos.find((g) => g.id === grupoId) ?? grupos[0];
  const categorias = grupo.categorias
    .map((id) => categoria(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  // Fixa a data uma vez, para o servidor e o browser lerem a mesma carta.
  const [agora] = useState(() => new Date());

  const irPara = useCallback((id: string) => {
    // Espera que o grupo novo pinte antes de procurar a secção.
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  // Com o grupo certo já aberto, só falta descer até à secção pedida.
  useEffect(() => {
    if (ancora && grupoDaCategoria(ancora)) irPara(ancora);
  }, [ancora, irPara]);

  // Que secção do grupo está à vista. IntersectionObserver, e não um ouvinte
  // de scroll, para não fazer contas a cada frame.
  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visivel) setAtiva(visivel.target.id);
      },
      { rootMargin: "-180px 0px -55% 0px", threshold: 0 },
    );

    for (const c of categorias) {
      const el = document.getElementById(c.id);
      if (el) observador.observe(el);
    }
    return () => observador.disconnect();
  }, [categorias]);

  // Arrasta o atalho ativo para dentro do campo de visão da barra.
  useEffect(() => {
    if (!ativa) return;
    barra.current
      ?.querySelector<HTMLElement>(`[data-id="${ativa}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [ativa]);

  function trocarGrupo(id: string) {
    setEscolhido(id);
    setAtiva(null);
    document.getElementById("inicio-da-carta")?.scrollIntoView({ block: "start" });
  }

  return (
    <>
      <div className="sticky top-16 z-30 border-b border-linha bg-fundo/95 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* As quatro portas. */}
          <div className="flex items-center gap-3 py-3">
            <div className="flex flex-1 gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {grupos.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => trocarGrupo(g.id)}
                  aria-pressed={grupoId === g.id}
                  className={`shrink-0 rounded-full px-4 py-2 font-display text-sm font-semibold transition-colors ${
                    grupoId === g.id
                      ? "bg-sup-marca text-white"
                      : "bg-fundo-alt text-texto-suave hover:text-marca"
                  }`}
                >
                  {texto(g.nome, idioma)}
                </button>
              ))}
            </div>

            <div className="flex shrink-0 overflow-hidden rounded-full border border-linha">
              {(["pt", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setIdioma(l)}
                  aria-pressed={idioma === l}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase transition-colors ${
                    idioma === l ? "bg-sup-marca text-white" : "text-texto-suave hover:text-marca"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* As secções do grupo, quando há mais do que uma. */}
          {categorias.length > 1 && (
            <div
              ref={barra}
              className="flex gap-4 overflow-x-auto pb-2.5 text-sm [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {categorias.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  data-id={c.id}
                  onClick={() => irPara(c.id)}
                  className={`shrink-0 border-b-2 pb-1 transition-colors ${
                    ativa === c.id
                      ? "border-marca-viva font-semibold text-marca"
                      : "border-transparent text-texto-suave hover:text-marca"
                  }`}
                >
                  {texto(c.nome, idioma)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div id="inicio-da-carta" className="mx-auto max-w-4xl scroll-mt-40 px-4 pb-16 sm:px-6">
        <p className="pt-8 text-sm text-texto-suave">{texto(grupo.resumo, idioma)}</p>

        {categorias.map((c) => (
          <BlocoCategoria key={c.id} categoria={c} idioma={idioma} agora={agora} />
        ))}

        <p className="mt-10 border-t border-linha pt-6 text-sm leading-relaxed text-texto-suave">
          {idioma === "pt"
            ? "Se tiver alguma alergia ou intolerância, diga-nos antes de pedir e confirmamos os ingredientes consigo."
            : "If you have an allergy or intolerance, tell us before ordering and we will go through the ingredients with you."}
        </p>
      </div>
    </>
  );
}
