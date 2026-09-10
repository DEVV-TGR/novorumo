import { Nav } from "@/componentes/Nav";
import { Hero } from "@/componentes/inicio/Hero";
import { ODia } from "@/componentes/inicio/ODia";
import { Destaques } from "@/componentes/inicio/Destaques";
import { Sobremesas } from "@/componentes/inicio/Sobremesas";
import { Gins } from "@/componentes/inicio/Gins";
import { Horarios } from "@/componentes/inicio/Horarios";
import { Onde } from "@/componentes/inicio/Onde";
import { Rodape } from "@/componentes/Rodape";

export default function Pagina() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ODia />
        <Destaques />
        <Sobremesas />
        <Gins />
        <Horarios />
        <Onde />
      </main>
      <Rodape />
    </>
  );
}
