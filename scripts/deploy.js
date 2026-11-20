const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const contrato = await ethers.deployContract("Armazenamento"); // envia a transação de deploy
  await contrato.waitForDeployment();                            // espera ser minerado
  const endereco = await contrato.getAddress();                  // endereço público do contrato
  fs.writeFileSync("endereco.txt", endereco);                    // salva para o interagir.js
  console.log("Contrato implantado em:", endereco);
  console.log("Hash do deploy:", contrato.deploymentTransaction().hash);
}

main().catch((e) => { console.error(e); process.exit(1); });
