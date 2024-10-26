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

O banco de dados é hospedado na nuvem em MongoDB e as credenciais de acesso devem ser fornecidas dentro de um arquivo `.env` conforme a [documentação do Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project).

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
- Typescript Execute para execução dos arquivos Typescript
- PrismaClient para conexão com banco de dados
- Swagger UI para documentação das rotas da API

Algumas dependências de desenvolvimento (`--save-dev`) também foram adicionadas:
- Prisma para atuar como ORM
- Typescript para utilizar recursos de tipagem em códigos Javascript

Para o frontend, o projeto foi feito utilizando Vite:
```
npm create vite@latest
```

O Vite já traz um template de projeto em React com apenas algumas dependências cruciais, dando mais maleabilidade para o desenvolvimento e nos permitindo adicionar módulos novos apenas conforme o necessário.

Nas dependências do frontend, temos apenas as dependências básicas do React, junto com o Redux Toolkit para gerenciamento de estado da aplicação e execução de requisições HTTP para a camada de API.
O Typescript também foi adicionado ao projeto como depenência de desenvolvimento.

E o Bootstrap foi importado direto do CDN para estilização, trazendo recursos prontos e responsivos
