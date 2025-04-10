# Documentação UniLife Backend

## Índice
1. [Introdução](#introdução)
2. [Requisitos](#requisitos)
3. [Instalação](#instalação)
4. [Configuração](#configuração)
5. [Uso](#uso)
6. [Estrutura do Projeto](#estrutura-do-projeto)
7. [Endpoints](#endpoints)
8. [Conclusão](#conclusão)
9. [Licença](#licença)

## Introdução
O backend do UniLife é responsável por gerenciar o banco de dados PostgreSQL e o serviço de armazenamento S3 da Amazon. Atualmente, os controllers implementados incluem o de itens e o de upload de imagens para o S3. 

Os *models* atualmente disponíveis são `item` e `user`. O modelo `item` armazena informações como título, categoria, descrição, imagem e pontos, enquanto o modelo `user` contém dados como nome, email, senha e instituição. Os endpoints da API estão organizados em rotas, fornecendo funcionalidades específicas para cada recurso.

- **POST** para upload de imagens no AWS S3.
- Operações **CRUD** para o gerenciamento de itens.
- **CRUD** para cadastro e autenticação de usuários.

Além disso, há um *service* dedicado ao S3 para configurar e gerar URLs de acesso. A aplicação também conta com autenticação baseada em JWT (JSON Web Token). Ao realizar login, o backend gera um token que deve ser enviado pelo cliente em requisições protegidas, através do cabeçalho Authorization. Um middleware é responsável por validar esse token e garantir o acesso seguro às rotas privadas.

A estrutura principal do backend inclui:
- **app.js**: Centraliza os endpoints das APIs.
- **server.js**: Responsável por inicializar e executar a aplicação.

Essa arquitetura garante uma integração eficiente entre o banco de dados, o armazenamento em nuvem e as funcionalidades da API.

## Requisitos

Para rodar o UniLife backend em Node.js, certifique-se de ter os seguintes pré-requisitos instalados:

1. **Node.js**: Versão 14 ou superior. [Baixe aqui](https://nodejs.org/).
2. **npm**: Gerenciador de pacotes do Node.js (geralmente instalado junto com o Node.js).
3. **PostgreSQL**: Banco de dados relacional. Certifique-se de que o serviço está rodando e configurado.
4. **Dependências do projeto**: Listadas no arquivo `package.json`. Instale-as com:
    ```bash
    npm install
    ```
5. **Variáveis de ambiente**: Configure um arquivo `.env` com as seguintes informações:
    - Credenciais do banco de dados (host, usuário, senha).
    - Chaves de acesso da AWS (AWS_BUCKET_NAME, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY).
    - Chave de acesso JWT (JWT_SECRET).

Certifique-se de que todos os serviços necessários estão configurados corretamente antes de iniciar a aplicação.

## Instalação
Passos para instalar o projeto localmente:

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/EduardoMnzs/UniLife-backend.git
    ```

2. **Acesse o diretório do projeto**:  
    ```bash
    cd UniLife-backend
    ```

3. **Instale as depêndencias**:
    ```bash
    npm install
    ```

## Configuração
Para configurar o arquivo `.env`, siga os passos abaixo:

1. **Crie o arquivo `.env` na raiz do projeto**:
    Caso o arquivo não exista, crie um novo arquivo chamado `.env` no diretório principal do projeto.

2. **Adicione as variáveis de ambiente necessárias**:
    Insira as seguintes variáveis no arquivo `.env`, substituindo os valores pelos dados apropriados para o seu ambiente:

    ```env
    # Configurações da chave de acesso JWT
    JWT_SECRET=sua_secret_key

    # Configurações do banco de dados
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_NAME=nome_do_banco

    # Configurações da AWS
    AWS_BUCKET_NAME=nome_do_bucket
    AWS_REGION=regiao_do_bucket
    AWS_ACCESS_KEY_ID=sua_access_key
    AWS_SECRET_ACCESS_KEY=sua_secret_key
    ```

3. **Verifique as permissões do arquivo**:
    Certifique-se de que o arquivo `.env` não está acessível publicamente, especialmente em repositórios versionados. Adicione o arquivo ao `.gitignore` para evitar que ele seja enviado ao controle de versão.

4. **Reinicie a aplicação**:
    Após configurar o arquivo `.env`, reinicie a aplicação para que as variáveis de ambiente sejam carregadas corretamente.

Essas variáveis são essenciais para o funcionamento do backend, garantindo a conexão com o banco de dados e os serviços da AWS.

## Uso
Para rodar a aplicação, siga os passos abaixo:

1. **Inicie o servidor**:
    Execute o seguinte comando para iniciar o servidor:
    ```bash
    npm start
    ```

2. **Acesse a aplicação**:
    Após iniciar o servidor, a aplicação estará disponível no endereço:
    ```
    http://localhost:3000
    ```
    Substitua `3000` pela porta configurada, caso tenha alterado a porta padrão.

5. **Teste os endpoints**:
    Utilize ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) para testar os endpoints da API.

Esses passos garantem que o backend estará rodando corretamente e pronto para atender às requisições.

## Estrutura do Projeto

A organização do projeto segue o padrão **MVC (Model-View-Controller)**, com os diretórios e arquivos principais estruturados da seguinte forma:

```
UniLife-backend/
├── config/             
│   ├── database.js
│   └── s3.js
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   ├── itemController.js
│   └── uploadS3Controller.js
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models/
│   ├── item.js
│   └── user.js
├── routes/
│   ├── authRoutes.js
│   ├── itemRoutes.js
│   └── uploadRoutes.js
├── services/
│   └── s3Service.js
├── .env
├── .gitignore
├── app.js
├── package.json
├── README.md
└── server.js
```

Abaixo está uma descrição detalhada dos principais diretórios e arquivos do projeto:

#### `config/`
Contém arquivos de configuração para o projeto:
- **`database.js`**: Configura a conexão com o banco de dados.
- **`s3.js`**: Configura o acesso ao serviço S3 da AWS para armazenamento de arquivos.

#### `controllers/`
Contém a lógica de controle para as rotas:
- **`adminController.js`**: Gerencia as operações administrativas, como a criação e gerenciamento de usuários com permissões especiais. Este controlador é responsável por funções que exigem privilégios administrativos, garantindo que apenas usuários autorizados possam realizar ações críticas no sistema.

- **`authController.js`**: Gerencia as operações de autenticação e autorização de usuários. Este controlador é responsável por funções como registro de novos usuários, login, logout e renovação de tokens JWT. Ele também valida as credenciais fornecidas pelos usuários e gera tokens de acesso para autenticação em rotas protegidas.

- **`itemController.js`**: Gerencia as operações relacionadas aos itens, como criação, leitura, atualização e exclusão. Algumas dessas operações, como a exclusão e atualização de itens, exigem permissões administrativas para garantir que apenas usuários autorizados possam realizar alterações críticas no sistema.

- **`uploadS3Controller.js`**: Gerencia o upload de arquivos para o S3. Este controlador também requer permissões administrativas para realizar uploads, garantindo que apenas usuários com privilégios adequados possam acessar e modificar os recursos de armazenamento.

#### `middlewares/`
Contém os middlewares responsáveis por interceptar e processar requisições antes que elas cheguem aos controladores:

- **`authMiddleware.js`**: Verifica se o token JWT fornecido na requisição é válido. Este middleware é essencial para proteger rotas privadas, garantindo que apenas usuários autenticados possam acessá-las.

- **`roleMiddleware.js`**: Garante que o usuário tenha as permissões adequadas para acessar determinadas rotas ou realizar ações específicas. Ele verifica o papel (role) do usuário e bloqueia o acesso caso as permissões sejam insuficientes.

#### `models/`
Contém os modelos de dados usados no projeto:
- **`item.js`**: Define o esquema e a estrutura do modelo de dados para os itens no banco de dados.

- **`user.js`**: Define o esquema e a estrutura do modelo de dados para os usuários no banco de dados. Este modelo inclui campos como `nome`, `email`, `senha` e `instituição`. Ele também pode conter validações e métodos específicos para manipulação de dados relacionados aos usuários, como a criptografia de senhas antes de salvar no banco de dados.

#### `routes/`
Define as rotas da API:

- **`authRoutes.js`**: Contém as rotas relacionadas à autenticação e autorização de usuários. Essas rotas incluem endpoints para registro de novos usuários, login, logout e renovação de tokens JWT. Elas são protegidas por middlewares que garantem a segurança e a validação das credenciais fornecidas.

- **`itemRoutes.js`**: Contém as rotas relacionadas às operações com itens. Essas rotas permitem realizar operações **CRUD** (Criar, Ler, Atualizar e Deletar) para gerenciar os itens no sistema. Elas são protegidas por middlewares que garantem a autenticação e, em alguns casos, verificam as permissões administrativas necessárias para realizar determinadas ações.

- **`uploadRoutes.js`**: Contém as rotas relacionadas ao upload de arquivos para o serviço S3 da AWS. Essas rotas permitem que os usuários enviem imagens ou outros arquivos, que serão armazenados no bucket configurado. Elas são protegidas por middlewares que garantem a autenticação e, em alguns casos, verificam as permissões administrativas necessárias para realizar uploads.

#### `services/`
Contém a lógica de serviços que pode ser reutilizada em diferentes partes do projeto:

- **`s3Service.js`**: Implementa a lógica para interagir com o serviço S3 da AWS.

#### Arquivos Principais
- **`.env`**: Arquivo para armazenar variáveis de ambiente, como credenciais e configurações sensíveis.
- **`.gitignore`**: Lista de arquivos e pastas que devem ser ignorados pelo Git.
- **`app.js`**: Configura o aplicativo principal, como a inicialização de rotas.
- **`server.js`**: Inicia o servidor e escuta as requisições na porta configurada.
- **`package.json`**: Contém as dependências e scripts do projeto.
- **`README.md`**: Documentação do projeto, explicando como configurá-lo e usá-lo.

Essa estrutura modular facilita a manutenção e escalabilidade do projeto, separando responsabilidades de forma clara.

## Endpoints

Abaixo estão listados os endpoints disponíveis na API:

## `Itens`
#### **GET /api/itens**
- **Descrição**: Retorna uma lista de todos os itens cadastrados.
- **Parâmetros**: Nenhum.
- **Resposta**:
    ```json
    [
        {
            "id": 1,
            "titulo": "Item 1",
            "categoria": "Categoria A",
            "descricao": "Descrição do item 1",
            "imagem": "url_da_imagem",
            "pontos": 0,
            "estoqueAtual": 0,
            "estoqueMinimo": 0,
            "disponivel": false,
            "createdAt": "0000-00-00T00:00:00.000Z",
            "updatedAt": "0000-00-00T00:00:00.000Z"
        },
        ...
    ]
    ```

#### **GET /api/itens/:id**
- **Descrição**: Retorna os detalhes de um item específico.
- **Parâmetros**:
    - `id` (path): ID do item a ser buscado.
- **Resposta**:
    ```json
    {
        "id": 1,
        "titulo": "Item 1",
        "categoria": "Categoria A",
        "descricao": "Descrição do item 1",
        "imagem": "url_da_imagem",
        "pontos": 0,
        "estoqueAtual": 0,
        "estoqueMinimo": 0,
        "disponivel": false,
        "createdAt": "0000-00-00T00:00:00.000Z",
        "updatedAt": "0000-00-00T00:00:00.000Z"
    }
    ```

#### **POST /api/itens**
- **Descrição**: Cria um novo item no banco de dados.
- **Cabeçalhos**:
    - `x-auth-token`: Token de autenticação JWT.
- **Corpo da Requisição**:
    ```json
    {
        "estoqueAtual": 10,
        "estoqueMinimo": 0,
        "disponivel": true,
        "titulo": "Novo Item",
        "categoria": "Categoria B",
        "descricao": "Descrição do novo item",
        "imagem": "url_da_imagem",
        "pontos": 20
    }
    ```
- **Resposta**:
    ```json
    {
        "id": 1,
        "estoqueAtual": 10,
        "estoqueMinimo": 0,
        "disponivel": true,
        "titulo": "Item 1",
        "categoria": "Categoria A",
        "descricao": "Descrição do item 1",
        "imagem": "url_da_imagem",
        "pontos": 10,
        "createdAt": "0000-00-00T00:00:00.000Z",
        "updatedAt": "0000-00-00T00:00:00.000Z"
    }
    ```

#### **PUT /api/items/:id**
- **Descrição**: Atualiza as informações de um item existente.
- **Parâmetros**:
    - `id` (path): ID do item a ser atualizado.
- **Cabeçalhos**:
    - `x-auth-token`: Token de autenticação JWT.
- **Corpo da Requisição**:
    ```json
    {
        "estoqueAtual": 10,
        "estoqueMinimo": 0,
        "disponivel": true,
        "titulo": "Novo Item",
        "categoria": "Categoria B",
        "descricao": "Descrição do novo item",
        "imagem": "url_da_imagem",
        "pontos": 20
    }
    ```
- **Resposta**:
    ```json
    {
        "id": 1,
        "estoqueAtual": 10,
        "estoqueMinimo": 0,
        "disponivel": true,
        "titulo": "Item 1",
        "categoria": "Categoria A",
        "descricao": "Descrição do item 1",
        "imagem": "url_da_imagem",
        "pontos": 10,
        "createdAt": "0000-00-00T00:00:00.000Z",
        "updatedAt": "0000-00-00T00:00:00.000Z"
    }
    ```

#### **DELETE /api/items/:id**
- **Descrição**: Remove um item do banco de dados.
- **Parâmetros**:
    - `id` (path): ID do item a ser removido.
- **Cabeçalhos**:
    - `x-auth-token`: Token de autenticação JWT.
- **Resposta**:
    ```json
    {
        "message": "Item deletado com sucesso"
    }
    ```

## `S3 AWS`
#### **POST /api/upload**
- **Descrição**: Cria a imagem de um novo item no bucket da AWS.
- **Parâmetros**: Nenhum.
- **Cabeçalhos**:
    - `x-auth-token`: Token de autenticação JWT.
- **Corpo da Requisição**:
    O corpo da requisição deve conter o arquivo a ser enviado no formato `multipart/form-data`:
    ```json
    {
        "file": "arquivo_imagem"
    }
    ```
- **Resposta**:
    ```json
    {
        "message": "Upload bem-sucedido!",
        "imageUrl": "https://unilife-app-imagens.s3.us-east-2.amazonaws.com/imagemenviada.png"
    }
    ```



## Conclusão

O backend do UniLife foi projetado para oferecer uma solução robusta e escalável, integrando banco de dados relacional e armazenamento em nuvem. Com uma arquitetura modular baseada no padrão MVC, o projeto é fácil de manter e expandir. 

Seguindo as instruções de configuração e uso, você poderá implementar e personalizar o sistema para atender às suas necessidades específicas. Caso tenha dúvidas ou sugestões, sinta-se à vontade para contribuir ou entrar em contato.

Obrigado por utilizar o UniLife!

## Licença

MIT License

Copyright (c) 2025 Universidade de Marília - UNIMAR

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:                       

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.