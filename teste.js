// Script de teste manual: gera um DANFe a partir de um XML local.
// Uso: node teste.js [caminho-do-xml] [caminho-do-pdf-de-saida]
// Obs.: importa ./dist/index.js, entao rode `npm run build` antes.
import fs from "node:fs";
import path from "node:path";
import { DANFe } from "./dist/index.js";

const caminhoXML = process.argv[2] || "./public/DANFE.xml";
const caminhoPDF = process.argv[3] || "./exemplos/DANFe_teste.pdf";

if (!fs.existsSync(caminhoXML)) {
  console.error(`XML nao encontrado: ${caminhoXML}`);
  console.error("Passe o caminho como argumento: node teste.js ./caminho/nota.xml");
  process.exit(1);
}

try {
  const xml = fs.readFileSync(caminhoXML, { encoding: "utf8" });
  const pdf = await DANFe({ xml });
  fs.mkdirSync(path.dirname(caminhoPDF), { recursive: true });
  fs.writeFileSync(caminhoPDF, pdf);
  console.log(`PDF gerado em ${caminhoPDF}`);
} catch (erro) {
  console.error("Falha ao gerar o DANFe:", erro);
  process.exit(1);
}
