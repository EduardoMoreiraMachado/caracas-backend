const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../module/config.js');

//função para gerar um novo registro
const novoCliente = async function (cliente) {

    //validação de campos obrigatórios
    if (cliente.nome == undefined || cliente.email == undefined || cliente.senha == undefined ||
        cliente.nome == '' || cliente.email == '' || cliente.senha == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de cliente
        const novoCliente = require('../model/DAO/cliente.js');
        //chama a função para inserir um novo cliente
        const result = await novoCliente.insertCliente(cliente);

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};

        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para atualizar um registro
const atualizarCliente = async function (cliente) {

    //validação para o id como campo obrigatório
    if (cliente.id == undefined || cliente.id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    }

    //validação de campos obrigatórios
    if (cliente.nome == undefined || cliente.email == undefined || cliente.senha == undefined ||
        cliente.nome == '' || cliente.email == '' || cliente.senha == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de cliente
        const atualizarCliente = require('../model/DAO/cliente.js');
        //chaa a função para atualizar um cliente 
        const result = await atualizarCliente.updateCliente(cliente);

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM};

        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para excluir um registro
const excluirCliente = async function (id) {

    //validação para o id como campo obrigatório
    if (id == undefined || id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const removerCliente = require('../model/DAO/cliente.js');

        const result = await removerCliente.deleteCliente(id);

        if (result) {

            return {status: 200, message: MESSAGE_SUCESS.DELETE_ITEM};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para validar registros
const validarCliente = async function (cliente) {

    let email = await cliente.email;
    let senha = await cliente.senha;

    if (email == undefined || senha == undefined ||
        email == '' || senha == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        const verificarCliente = require('../model/DAO/cliente.js');

        const resultCliente = await verificarCliente.selectCliente(email, senha);

        if (resultCliente) {
        
            // import da biblioteca que gera e valida a autenticidade do JWT
            const jwt = require('../midware/JWT.js')

            // geração do token pelo JWT
            let tokenUser = await jwt.createJWT(resultCliente.id)

            // adiciona uma chave do JSON com o token do usário
            resultCliente[0].token = tokenUser

            return {status: 200, message: resultCliente};

        } else {

            return {status: 403, message: MESSAGE_ERROR.INVALID_LOGIN};

        }

    }

}

module.exports = {

    novoCliente,
    atualizarCliente,
    excluirCliente,
    validarCliente

}