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

O único *model* existente no momento é o de `item`, que contém informações como título, categoria, descrição, imagem e pontos. Os endpoints da API estão organizados em rotas, oferecendo funcionalidades como:
- **POST** para upload de imagens no AWS S3.
- Operações **CRUD** para o gerenciamento de itens.

Além disso, há um *service* dedicado ao S3 para configurar e gerar URLs de acesso. 

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
│   ├── itemController.js
│   └── uploadS3Controller.js
├── models/             
│   └── item.js
├── routes/             
│   ├── itemRoutes.js
│   └── uploadRoutes.js
├── services/           
│   └── s3Service.js
├── .env               
├── .gitignore     
├── app.js              
├── server.js           
├── package.json        
└── README.md           
```

Abaixo está uma descrição detalhada dos principais diretórios e arquivos do projeto:

#### `config/`
Contém arquivos de configuração para o projeto:
- **`database.js`**: Configura a conexão com o banco de dados.
- **`s3.js`**: Configura o acesso ao serviço S3 da AWS para armazenamento de arquivos.

#### `controllers/`
Contém a lógica de controle para as rotas:
- **`itemController.js`**: Gerencia as operações relacionadas aos itens, como criação, leitura, atualização e exclusão.
- **`uploadS3Controller.js`**: Gerencia o upload de arquivos para o S3.

#### `models/`
Contém os modelos de dados usados no projeto:
- **`item.js`**: Define o esquema e a estrutura do modelo de dados para os itens no banco de dados.

#### `routes/`
Define as rotas da API:
- **`itemRoutes.js`**: Contém as rotas relacionadas às operações com itens.
- **`uploadRoutes.js`**: Contém as rotas relacionadas ao upload de arquivos.

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
            "pontos": 10,
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
        "pontos": 10,
        "createdAt": "0000-00-00T00:00:00.000Z",
        "updatedAt": "0000-00-00T00:00:00.000Z"
    }
    ```

#### **POST /api/itens**
- **Descrição**: Cria um novo item no banco de dados.
- **Corpo da Requisição**:
    ```json
    {
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
- **Corpo da Requisição**:
    ```json
    {
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
- **Resposta**:
    ```json
    {
        "message": "Item deletado com sucesso"
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