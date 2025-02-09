# Projeto em equipes (Formação DEV) - WeekMe

### Instalação

O primeiro passo é instalar as dependências após ter clonado o projeto. Precisamos abrir o terminal e rodar o seguinte comando

```bash
npm i
```

### Configuração

Temos que criar os arquivos `.env` dentro da raiz de cada projeto que fica dentro de `apps/` seguindo a base do seu exemplo `.env.example`. Cada arquivo `.env.example` tem um demonstrativo e comentários para demostrar como deve ser feito a sua configuração. Quando terminar de configurar o resultado esperado deve ser algo semelhante a imagem abaixo:

![Exemplo de .env](assets/env.png)

Na primeira vez que rodarmos o projeto é importante deixar configurado o banco de dados e para precisamos criar as tabelas e alguns dados essenciais para o projeto funcionar corretamente. Então rodaremos o seguinte comando na na pasta raiz:

```bash
sh scripts/seed.sh
```

Você pode baixar alguns animes executando o comando abaixo para ter uma experiência mais completa

```bash
sh scripts/scraper.sh
```

### Execução

Depois de ter realizado todos os passos anteriores estamos aptos a rodar o projeto sendo necessário apenas executar o seguinte comando

```bash
sh scripts/dev.sh
```

### Swagger

Enquanto o projeto estiver em execução, podemos acessar http://localhost:3000/docs para visualizar melhor os endpoints disponíveis.

### Banco de Dados

Para analisar os dados podemos acessar a pasta `apps/api` e executar o comando

```bash
npx prisma studio
```

Podemos também usar ferramentas mais avançadas como: DBeaver, pgAdmin...

### Apresentação

![Gif](assets/weekme.gif)
