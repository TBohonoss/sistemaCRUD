/* Aula 10 - Como funciona a web.
   OBS: O '$' significa inicio de um comando no terminal.

   A. Preparar ambiente de desenvolvimento:
   1. Abrir o terminal na pasta no novo projeto.
      Ctrl + j

   2. Iniciar o projeto com o npm:
      $ npm init -y

   3. Instalar a biblioteca nodemon:
      $ npm install nodemon   

   4. Instalar o framework express:
      $ npm install express

   5. Configurar script start no package.json:
      a. abrir o arquivo package.json;
      b. incluir dentro da propriedade "scripts" uma nova linha;
      c. nesta nova linha adicionar "start": "nodemon express.js";

   8. Implementar o sistema a ser executado:
      1. Importar o express com require('express');
      2. Criar a variável app para amazenar um conjunto de funcionalidades do express, voltados para execução do servidor;
      3. Utilizar a função listen do express para disponibilizar um servidor na porta 3000;
      4. Criar uma rota para responder uma mensagem e utilizar o método get do express.
      5. Implementar os métodos GET, POST, PUT e DELETE para contemplar o CRUD.
*/ 

const express = require('express');

let usuarios = [
    {
        id: 1,
        email: "thiago.bohonos@gmail.com",
        nome: "Thiago Bohonos"
    }
]

// Criando uma aplicação express
const app = express();

// Configurando o express para aceitar requests no formato de JSON
app.use(express.json());

// Configurando uma rotas
// Rota GET (READ): Leitura de dados de usuários 
app.get("/usuarios", (req, res) => {
    return res.send(usuarios);
});

// Rota POST (CREATE): Criação de usuários 
app.post("/usuarios", (req, res) => {
    // Obtendo dados enviados pelo client(pstaman)
    const novoUsuario = req.body;

    // Gerando um novo id para o novo usuário
    novoUsuario.id = usuarios.length + 1;

    // Adicionando usuário ao array usuários
    usuarios.push(novoUsuario);
    // lendo usuários
    return res.send("Usuário adicionado!");
});

// Rota PUT (UPDATE): Atualizando usuários
app.put("/usuarios/:id", (req, res) => {
   // Obter id passado pela url
   const { id } = req.params;

   // Buscar o usuário no array, utilizando o id da url
   const usuario = usuarios.find(usuario => usuario.id == id);

   // Alteração do objeto usuário
   usuario.nome = req.body.nome;
   usuario.email = req.body.email;
   return res.send("Usuário alterado com sucesso!");
});

// Rota DELETE (DELETE): Remove usuário
app.delete("/usuarios/:id", (req, res) => {
   // Obter id passado pela url
   const { id } = req.params;

   // Filtramos o array de usuários, excluindo o id recebido
   const novoArrayUsuarios = usuarios.filter(usuario => usuario.id != id);

   // Retribuímos o novo array filtrado para a variável usuários
   usuarios = novoArrayUsuarios;
   return res.send("Usuário removido com sucesso!");
});

// Rodando o servidor
app.listen(3000, () => {
    console.log("Servidor rolando no endereço http://localhost:3000");
});