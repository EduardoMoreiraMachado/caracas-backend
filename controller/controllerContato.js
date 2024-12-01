// Import do arquivo de mensagens padronizadas
const { MESSAGE_ERROR, MESSAGE_SUCESS} = require('../module/config')

// Import da model de aluno
const modelContato = require('../model/DAO/contato')

// Função para mandar as informações do novo contato e mensagem para a model
const newContato = async function(contato) {
    let contatoJSON = await contato

    // Validação de campos obrigatórios
    if (contatoJSON.nome == '' || contatoJSON.celular == '' || contatoJSON.mensagem == '' || contatoJSON.id_opcao == '' || contatoJSON.email == '' ||
        contatoJSON.nome == undefined || contatoJSON.celular == undefined || contatoJSON.mensagem == undefined || contatoJSON.id_opcao == undefined || contatoJSON.email == undefined)
        return { statusCode: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS }

    // Validação para verificar se o email é válido
    else if (!contatoJSON.email.includes('@'))
        return { statusCode: 400, message: MESSAGE_ERROR.INVALID_EMAIL }
    
    // Verificação da quantidade de caracter
    else if (contatoJSON.nome.length > 80 || contatoJSON.email.length > 256)
        return { statusCode: 400, message: MESSAGE_ERROR.LIMIT_EXCEEDED }
    
    else {
        // Chama a função para inserir um novo aluno
        const result = await modelContato.insertContato(contatoJSON)

        // Verificação do retono da função (se deu certo a inserção ou não)
        if (result)
            return { statusCode: 201, message: MESSAGE_SUCESS.INSERT_ITEM }

        else
            return { statusCode: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB }
    }
}

// Função para retornar uma lista com todos os contatos e mensagens
const getAllContatos = async function() {
    let contatosJSON = {}

    const dadosContatos = await modelContato.selectAllContatos()

    if (dadosContatos) {
        contatosJSON.statusCode = 200
        contatosJSON.message = dadosContatos

        return contatosJSON
    }

    else
        return false
}

// Função para retornar apenas os dados de um contato por meio do ID
const getContatoByID = async function(id) {
    let idContato = id
    let contatoJSON = {}

    //validação para o id como campo obrigatório
    if (idContato == undefined || idContato == '')
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    else {
        const dadosContato = modelContato.selectContatoByID(idContato)

        if(dadosContato) {
            contatoJSON.statusCode = 200
            contatoJSON.message = await dadosContato

            return contatoJSON
        }

        else
            return false
    }
}

// Função para retornar apenas os dados de um contato por meio da opcao
const getContatoByOpcao = async function(opcao) {
    let opcaoContato = opcao
    let contatoJSON = {}

    //validação para o id como campo obrigatório
    if (opcaoContato == undefined || opcaoContato == '')
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    else {
        const dadosContato = modelContato.selectContatosByOpcao(opcaoContato)

        if(dadosContato) {
            contatoJSON.statusCode = 200
            contatoJSON.message = dadosContato

            return contatoJSON
        }

        else
            return false
    }
}


//função para excluir um registro
const excluirContato = async function(id) {

    //validação para o id como campo obrigatório
    if (id == undefined || id == '') {

        return {statusCode: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const deleteContato = modelContato.deleteContado(id);

        if(deleteContato) {
      
            return {statusCode: 200, message: MESSAGE_SUCESS.DELETE_ITEM};

        } else {

            return {statusCode: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

module.exports = {
    newContato,
    getAllContatos,
    getContatoByID,
    getContatoByOpcao,
    excluirContato
}
