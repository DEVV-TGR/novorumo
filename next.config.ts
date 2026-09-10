import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sem isto o Turbopack sobe até à pasta pessoal à procura de um lockfile e
  // apanha o de outro projeto qualquer.
  turbopack: { root: __dirname },
};

export default nextConfig;
