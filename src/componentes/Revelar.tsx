"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Entrada suave quando o bloco chega ao ecrã.
 *
 * Serve para dar ordem de leitura a uma secção comprida: os itens aparecem
 * pela ordem em que se leem, e não todos ao mesmo tempo. Quem tem o sistema
 * em movimento reduzido vê tudo já colocado.
 */
export function Revelar({
  children,
  atraso = 0,
  className,
}: {
  children: React.ReactNode;
  atraso?: number;
  className?: string;
}) {
  const parado = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={parado ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.45, delay: atraso, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
