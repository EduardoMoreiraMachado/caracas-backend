const { MESSAGE_ERROR, MESSAGE_SUCESS } = require('../module/config.js');

//função para gerar um novo registro
const novaPizza = async function (pizza) {

    console.log(pizza)
    //validação de campos obrigatórios
    if (pizza.nome == undefined || pizza.preco == undefined || pizza.foto == undefined || pizza.id_categoria == undefined || pizza.ingredientes == undefined || 
        pizza.nome == '' || pizza.preco == '' || pizza.foto == '' || pizza.id_categoria == '' || pizza.ingredientes == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de pizza
        const novaPizza = require('../model/DAO/pizza.js');
        //chama a função para inserir uma nova pizza
        const result = await novaPizza.insertPizza(pizza);

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.INSERT_ITEM};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para excluir um registro
const excluirPizza = async function (id) {

    //validação para o id como campo obrigatório
    if (id == undefined || id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const removerPizza = require('../model/DAO/pizza.js');

        const result = await removerPizza.deletePizza(id);

        if (result) {

            return {status: 200, message: MESSAGE_SUCESS.DELETE_ITEM};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para retornar um registro
const buscarPizza = async function (id) {

    if (id == undefined || id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    } else {

        const selecionarPizza = require('../model/DAO/pizza.js');

        const pizza = await selecionarPizza.selectPizza(id);

        if (pizza) {

            return {status: 200, message: pizza};

        } else {

            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para retornar todos os registros
const buscarPizzas = async function () {

    const selecionarPizzas = require('../model/DAO/pizza.js');

    const pizzas = await selecionarPizzas.selectPizzas();

    if (pizzas) {

        return {status: 200, message: pizzas};

    } else {

        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

    }

}

//função para retornar todos os registros
const buscarTodasPizzas = async function () {

    const selecionarPizzas = require('../model/DAO/pizza.js');

    const pizzas = await selecionarPizzas.selectTodasPizzas();

    if (pizzas) {

        return {status: 200, message: pizzas};

    } else {

        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

    }

}

buscarPizzas()

//função para retornar todos os registros
const buscarPizzasDesconto = async function () {

    const selecionarPizzas = require('../model/DAO/pizza.js');

    const pizzas = await selecionarPizzas.selectDiscountPizzas();

    if (pizzas) {

        return {status: 200, message: pizzas};

    } else {

        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

    }

}

//função para retornar todos os registros
const buscarPizzasFavoritas = async function () {

    const selecionarPizzas = require('../model/DAO/pizza.js');

    const pizzas = await selecionarPizzas.selectFavoritePizzas();

    if (pizzas) {

        return {status: 200, message: pizzas};

    } else {

        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

    }

}

//função para atualizar um registro
const atualizarPizza = async function (pizza) {

    //validação para o id como campo obrigatório
    if (pizza.id_pizza == undefined || pizza.id_pizza == ''  || pizza.id_categoria == undefined || pizza.id_categoria == '' ||
        pizza.id_produto == undefined || pizza.id_produto == '') {
            console.log(pizza)
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    }

    //validação de campos obrigatórios
    if (pizza.nome == undefined || pizza.preco == undefined || pizza.foto == undefined || pizza.ingredientes == undefined ||
        pizza.nome == '' || isNaN(pizza.preco) || pizza.foto == '' || pizza.ingredientes == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de cliente
        const atualizarPizza = require('../model/DAO/pizza');
        //chaa a função para atualizar um cliente 
        const result = await atualizarPizza.updatePizza(pizza)

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM};

        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}

//função para retornar todos os registros
const buscarPizzasCategoria = async function (id) {

    const selecionarPizzas = require('../model/DAO/pizza.js');

    const pizzas = await selecionarPizzas.selectCategoryPizzas(id);

    if (pizzas) {

        return {status: 200, message: pizzas};

    } else {

        return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};

    }

}

//função para atualizar um registro
const atualizarLikesPizza = async function (pizza, id) {

    //validação para o id como campo obrigatório
    if (id == undefined ||
        id == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};

    }

    //validação de campos obrigatórios
    if (pizza.qntd_favorito == undefined ||
        pizza.qntd_favorito == '') {

        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    } else {

        //import da model de cliente
        const atualizarPizza = require('../model/DAO/pizza');
        //chaa a função para atualizar um cliente 
        const result = await atualizarPizza.updatePizzaLikes(pizza, id)

        if (result) {

            return {status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM};

        } else {

            return {status: 500, message:MESSAGE_ERROR.INTERNAL_ERROR_DB};

        }

    }

}


module.exports = {

    novaPizza,
    excluirPizza,
    buscarPizzas,
    buscarPizza,
    buscarPizzasDesconto,
    buscarPizzasFavoritas,
    atualizarPizza,
    buscarPizzasCategoria,
    atualizarLikesPizza,
    buscarTodasPizzas

}