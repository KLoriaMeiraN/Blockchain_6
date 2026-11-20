# DApp com Hardhat + Ethers.js — passo a passo

## Antes de começar
- Node.js instalado (https://nodejs.org/) — teste no terminal: `node -v`
- VS Code instalado — abra esta pasta em **Arquivo → Abrir pasta**

## Estrutura
| Arquivo | O que é |
|---|---|
| `contracts/Armazenamento.sol` | Contrato: guarda um valor, lê, altera e emite evento |
| `scripts/deploy.js` | Implanta o contrato e salva o endereço em `endereco.txt` |
| `scripts/interagir.js` | Lê o valor, altera (+10), mostra hash/bloco/gas/evento e lê de novo |
| `hardhat.config.js` | Configuração do Hardhat (versão do Solidity) |

## Ação 1 — instalar, compilar e implantar
Abra o terminal do VS Code (**Terminal → New Terminal**) e rode:

```
npm install
npx hardhat compile
```

**Abra um SEGUNDO terminal** (botão **+** do terminal) e suba a blockchain local. Deixe-o aberto:

```
npx hardhat node
```

Volte ao primeiro terminal e implante:

```
npx hardhat run scripts/deploy.js --network localhost
```

> O roteiro do curso não menciona o `npx hardhat node`, mas sem ele o `--network localhost` dá erro de conexão.
> Se você fechar o terminal do node, a blockchain local é apagada: suba de novo e repita o deploy.

## Ação 2 — interagir (leitura e escrita)
```
npx hardhat run scripts/interagir.js --network localhost
```

Saída esperada (os hashes mudam):
```
Leitura 1 - valor: 0
Hash da transação: 0xfa8a...
Bloco: 2
Gas usado: 45804
Evento: 0,10,0xf39F...
Leitura 2 - valor: 10
```
Rode de novo: o valor vai para 20, o bloco para 3, e assim por diante.

## Ação 3 — texto-modelo para registrar
O **Hardhat** compilou o contrato Solidity em bytecode e ABI (pasta `artifacts`) e simulou uma blockchain local (Hardhat Network), sem custo de gas real. O **script de deploy** enviou a transação de implantação e obteve o endereço do contrato. O **script de interação** usou o **Ethers.js** para criar a instância do contrato com **endereço + ABI + carteira**. A leitura (`getValor`) não gerou transação. A escrita (`setValor`) gerou uma transação, com hash, número de bloco e gas usado, e emitiu o evento `ValorAlterado`. A segunda leitura confirmou a atualização do estado.

**Checklist:** ☐ compilação ☐ deploy ☐ leitura ☐ escrita ☐ atualização de estado

## Erros comuns
| Erro | Solução |
|---|---|
| `ECONNREFUSED 127.0.0.1:8545` | O `npx hardhat node` não está rodando no outro terminal |
| `Cannot find module ... Armazenamento.json` | Rode `npx hardhat compile` antes |
| `could not decode result data` | O node foi reiniciado: rode o deploy de novo |
| `npx hardhat` pergunta para criar projeto | Você está na pasta errada: abra a pasta `dapp-hardhat` |
