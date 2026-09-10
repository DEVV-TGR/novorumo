import type { Metadata } from "next";
import { Nav } from "@/componentes/Nav";
import { Rodape } from "@/componentes/Rodape";
import { Carta } from "@/componentes/carta/Carta";
import { Estado } from "@/componentes/Estado";

export const metadata: Metadata = {
  title: "Carta",
  description:
    "A carta completa do Novo Rumo: pequenos-almoços, francesinhas, pizzas, massas, saladas, sobremesas, gins e vinhos. Em português e inglês, sempre atualizada.",
  alternates: { canonical: "/carta" },
};

export default function PaginaCarta() {
  return (
    <>
      <Nav />
      <main>
        <div className="border-b border-linha bg-fundo-alt">
          <div className="mx-auto max-w-4xl px-4 pt-14 pb-10 sm:px-6">
            <h1 className="display-1 font-display font-semibold text-marca">
              Carta
            </h1>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-texto-suave">
              Preços com IVA incluído. A cozinha serve das 12h às 21h30, e o
              pequeno-almoço das 9h ao meio-dia.
            </p>
            <div className="mt-4">
              <Estado />
            </div>
          </div>
        </div>

        <Carta />
      </main>
      <Rodape />
    </>
  );
}
