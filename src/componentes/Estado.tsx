"use client";

import { useEffect, useState } from "react";
import { estadoEm, nomesDosDias, type Estado as EstadoCasa, hora } from "@/lib/horarios";

/**
 * Diz se a casa está aberta neste momento.
 *
 * O cálculo só corre no browser, depois da página montar. É de propósito: o
 * servidor e quem visita podem estar em fusos diferentes, e um "aberto agora"
 * pintado no servidor ficaria preso ao momento em que a página foi gerada.
 * Até o relógio responder, mostra-se a etiqueta neutra, que nunca mente.
 */
export function Estado({ compacto = false }: { compacto?: boolean }) {
  const [estado, setEstado] = useState<EstadoCasa | null>(null);

  useEffect(() => {
    const ler = () => setEstado(estadoEm(new Date()));
    ler();
    // De minuto a minuto, para a etiqueta virar sozinha à hora de fechar.
    const id = setInterval(ler, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!estado) {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-texto-suave">
        Cozinha das 12h às 21h30
      </span>
    );
  }

  if (estado.aberto) {
    return (
      <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        <strong className="font-semibold text-marca-viva">Aberto agora</strong>
        <span className="text-texto-suave">
          até às {hora(estado.fecha)}
          {estado.cozinhaAberta ? ", com a cozinha a servir" : ", cozinha encerrada"}
        </span>
      </span>
    );
  }

  const proxima = estado.proximaAbertura;
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <strong className="font-semibold text-texto">Fechado</strong>
      {proxima && (
        <span className="text-texto-suave">
          {compacto ? "abre" : "abrimos"} {nomesDosDias.pt[proxima.dia]} às{" "}
          {hora(proxima.hora)}
        </span>
      )}
    </span>
  );
}
