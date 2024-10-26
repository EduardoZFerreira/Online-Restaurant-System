# PT-BR

## Sistema de cardápio com reservas para restaurante

O sistema conta com um menu de navegação no topo da tela, para que o usuário possa consultar o cardápio ou realizar uma nova reserva.

## Tecnologias utilizadas

### Linguagem
Tanto a parte de backend quanto o front end foram desenvolvidos utilizando Typescript. A linguagem foi escolhida pela praticidade de implementação, combinada com a possibilidade de criar uma estrutura concisa por meio dos recursos de tipagem.
O React JS também foi utilizado no desenvolvimento do front end pela sua capacidade de componentização e organização, além de seus recursos de roteamento e gerenciamento de estado, permitindo uma experiência de usuário rápida e sem recarregamentos na página.

Outra grande vantagem da combinação "React + Typescript" é a ampla comunidade e documentação disponível, resultando em uma curva de aprendizado relativamente pequena. Mesmo uma pessoa que ainda não tenha trabalhado com ambas, consegue desenvolver um sistema completo
com CRUD em poucos dias (Todos os recursos do sistema até a escrita deste arquivo README foram feitos em apenas 2 dias, incluindo documentação de API com Swagger).

### Ambiente
O ambiente padrão para execução da aplicação precisa apenas da instalação do [Node JS](https://nodejs.org/en/download/package-manager).
A configuração dos comandos para rodar ambos frontend e backend já está nos respectivos `package.json` de cada pasta. Basta navegar até cada uma, e executar:
```
npm run dev
```

Idealmente utilizam-se duas abas de terminal abertas. Uma para executar cada aplicação.


### Dependências

É possível utilizar o comando 
```
npm install
```
em ambas as pastas, para que o gerenciador de pacotes identifique e instale todas as dependências registradas nos arquivos JSON.

Para a camada de backend, foram utilizados:
- Express como framework de API
- CORS para permitir requisições "cross-origin"
- Body-parser para poder acessar o corpo das requisições
