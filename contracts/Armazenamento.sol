// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;                                    // versão do compilador

contract Armazenamento {
    uint public valor;                                     // variável de estado (fica na blockchain)
    address public dono;                                   // quem implantou o contrato

    event ValorAlterado(uint antigo, uint novo, address quem); // evento: log público da alteração

    constructor() { dono = msg.sender; }                   // roda 1 vez no deploy

    function getValor() public view returns (uint) {       // LEITURA: não gasta gas
        return valor;
    }

    function setValor(uint novo) public {                  // ESCRITA: cria transação
        require(novo != valor, "Valor igual ao atual");    // valida a entrada
        emit ValorAlterado(valor, novo, msg.sender);       // registra o evento
        valor = novo;                                      // altera o estado
    }
}
