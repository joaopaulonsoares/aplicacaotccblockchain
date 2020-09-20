Passo a passo

1) Instalar dependencias
   - npm install web3   (para pegar pacotes para conectar browser e metamask)
   - npm install material-ui

2) Configurar metamask no browser

3) Permitir que o metamask se conecte com o localhost:3000 ou onde a aplicação ReactJS estiver executando
 -https://github.com/ethereum/web3.js/issues/2091

4) Executar o Ganache
    - Tornar imagem executavel: chmod a+x ganache-2.4.0-linux-x86_64.AppImage
    - Executar: ./ganache-2.4.0-linux-x86_64.AppImage 

5) Workspace: TCC-TRAFFICINFRACTIONS

6) Na aplicação blockchain
 - Instalar truffle
 - Executar migrations
 - Executar migrate reset para fazer deploy do contrato para o ganache
 - OBS: Passos necessários somente uma vez no inicio, informações são colocadas na aplicação cliente

7) Copiar endereço do contrato na build

8) Colocar endereço na aplicação client

9) Garantir que o metamask esta executando a rede local igual a do ganache

10) Garantir que as contas do ganache estão sincronizadas com o metamask(importar por meio da chave.)




Links uteis:
https://www.youtube.com/watch?v=mmI5CpMw3gU
https://www.dappuniversity.com/articles/the-ultimate-ethereum-dapp-tutorial