const { ethers } = require("hardhat");
const fs = require("fs");
const { abi } = require("../artifacts/contracts/Armazenamento.sol/Armazenamento.json"); // ABI gerada na compilação

async function main() {
  const endereco = fs.readFileSync("endereco.txt", "utf8");            // endereço salvo no deploy
  const [carteira] = await ethers.getSigners();                        // conta 0 da rede local
  const contrato = new ethers.Contract(endereco, abi, carteira);       // endereço + ABI + carteira

  const atual = await contrato.getValor();                             // leitura (sem transação)
  console.log("Leitura 1 - valor:", atual.toString());

  const tx = await contrato.setValor(atual + 10n);                     // escrita: soma 10 (cria transação)
  const recibo = await tx.wait();                                      // espera confirmar no bloco
  console.log("Hash da transação:", recibo.hash);
  console.log("Bloco:", recibo.blockNumber);
  console.log("Gas usado:", recibo.gasUsed.toString());
  console.log("Evento:", contrato.interface.parseLog(recibo.logs[0]).args.toString()); // antigo, novo, quem

  console.log("Leitura 2 - valor:", (await contrato.getValor()).toString()); // confirma o novo estado
}

main().catch((e) => { console.error(e); process.exit(1); });
