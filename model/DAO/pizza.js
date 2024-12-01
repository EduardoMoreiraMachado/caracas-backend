//import da classe prismaClient que é responsável pelas interações com o BD
const { PrismaClient } = require('@prisma/client');

//instância da classe prismaClient
const prisma = new PrismaClient();

//função para inserir registros
const insertPizza = async function (pizza) {

    // try {

        let insertProduto = `insert into tbl_produto(
                                         nome,
                                         preco,
                                         foto,
                                         codigo_tipo,
                                         id_categoria
                                         )
                                   values(
                                          '${pizza.nome}',
                                           ${pizza.preco},
                                          '${pizza.foto}',
                                           1,
                                          '${pizza.id_categoria}'
                                          )`;

        //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
        const resultProduto = await prisma.$executeRawUnsafe(insertProduto);

        console.log(resultProduto)

        if (resultProduto) {

            let selectLastID = `select id from tbl_pizza order by id desc limit 1`

            const resultSelect = await prisma.$queryRawUnsafe(selectLastID)

            if (resultSelect.length > 0) {

                let updatePizza = `update tbl_pizza set desconto = ${pizza.desconto}, 
                                                        qntd_favorito = 0, 
                                                        ingredientes = '${pizza.ingredientes}' 
                                                        where id = ${resultSelect[0].id};`;

                //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
                const resultPizza = await prisma.$executeRawUnsafe(updatePizza);
                if (resultPizza) {

                    return true;

                } else {

                    return false;

                }

            } else {

                return false;

            }

        } else {

            return false;

        }

    // } catch (error) {

    //     return false;

    // }

}

//função para atualizar um registro no BD
const updatePizza = async function (pizza) {

    try {
        let sqlUpdate = `CALL update_produto_pizza (${pizza.id_produto}, '${pizza.nome}', ${pizza.preco}, '${pizza.foto}', ${pizza.id_categoria},
                                                    ${pizza.id_pizza}, ${pizza.desconto}, '${pizza.ingredientes}');`

        const result = await prisma.$executeRawUnsafe(sqlUpdate);

        if (result) {
            return true
        }

        else {
            return false
        }

    } catch (error) {
        
        return false;
        
    }

}

//função para remover um registro no BD
const deletePizza = async function (id) {

    let sql = `delete from tbl_pizza where id = ${id};`;

    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {

        return true;

    } else {

        return false;

    }

}

//função para retornar um registro
const selectPizza = async function (id) {

    let sql = `select tbl_produto.nome as nome_produto, tbl_produto.foto, tbl_produto.preco,
               tbl_pizza.id as id_pizza, tbl_pizza.desconto, tbl_pizza.qntd_favorito, tbl_pizza.ingredientes,
               tbl_categoria.nome as nome_categoria
               from tbl_produto
                   inner join tbl_categoria
                       on tbl_categoria.id = tbl_produto.id_categoria
                   inner join tbl_pizza
                       on tbl_produto.id = tbl_pizza.id_produto
               where tbl_pizza.id = ${id};`;

    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$queryRawUnsafe(sql);

    if (result) {

        return result;

    } else {

        return false;

    }

}

const selectPizzas = async function () {

    let sql = `select tbl_produto.id as id_produto, tbl_produto.foto, tbl_produto.nome as nome_produto, tbl_produto.preco,
               tbl_pizza.id as id_pizza, tbl_pizza.desconto, tbl_pizza.qntd_favorito, tbl_pizza.ingredientes,
               tbl_categoria.id as id_categoria, tbl_categoria.nome as nome_categoria
               from tbl_produto
                   inner join tbl_pizza
                       on tbl_produto.id = tbl_pizza.id_produto
                   inner join tbl_categoria
                       on tbl_categoria.id = tbl_produto.id_categoria
                   where tbl_produto.status_categoria = 1;`;

    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$queryRawUnsafe(sql);
    
    if (result.length > 0) {

        return result;

    } else {

        return false;

    }

}


const selectTodasPizzas = async function () {

    let sql = `select tbl_produto.id as id_produto, tbl_produto.foto, tbl_produto.nome as nome_produto, tbl_produto.preco,
               tbl_pizza.id as id_pizza, tbl_pizza.desconto, tbl_pizza.qntd_favorito, tbl_pizza.ingredientes,
               tbl_categoria.id as id_categoria, tbl_categoria.nome as nome_categoria
               from tbl_produto
                   inner join tbl_pizza
                       on tbl_produto.id = tbl_pizza.id_produto
                   inner join tbl_categoria
                       on tbl_categoria.id = tbl_produto.id_categoria`;

    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$queryRawUnsafe(sql);
    
    if (result.length > 0) {

        return result;

    } else {

        return false;

    }

}


const selectDiscountPizzas = async function () {

    let sql = `select tbl_produto.id as id_produto, tbl_produto.foto, tbl_produto.nome as nome_produto, tbl_produto.preco,
               tbl_pizza.id as id_pizza, tbl_pizza.desconto, tbl_pizza.qntd_favorito, tbl_pizza.ingredientes,
               tbl_categoria.id as id_categoria, tbl_categoria.nome as nome_categoria
               from tbl_produto
                   inner join tbl_pizza
                       on tbl_produto.id = tbl_pizza.id_produto
                   inner join tbl_categoria
                       on tbl_categoria.id = tbl_produto.id_categoria
               where tbl_pizza.desconto > 0 and tbl_produto.status_categoria = 1;`;

    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$queryRawUnsafe(sql);
           
    result.forEach(element => {
        let precoDescontado = element.preco - ((element.desconto * element.preco) / 100);

        element.preco_descontado = precoDescontado.toFixed(2)

    });

    if (result.length > 0) {

        return result;

    } else {

        return false;

    }

}

const selectFavoritePizzas = async function () {

    let sql = `select tbl_produto.id as id_produto, tbl_produto.foto, tbl_produto.nome as nome_produto, tbl_produto.preco,
               tbl_pizza.id as id_pizza, tbl_pizza.desconto, tbl_pizza.qntd_favorito, tbl_pizza.ingredientes,
               tbl_categoria.id as id_categoria, tbl_categoria.nome as nome_categoria
               from tbl_produto
                   inner join tbl_pizza
                       on tbl_produto.id = tbl_pizza.id_produto
                       inner join tbl_categoria
                       on tbl_categoria.id = tbl_produto.id_categoria
               where tbl_produto.status_categoria = 1
               order by tbl_pizza.qntd_favorito desc limit 6;`;

    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$queryRawUnsafe(sql);
    
    if (result.length > 0) {

        return result;

    } else {

        return false;

    }

}

const selectCategoryPizzas = async function (id) {

    let sql = `select tbl_produto.id as id_produto, tbl_produto.foto, tbl_produto.nome as nome_produto, tbl_produto.preco,
    tbl_pizza.id as id_pizza, tbl_pizza.desconto, tbl_pizza.qntd_favorito, tbl_pizza.ingredientes,
    tbl_categoria.id as id_categoria, tbl_categoria.nome as nome_categoria
    from tbl_produto
        inner join tbl_pizza
            on tbl_produto.id = tbl_pizza.id_produto
            inner join tbl_categoria
            on tbl_categoria.id = tbl_produto.id_categoria
    where tbl_produto.id_categoria = ${id};`;

    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0) {

        return result;

    } else {

        return false;

    }

}

//função para atualizar um registro no BD
const updatePizzaLikes = async function (pizza, id) {

    try {

        let sql = `update tbl_pizza set qntd_favorito = ${pizza.qntd_favorito} 
                   where id = ${id};`;

        const result = await prisma.$executeRawUnsafe(sql);

        if (result) {

            return true;
        }

        else {

            return false;

        }

    } catch (error) {
        
        return false;
        
    }

}

module.exports = {

    insertPizza,
    updatePizza,
    deletePizza,
    selectPizza,
    selectPizzas,
    selectTodasPizzas,
    selectDiscountPizzas,
    selectFavoritePizzas,
    selectCategoryPizzas,
    updatePizzaLikes
}