/**
 * O título de secção da carta impressa: uma faixa de cor com as pontas em
 * losango. É a assinatura gráfica da casa e repete-se em todas as páginas do
 * PDF, por isso repete-se aqui. O recorte é `clip-path`, definido em
 * `globals.css`, e não uma imagem.
 */
export function Faixa({
  children,
  cor = "marca",
  className = "",
}: {
  children: React.ReactNode;
  cor?: "marca" | "viva" | "acento";
  className?: string;
}) {
  // O ciano da marca (#008DD2) contra branco fica em 3,7:1 e não passa em AA
  // num texto deste tamanho. Contra a tinta fica em 4,7:1, e a cor é a mesma.
  const fundo = {
    marca: "bg-sup-marca text-white",
    viva: "bg-sup-viva text-tinta",
    acento: "bg-acento text-tinta",
  }[cor];

  return (
    <span
      className={`faixa inline-block px-8 py-2 font-display text-sm font-semibold uppercase tracking-[0.14em] sm:text-base ${fundo} ${className}`}
    >
      {children}
    </span>
  );
}
