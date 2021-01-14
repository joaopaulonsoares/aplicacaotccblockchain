English version below

# Aplicação Blockchain Para Registro de Infrações de Trânsito

O termo Blockchain se popularizou em função das negociações com criptomoedas, deforma mais notória a moeda digital Bitcoin que surgiu em meados de 2009, porém suatecnologia possui um potencial de aplicação em diversos contextos. Este potencial de uso da tecnologia fez com que diversas plataformas e comunidades de apoio ao desenvolvimento destas aplicações surgissem, possibilitando que diversas aplicações fossem criadase a tecnologia difundida cada vez mais em diversas áreas. Os registros feitos dentro deum blockchain são imutáveis, uma vez que estes registros são posicionados em blocos evinculados a registros anteriores após o consenso de outros nós presentes na rede, o quetorna não necessária a presença de uma terceira parte para autenticar a veracidade dasinformações apresentadas. O presente trabalho propõe a implementação de uma aplicaçãodescentralizada (Dapp) para o registro de infrações de trânsito de acordo com as normaspresentes no Código de Trânsito Brasileiro, demonstrando a viabilidade do uso desta novatecnologia em um contexto presente no cotidiano das pessoas.

Este trabalho foi desenvolvido durante o Trabalho de Conclusão de Curso 2 pelo aluno João Paulo Nunes Soares como requisito para graduação em Engenharia de Software pela Universidade de Brasília. O funcionamento da aplicação pode ser visualizado no vídeo: https://www.youtube.com/watch?v=Q1qknimuyW8 e a monografia com mais detalhes a cerca de implementação e outros aspectos técnicos pode ser acessada em:

## Estrutura do Repositório

### Contracts

Esta pasta contém os arquivos utilizados durante o desenvolvimento do smart contract, utilizando o Ganache e o framework Truffle para auxiliar neste processo inicial.

### Dashboard_Autoridade

Arquivos da aplicação cliente desenvolvida para contas de autoridades de trânsito(melhor explicado no vídeo com link na seção anterior).

### Dashboard_Motorista

Arquivos da aplicação cliente desenvolvida para contas de motoristas(melhor explicado no vídeo com link na seção anterior).

## Dependências

* Metamask: É necessário que seja adiconada a extensão metamask no navegador para que seja a carteira virtual. ([https://metamask.io/](https://metamask.io/))
* Node
* ReactJS
* Rede Ethereum para o contract, neste trabalho foi utilizada a rede de testes Ethereum Ropsten(https://ropsten.etherscan.io/)

## Como Executar a aplicação

1. Instale a extensão metamask.
2. Execute a aplicação cliente desejada(motorista ou autoridade). Para facilitar é possível executá-las por meio do Docker executando os comandos: `docker-compose up dev` caso deseje executar o ambiente de desenvolvimento ou `docker-compose up prod` para o ambiente de produção
 > Novas contas de usuário só podem ser registradas por contas administradoras, caso deseje testar a aplicação interagindo com o contrato atual(com deploy na rede ROPSTEN) entre em contato pelo email paulonsoares@yahoo.com.br que sua conta será registrada.

***

# Blockchain application for recording traffic violations

The term Blockchain became popular due to the negotiations with cryptocurrencies, most notably the digital currency Bitcoin that appeared in mid-2009, but its technology has a potential for application in various contexts. This potential for the use of technology has led to the emergence of several platforms and support communities for the development of these applications, allowing the creation of several applications and the technology that is increasingly disseminated in different areas. The records made within a blockchain are immutable, since these records are placed in blocks linked to previous records after the consensus of other nodes present in the network, which does not require the presence of a third party to authenticate the veracity of the information presented. This work proposes the implementation of a decentralized application (Dapp) for the registration of traffic violations according to the rules present in the Brazilian Traffic Code, demonstrating the feasibility of using this new technology in a context present in people's daily lives.

This work was developed during Course Completion Work 2 by student João Paulo Nunes Soares as a requirement for graduation in Software Engineering from the University of Brasília. The operation of the application can be viewed in the video: https://www.youtube.com/watch?v=Q1qknimuyW8 and the monograph with more details on implementation and other technical aspects can be accessed at:

## Repository Structure

### Contracts

This folder contains the files used during the development of the smart contract, using Ganache and the Truffle framework to assist in this initial process.

### Dashboard_Authority

Client application files developed for traffic authority accounts (better explained in the video linked in the previous section).

### Dashboard_Motorista

Client application files developed for driver accounts (better explained in the video linked in the previous section).

## Dependencies

* Metamask: It is necessary to add the metamask extension in the browser to be the virtual wallet. ([https://metamask.io/==(https://metamask.io/))
* Node
* ReactJS
* Ethereum network for the contract, this work used the Ethereum Ropsten test network (https://ropsten.etherscan.io/)

## How to Run the Application

1. Install the metamask extension.
2. Run the desired client application (driver or authority). To make it easier, you can run them through Docker by running the commands: `docker-compose up dev` if you want to run the development environment or ` docker-compose up prod` for the production environment
 > New user accounts can only be registered by administrator accounts, if you want to test the application interacting with the current contract (with deploy on the ROPSTEN network) contact us by email paulonsoares@yahoo.com.br that your account will be registered.
