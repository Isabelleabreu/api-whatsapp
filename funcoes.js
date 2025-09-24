/********************************************************************************************************
 * Objetivo: Arquivo responsavel pelas funções para criar a api de estados e cidades
 * Data:24/09/2025
 * Autor: Isabelle
 * Versão 1.0
 ********************************************************************************************************/
//Import do arquivo estados e cidades
const e = require('express')
const dados = require('./contatos.js')
const { measureMemory } = require('vm')
const MESSAGE_ERROR = { status: false, statuscode: 500, development: 'Isabelle dos Santos de Abreu' }

//Listar todos os dados de usuário independente do número
const getAllDadosUsuario = function (){
    let message = {status: true, statuscode: 200, development: 'Isabelle dos Santos de Abreu', All: []}

    dados.contatos['whats-users'].forEach(function (item) {
        message.All.push(item)
    })


    if (message.All != "") {

        //return message
        console.log(message)
    } else {
        // Caso não encontre: retorna o objeto de erro
        return MESSAGE_ERROR;
    }

}

//module.exports
console.log(getAllDadosUsuario)


