/********************************************************************************************************
 * Objetivo: Arquivo responsável pelas funções para criar a API WhatsApp
 * Data: 24/09/2025
 * Autor: Isabelle
 * Versão 1.0
 ********************************************************************************************************/

// Import do arquivo contatos
const { contatos } = require('./contatos.js')

// Mensagem de erro padrão
const MESSAGE_ERROR = {
    status: false,
    statuscode: 500,
    development: 'Isabelle dos Santos de Abreu'
}

// Função para listar todos os dados de usuário independente do número
const getAllDadosUsuario = function () {
    let message = {
        status: true,
        statuscode: 200,
        development: 'Isabelle dos Santos de Abreu',
        All: []
    }

    contatos['whats-users'].forEach(function (item) {
        message.All.push(item)
    })

    if (message.All.length > 0) {
        return message
    } else {
        return MESSAGE_ERROR
    }
}

// Função para listar dados do profile de um usuário
const getProfileUsuario = function(idUsuario) {
    idUsuario = parseInt(idUsuario)

    let usuario = contatos['whats-users'].find(item => item.id === idUsuario)

    if (usuario){
        return {
            status: true,
            statuscode: 200,
            development: 'Isabelle dos Santos de Abreu',
            profile: {
                id: usuario.id,
                account: usuario.account,
                nickname: usuario.nickname,
                number: usuario.number,
                "profile-image": usuario["profile-image"],
                background: usuario.background,
                "created-since": usuario["created-since"]
            }
        }
    } else {
        return {
            status: false,
            statuscode: 404,
            message: "Usuário não encontrado",
            development: 'Isabelle dos Santos de Abreu'
        }
    }
}

// Função para listar os contatos de um usuário
const getContatosUsuario = function(idUsuario) {
    idUsuario = parseInt(idUsuario)

    let usuario = contatos['whats-users'].find(item => item.id === idUsuario)

    if (usuario) {
        return {
            status: true,
            statuscode: 200,
            development: 'Isabelle dos Santos de Abreu',
            contacts: usuario.contacts.map(c => ({
                name: c.name,
                number: c.number,
                description: c.description,
                image: c.image
            }))
        }
    } else {
        return {
            status: false,
            statuscode: 404,
            message: "Usuário não encontrado",
            development: 'Isabelle dos Santos de Abreu'
        }
    }
}

// Função para listar todas as mensagens de um usuário
const getMensagensUsuario = function(idUsuario) {
    idUsuario = parseInt(idUsuario)

    let usuario = contatos['whats-users'].find(item => item.id === idUsuario)

    if (usuario) {
        let mensagens = []
        usuario.contacts.forEach(c => {
            c.messages.forEach(m => {
                mensagens.push({
                    contact: c.name,
                    sender: m.sender,
                    content: m.content,
                    time: m.time
                })
            })
        })

        return {
            status: true,
            statuscode: 200,
            development: 'Isabelle dos Santos de Abreu',
            messages: mensagens
        }
    } else {
        return {
            status: false,
            statuscode: 404,
            message: "Usuário não encontrado",
            development: 'Isabelle dos Santos de Abreu'
        }
    }
}

// Função para listar conversa de um usuário com um contato (via número)
const getConversaUsuarioContato = function(idUsuario, numeroContato) {
    idUsuario = parseInt(idUsuario)

    let usuario = contatos['whats-users'].find(item => item.id === idUsuario)

    if (usuario) {
        let contato = usuario.contacts.find(c => c.number == numeroContato)

        if (contato) {
            return {
                status: true,
                statuscode: 200,
                development: 'Isabelle dos Santos de Abreu',
                chat: {
                    name: contato.name,
                    number: contato.number,
                    messages: contato.messages
                }
            }
        } else {
            return {
                status: false,
                statuscode: 404,
                message: "Contato não encontrado para este usuário",
                development: 'Isabelle dos Santos de Abreu'
            }
        }
    } else {
        return {
            status: false,
            statuscode: 404,
            message: "Usuário não encontrado",
            development: 'Isabelle dos Santos de Abreu'
        }
    }
}

// Função para pesquisar palavra-chave nas conversas de um usuário
const getPesquisaConversa = function(idUsuario, palavra) {
    idUsuario = parseInt(idUsuario)

    let usuario = contatos['whats-users'].find(item => item.id === idUsuario)

    if (usuario) {
        let resultados = []

        usuario.contacts.forEach(c => {
            c.messages.forEach(m => {
                if (m.content.toLowerCase().includes(palavra.toLowerCase())) {
                    resultados.push({
                        contact: c.name,
                        sender: m.sender,
                        content: m.content,
                        time: m.time
                    })
                }
            })
        })

        return {
            status: true,
            statuscode: 200,
            development: 'Isabelle dos Santos de Abreu',
            result: resultados
        }
    } else {
        return {
            status: false,
            statuscode: 404,
            message: "Usuário não encontrado",
            development: 'Isabelle dos Santos de Abreu'
        }
    }
}

// Exporta as funções
module.exports = {
    getAllDadosUsuario,
    getProfileUsuario,
    getContatosUsuario,
    getMensagensUsuario,
    getConversaUsuarioContato,
    getPesquisaConversa
}
