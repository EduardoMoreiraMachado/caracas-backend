const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../module/config.js');

//função para gerar um novo registro
const novoServico = async function (servico) {

    //validação de campos obrigatórios
    if (servico.nome == undefined || servico.descricao == undefined |
        servico.nome == '' || servico.descricao == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de cliente
        const novoServico = require('../model/DAO/servico.js');
        //chama a função para inserir um novo cliente
        const result = await novoServico.insertServico(servico);

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};

        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para atualizar um registro
const atualizarServico = async function (servico) {

    //validação para o id como campo obrigatório
    if (servico.id == undefined || servico.id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    }

    //validação de campos obrigatórios
    if (servico.nome == undefined || servico.descricao == undefined |
        servico.nome == '' || servico.descricao == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de serviço
        const atualizarServico = require('../model/DAO/servico.js');
        //chaa a função para atualizar um serviço 
        const result = await atualizarServico.updateServico(servico);

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM};

        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para excluir um registro
const excluirServico = async function (id) {

    //validação para o id como campo obrigatório
    if (id == undefined || id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const removerServico = require('../model/DAO/servico.js');

        const result = await removerServico.deleteServico(id);

        if (result) {

            return {status: 200, message: MESSAGE_SUCESS.DELETE_ITEM};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para retornar um registro baseado no ID
const buscarServico = async function (id) {

    let dadosServicoJSON = {};

    //validação para o id com campo obrigatório
    if (id == undefined || id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const { selectServico } = require('../model/DAO/servico.js');

        const dadosServico = await selectServico(id);

        if (dadosServico) {

            dadosServicoJSON.servico = dadosServico;
            return dadosServicoJSON;

        } else {

            return false;

        }

    }

}

//função para retornar todos os registros
const listarServicos = async function () {

    let dadosServicosJSON = {};

    const { selectAllServicos } = require('../model/DAO/servico.js');

    const dadosServicos = await selectAllServicos();

    if (dadosServicos) {

        dadosServicosJSON.servicos = dadosServicos;
        return dadosServicosJSON;

    } else {

        return false;

    }

}

module.exports = {

    novoServico,
    atualizarServico,
    excluirServico,
    buscarServico,
    listarServicos

}