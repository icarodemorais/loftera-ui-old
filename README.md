# Loftera - UI

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Loftera é uma aplicação Web que faz a intermediação entre estudantes de ensino médio e superior, que procuram por outros estudantes para viverem juntos.

### Tech

* [Bootstrap](https://getbootstrap.com/) - para padronização da ui
* [node.js] - '0'
* [Express] - framework de rede do node [@tjholowaychuk]
* [Sequelize](https://getbootstrap.com/) - ORM do node
* [jQuery] - obvio né padrin

### Instalação

O loftera precisa do [Node.js](https://nodejs.org/) v10+, MySql v5.6+ e [Loftera-API](https://github.com/icarodemorais/loftera-api) para rodar.

Instale as dependências:

```sh
$ cd loftera-ui
$ yarn install
```

Crie um arquivo na pasta base do projeto chamado .env:

```sh
$ touch .env
```

Adicione o seguinte conteúdo nele:

API_URL=http://localhost:3000

*O campo API_URL deve ter o caminho que aponta para a sua api do loftera rodando localmente*

Starte a UI com o seguinte comando na pasta base do projeto:

```sh
$ nodemon index.js
```