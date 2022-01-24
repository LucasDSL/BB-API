## API para compra de livros

### Tecnologias utilizadas

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg" width="70"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="70"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="70" />
<img src="./docs/typeormicon.png" width="70">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain-wordmark.svg" width="70" />

### Como rodar localmente?

1 - Clone o projeto e vá até a pasta

```git bash
git clone https://github.com/LucasDSL/BB-API.git bb-api
cd bb-api
```

2 - Instale as dependências

```bash
npm install
```

3 - No diretório principal crie uma pasta chamada ormconfig.json para armazenas suas credencias do typeorm com "synchronize":true (detalhe importante):

```json
{
  "type": "mysql",
  "host": <seuhost>,
  "port": <suaporta>,
  "username": <seuusername>,
  "password": <senhadodb>,
  "database": <nomedodb>,
  "synchronize": true,
  "logging": false,
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "keepConnectionAlive": true,
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
```

4 - Após preencher as credenciais, rode o comando a seguir para criação das tabelas no banco de dados:

```bash
npx ts-node src/Infra/createTables.ts
```

5 - Agora de volta a ormconfig.json coloque a opção "synchronize" como false, isso é muito importante pois evita que a cada conexão com seu db haja tentativa de criação de tabelas pelo typeorm.

6 - Rode o projeto e faça requisições com as coleções postman na pasta "docs".

````bash
npm start
```
