//import da classe prismaClient que é responsável pelas interações com o BD
const { PrismaClient } = require('@prisma/client');

//instância da classe prismaClient
const prisma = new PrismaClient();

//função para inserir registros
const insertBebida = async function (bebida) {

    try {

        let insertProduto = `insert into tbl_produto(
                                           nome,
                                           preco,
                                           foto,
                                           codigo_tipo,
                                           id_categoria
                                           )
                                           values
                                           (
                                               '${bebida.nome}',
                                               ${bebida.preco},
                                               '${bebida.foto}',
                                               2,
                                               '${bebida.id_categoria}'
                                           )`;

        //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
        const resultProduto = await prisma.$executeRawUnsafe(insertProduto);

        if (resultProduto) {
            let selectLastID = `select id from tbl_bebida order by id desc limit 1`

                const resultSelect = await prisma.$queryRawUnsafe(selectLastID)
                console.log(resultSelect)

                if(resultSelect.length > 0) {
                    let updateBebida = `update tbl_bebida set peso_liquido = ${bebida.peso_liquido} where id = ${resultSelect[0].id}`

                    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
                    const resultBebida = await prisma.$executeRawUnsafe(updateBebida);

                    if (resultBebida) {
                        return true;
                    }

                    else {
                        return false
                    }
                }

                else {
                    return false
                }

        } else {

            return false;

        }

    } catch (error) {

        return false;

    }

}

//função para atualizar um registro no BD
const updateBebida = async function (bebida) {

    try {
        let sqlUpdate = `CALL update_produto_bebida (${bebida.id_produto}, '${bebida.nome}', ${bebida.preco}, '${bebida.foto}', ${bebida.id_categoria},
                                                    ${bebida.id_bebida}, ${bebida.peso_liquido});`

        const result = await prisma.$executeRawUnsafe(sqlUpdate);
            
        if (result) {
            return true
        }

        else {
            return false
        }
    }

    catch (error) {
        
        return false;
        
    }

}

//função para remover um registro no BD
const deleteBebida = async function (id) {

    let sql = `delete from tbl_bebida where id = ${id};`;

    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {

        return true;

    } else {

        return false;

    }

}

//função para retornar um registro
const selectBebida = async function (id) {

    let sql = `select tbl_produto.id as id_produto, tbl_produto.foto, tbl_produto.nome as nome_produto, tbl_produto.preco,
               tbl_bebida.peso_liquido, tbl_bebida.id as id_bebida,
               tbl_categoria.nome as nome_categoria
               from tbl_produto
                   inner join tbl_categoria
                       on tbl_categoria.id = tbl_produto.id_categoria
                   inner join tbl_bebida
                       on tbl_produto.id = tbl_bebida.id_produto
               where tbl_produto.id = ${id};`;

    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$queryRawUnsafe(sql);

    if (result.length > 0) {

        return result;

    } else {

        return false;

    }

}

//funçao para retornar todos os registros do BD
const selectAllBebidas = async function () {

    try {

        let sql = `select tbl_produto.id as id_produto, tbl_produto.nome, tbl_produto.preco, tbl_produto.foto, tbl_produto.id_categoria as id_categoria,
                   tbl_bebida.peso_liquido, tbl_bebida.id as id_bebida,
                   tbl_categoria.nome as nome_categoria
                   from tbl_produto
                       inner join tbl_categoria
                           on tbl_categoria.id = tbl_produto.id_categoria
                       inner join tbl_bebida
                           on tbl_produto.id = tbl_bebida.id_produto;`;
                        
        const rsBebidas = await prisma.$queryRawUnsafe(sql);

        if (rsBebidas.length > 0) {

            return rsBebidas;

        } else {

            return false;

        }

    } catch (error) {

        return false;   

    }
}

//funçao para retornar uma bebida por categoria
const selectCategoryBebidas = async function (id) {

    try {

        let sql = `select tbl_produto.id as id_produto, tbl_produto.nome, tbl_produto.preco, tbl_produto.foto, tbl_produto.id_categoria as id_categoria,
                   tbl_bebida.peso_liquido, tbl_bebida.id as id_bebida,
                   tbl_categoria.nome as nome_categoria
                   from tbl_produto
                       inner join tbl_categoria
                           on tbl_categoria.id = tbl_produto.id_categoria
                       inner join tbl_bebida
                           on tbl_produto.id = tbl_bebida.id_produto
                    where tbl_produto.id_categoria = ${id};`;
                        
        const rsBebidas = await prisma.$queryRawUnsafe(sql);

        if (rsBebidas.length > 0) {

            return rsBebidas;

        } else {

            return false;

        }

    } catch (error) {

        return false;   

    }
}

module.exports = {

    insertBebida,
    updateBebida,
    deleteBebida,
    selectBebida,
    selectAllBebidas,
    selectCategoryBebidas

}