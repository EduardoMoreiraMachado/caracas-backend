const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../module/config.js');

//função para gerar um novo registro
const novaBebida = async function (bebida) {

    //validação de campos obrigatórios
    if (bebida.nome == undefined || bebida.preco == undefined || bebida.foto == undefined || bebida.id_categoria == undefined||
        bebida.nome == '' || bebida.preco == '' || bebida.foto == '' || bebida.id_categoria == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de ingrediente
        const novaBebida = require('../model/DAO/bebida.js');
        //chama a função para inserir uma novo ingrediente
        const result = await novaBebida.insertBebida(bebida);

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};

        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para atualizar um registro
const atualizarBebida = async function (bebida) {

    //validação para o id como campo obrigatório
    if (bebida.id_bebida == undefined || bebida.id_bebida == ''  || bebida.id_categoria == undefined || bebida.id_categoria == '' ||
        bebida.id_produto == undefined || bebida.id_produto == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    }i

    //validação de campos obrigatórios
    if (bebida.nome == undefined || bebida.preco == undefined || bebida.foto == undefined || bebida.peso_liquido == undefined ||
        bebida.nome == '' || isNaN(bebida.preco) || bebida.foto == '' || bebida.peso_liquido == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de cliente
        const atualizarBebida = require('../model/DAO/bebida.js');
        //chaa a função para atualizar um cliente 
        const result = await atualizarBebida.updateBebida(bebida)

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM};

        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para excluir um registro
const excluirBebida = async function (id) {

    //validação para o id como campo obrigatório
    if (id == undefined || id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const removerBebida = require('../model/DAO/bebida.js');

        const result = await removerBebida.deleteBebida(id);

        if (result) {

            return {status: 200, message: MESSAGE_SUCESS.DELETE_ITEM};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para retornar um registro
const buscarBebida = async function (id) {

    if (id == undefined || id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const selecionarBebida = require('../model/DAO/bebida.js');

        const bebida = await selecionarBebida.selectBebida(id);

        if (bebida) {

            return {status: 200, message: bebida};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para retornar todos os registros
const listarBebidas = async function () {

    let dadosBebidasJSON = {};

    const todasBebidas = require('../model/DAO/bebida.js');

    const dadosBebidas = await todasBebidas.selectAllBebidas();

    if (dadosBebidas) {

        dadosBebidasJSON.status = 200
        dadosBebidasJSON.message = dadosBebidas;
        return dadosBebidasJSON;

    } else {

        return false;

    }

}

//função para retornar todos os registros
const listarBebidasCategoria = async function (id) {

    let dadosBebidasJSON = {};

    const bebidasCategoria = require('../model/DAO/bebida.js');

    const dadosBebidas = await bebidasCategoria.selectCategoryBebidas(id);

    if (dadosBebidas) {

        dadosBebidasJSON.status = 200
        dadosBebidasJSON.message = dadosBebidas;
        return dadosBebidasJSON;

    } else {

        return false;

    }

}

module.exports = {

    novaBebida,
    excluirBebida,
    buscarBebida,
    listarBebidas,
    atualizarBebida,
    listarBebidasCategoria

}