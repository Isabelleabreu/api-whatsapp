/********************************************************************************************************
 * Objetivo: API responsavel em criar endPoints referente whatsapp
 * Data:05/10/2025
 * Autor: Isabelle
 * Versão 1.0
 * 
 * Observações: Instalar dependencias para criar a API
 *      express     - npm install express --save        Instala as dependencias para criar uma API
 *      cors        - npm install cors --save           Instala as dependencias para configurar as permissões de uma API
 *      body-parser - npm install body-parser --save    Instala as dependencias para receber os tipos de dados via POST ou PUT
 *********************************************************************************************************/

// Import das dependencias
const express = require('express')
const cors = require('cors')

const { 
    getAllDadosUsuario, 
    getProfileUsuario, 
    getContatosUsuario, 
    getMensagensUsuario, 
    getConversaUsuarioContato, 
    getPesquisaConversa 
} = require('./modulo/funcoes.js')

// Define a porta padrão da API
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Instancia na classe do express
const app = express()

// Configurações do CORS
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*') // IP de origem
    response.header('Access-Control-Allow-Methods', 'GET') // Métodos permitidos

    app.use(cors())
    next()
})

/******************************************************************************************************************/

// Listar todos os usuários
app.get('/v1/whatsapp/users', (request, response) => {
    let result = getAllDadosUsuario()
    response.status(result.statuscode).json(result)
})

// Listar dados do profile de um usuário
app.get('/v1/whatsapp/user/:id/profile', (request, response) => {
    let id = request.params.id
    let result = getProfileUsuario(id)
    response.status(result.statuscode).json(result)
})

// Listar contatos de um usuário
app.get('/v1/whatsapp/user/:id/contacts', (request, response) => {
    let id = request.params.id
    let result = getContatosUsuario(id)
    response.status(result.statuscode).json(result)
})

// Listar todas as mensagens de um usuário
app.get('/v1/whatsapp/user/:id/messages', (request, response) => {
    let id = request.params.id
    let result = getMensagensUsuario(id)
    response.status(result.statuscode).json(result)
})

// Listar conversa de um usuário com um contato (via número no query)
app.get('/v1/whatsapp/user/:id/chat', (request, response) => {
    let id = request.params.id
    let numeroContato = request.query.contact
    let result = getConversaUsuarioContato(id, numeroContato)
    response.status(result.statuscode).json(result)
})

// Pesquisar palavra-chave em conversas de um usuário
app.get('/v1/whatsapp/user/:id/search', (request, response) => {
    let id = request.params.id
    let palavra = request.query.keyword
    let result = getPesquisaConversa(id, palavra)
    response.status(result.statuscode).json(result)
})

app.listen(PORT, function(){
    console.log(`API aguardando requisições....`)
})
