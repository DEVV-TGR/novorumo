import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // As worktrees do Claude Code são cópias do projeto dentro do projeto, e
    // cada uma traz o seu `.next/`. Sem isto, um `npm run lint` na raiz saía
    // com dez mil avisos vindos de JavaScript gerado que ninguém escreveu.
    // O `.gitignore` já as ignora pela mesma razão.
    ".claude/**",
  ]),
]);

export default eslintConfig;
