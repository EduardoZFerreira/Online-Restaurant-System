# PT-BR

## Sistema de cardápio com reservas para restaurante

O sistema conta com um menu de navegação no topo da tela, para que o usuário possa consultar o cardápio ou realizar uma nova reserva.

## Tecnologias utilizadas

### Hospedagem
Para hospedar a aplicação, foram utilizados os serviços da [Netlify](https://www.netlify.com) para o frontend e [Render](https://render.com) para o backend. Ambos os serviços possuem planos gratuitos. Utilize os links abaixo para acessar:

[Frontend](https://lustrous-bonbon-fe717c.netlify.app)
[Documentação da API no Swagger](online-restaurant-api.onrender.com/docs/)

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
Para esta aplicação, criei um cluster chamado `restaurant` e um `schema` também chamado `restaurant`.

Dentro do arquivo `.env`, a configuração fica:

```
DATABASE_URL="mongodb+srv://[USUÁRIO NO MONGODB]:[SENHA]@[ENDEREÇO DO CLUSTER]/restaurant?retryWrites=true&w=majority&appName=restaurant"
TZ="America/SP";
```

O `timezone` foi definido como "America/SP" para garantir a precisão dos horários no cadastro das reservas.

A utilização do MongoDB neste caso se deu única e exclusivamente pela praticidade de se criar um banco de dados na nuvem, e a decisão não levou em consideração os recursos e possibilidades de se utilizar um banco de dados não relacional. Os dados da aplicação foram inclusive modelados "pensando de forma relacional".

### Executando o projeto

Para executar o projeto localmente, é necessário instalar as dependências de ambos backend e frontend. Todas as dependências estão devidamente citadas nos arquivos `package.json`, basta executar o comando `npm install` em ambos os diretórios.
Também é necessário ter um cluster configurado no MongoDB. O serviço é gratuito. 

É possível configurar outros bancos de dados, como Postgress ou MySQL para rodar localmente, basta configurar o `DATABASE_URL` nas variáveis de ambiente de acordo com o banco a ser utilizado, e apontar o `provider` correto dentro da definição do `datasource` no 
arquivo `prisma.schema`.

Em resumo, o passo a passo para rodar os projetos:
1. Garantir que uma versão do "Node" instalado localmente (O desenvolvimento deste projeto foi feito utilizando a versão 21.0.0)
2. Abrir uma aba de terminal (Powersheel, CMD, terminal do VSCode, ...) para cada aplicação `cd ./frontend/ | cd ./backend/`
3. Executar o comando `npm install` de ambas as aplicações
4. Configurar a conexão com o banco de dados no backend (Executar um banco localmente ou criar um cluster no MongoDB)
5. Executar o comando `npx prisma db push` caso estiver utilizando MongoDB, ou criar uma `migration` conforme a [documentação](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/baseline-your-database-typescript-postgresql) para o caso de bancos de dados relacionais.
6. Executar o comando `npm run dev` em ambas as aplicações

Com as configurações atuais, o backend deve rodar na porta `8081`, e o frontend na porta padrão do [Vite](https://v3.vitejs.dev/config/server-options.html) - `5173`

É possível acessar a documentação Swagger da API por meio da rota: "localhost:8081/docs/"

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

E o Bootstrap foi importado direto do CDN para estilização, trazendo recursos prontos e responsivo para se adaptar rapidamente diversas telas.

### O processo de desenvolvimento
Meu primeiro contato com o projeto foi receber a documentação com as especificações:

1. **Consulta de Cardápio**:
    - O usuário pode visualizar o cardápio do restaurante, que está dividido em categorias (entradas, pratos principais, sobremesas e bebidas).
    - Cada item do cardápio deve conter nome, descrição e preço.
2. **Reserva de Mesa**:
    - O usuário pode fazer uma reserva de mesa no restaurante, informando seu nome, número de pessoas e a data/hora desejada.

Outras partes do documento, como requisitos obrigatórios e opcionais, não serão tratadas aqui por questão de sigilo.

Com as especificações do projeto em mãos, meu primeiro passo foi modelar a estrutura de banco de dados por meio de um esboço:
![image](https://github.com/user-attachments/assets/42eae66e-5a7c-44f9-b5f9-1f1bccb0b647)

Após definir as tabelas, iniciei um novo projeto (`npm init -y`), chamei de "backend" e instalei as dependências anteriormente mencionadas.
Iniciei a API com uma rota de "healthcheck", e depois criei um cluster chamado "restaurant" no [MongoDB](https://www.mongodb.com/pt-br), seguido de um `schema` de mesmo nome. 
Configurei o Prisma para se conectar com este cluster, e fiz o mapeamento das entidades conforme o esboço do banco de dados.
Em um momento inicial, deixei de lado as tabelas `table` e `tableReservation`, visto que não iria implementar nenhum tipo de regra de negócio envolvendo lotação máxima de mesas, e distribuição de reserva entre mesas diferentes.

Com o mapeamento feito, utilizei o comando `db push` do Prisma para sincronizar o cluster com a estrutura mapeada. **O comando DB PUSH deve ser usado no lugar de migrations no Prisma quando trabalhamos com MongoDB**

Após verificar se todas as tabelas haviam sido criadas pelo Atlas do MongoDB, comecei a criar as `services` para conter a lógica de negócio da aplicação e os métodos de busca e criação de dados no banco.
Depois das `services`, criei as `controllers`, e por fim mapeei as rotas no `routes.ts`. Criei algumas rotas que me permitiriam popular a base por meio de requisições no Postman.

Para organizar e definir de forma mais concreta os parâmetros que deveriam ser recebidos pela API, criei `interfaces` auxiliares. Neste caso, utilizei as interfaces pois sua utilidade seria a "inversão de controle" ao processar o corpo das requisições, e elas deveriam apenas mapear os campos, não necessariamente gerar instâncias de objetos com construtor.

Com o backend estruturado, passei para o frontend, utilizando o `npm create vite@latest` para iniciar o projeto. No frontend, primeiro implementei o roteamento e uma versão não estilizada do menu, ao topo da página. 

Depois criei componentes para as páginas de visualização do cardápio (mas ainda sem preenchimento) e a página com o formulário para preencher os dados da reserva.
A estrutura de diretórios que utilizei segue o raciocínio:
**src/Views:** Para componentes que irão representar "telas"
**src/Components:** Para componentes isolados, que irão ser utilizados para compor as telas
Podemos utilizar um "mantra" para facilitar o entendimento desta estrutura: "Tudo em React é componente. Toda tela é componente, mas nem todo componente é uma tela".

Com a estrutura definida, realizei a configuração do Redux Toolkit, criando um `slice` para a API e registrando as rotas que seriam acessadas pelo frontend. Criei e implementei o `store` para registrar o `slice` da API,
e comecei a buscar alguns dados para exibir na listagem do cardápio, mesmo que sem estilização em um primeiro momento.
Para "formatar" os dados do JSON recebido do backend, criei `interfaces`, conforme havia feito no backend também.

E para enviar os dados do formulário de cadastro da reserva, criei um DTO. Neste caso, fazia sentido utilizar uma `class`, para utilizar o construtor e definir os campos conforme o que havia sido preenchido no formulário.
No lado da API, foi apenas necessário representar este DTO com uma `interface` para manter a `IoC`. O padrão de nomes utilizado neste caso para o DTO foi: `[ação][entidade]DTO` -> `Save[ação]Reservation[entidade]DTO`.
E para interfaces, o padrão utilizado foi `I[entidade|DTO do contrato]`:
1. `IMenuItem` -> Uma interface que define o contrato da entidade `MenuItem`
2. `ISaveReservationDTO` -> Uma interface que define o contrato do DTO `SaveReservationDTO`

Aproveitar os recursos de tipagem do Typescript garantiu um trânsito de dados com pouca necessidade de ajuste entre frontend e backend, tornando todo o desenvolvimento mais ágil e conciso.
Além dos benefícios na organização do código, trabalhar com tipagem permite utilizar recursos de validação de tipos no editor de texto, que pode auxiliar a identificar as propriedades dos objetos.

