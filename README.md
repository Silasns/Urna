# Projeto Urna

Projeto de urna genérica para qualquer tipo de eleição. Podendo ter votações anônimas ou não anônimas;

Frontend desenvolvido em Angular e o backend com Node.js e Express.

## Equipe:
* Silas;
* Silvino;
* Thiago;
* Vinicius Marini;

## Requisitos:
* Usuario deve se cadastrar;
* Usuario deve Logar;
* Usuario deve Votar;
* Adm tem acesso à relatório;
* Adm Cadastra tipo/opçoes de eleição;

## Wireframes

https://www.figma.com/proto/RFMTkVEQoGhUf6AyCErhtt/Untitled?node-id=1%3A2&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1


## Iniciar Projeto

* $ git clone https://vinolive@bitbucket.org/vinolive/urnatrabalho.git

* $ cd projeto

* $ ng s -o (inicia o servidor angular)

Abra outro terminal:

* $ cd ../backend

* $ tsc server.ts

* $ node server.js

Acessar: http://localhost:4200

## Cadastro de eleição

Para realizar o cadastro de nova eleição, o administrador deve ir até /projects/urnatrabalhobackend/dados/opcoes.csv e registrar os dados da seguinte forma:

titulo da eleicao,tipo,opcoes de voto({numero,nome,url para foto})

tipo: a = anonima / na = não anonima

Ex : Representante,na;1,Vinicius,urlFoto1,2,Thiago,urlFoto2,3,Silas,urlFoto3,4,Silvino,urlFoto4,0,Branco,urlFoto

## Tipos de eleição

### Anônima
O programa se inicia na urna, possibilitando ao eleitor votar mais de uma vez. E o registro do voto não tem dados do eleitor;

### Não anônima 
Usuário precisa se cadastrar previamente para realizar o voto. O voto é único por usuário.