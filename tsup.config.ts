import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false, // <<<< DESLIGA a geração dos types
  // `canvas` fica FORA do bundle: ele só é usado no Node, por import dinâmico dentro de
  // `typeof window === "undefined"`. Sem isto o tsup resolve o import e embute o binário
  // nativo (.node, ~727 KB) no dist — que o navegador não tem como carregar.
  external: ['stream', 'canvas']
})
