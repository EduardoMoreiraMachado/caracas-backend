//import da classe prismaClient que é responsável pelas interações com o BD
const { PrismaClient } = require('@prisma/client');

//instância da classe prismaClient
const prisma = new PrismaClient();

//função para inserir um novo registro no BD
const insertCategoria = async function(categoria) {

    try {

        let sql = `insert into tbl_categoria(nome, codigo_tipo) values('${categoria.nome}', ${categoria.codigo_tipo})`;

        //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
        const result = await prisma.$executeRawUnsafe(sql);

        if (result) {

            return true;

        } else {

            return false;

        }

    } catch (error) {

        return false;

    }

}

//função para remover um registro no BD
const updateStatusCategoria = async function (status, id) {

    let sql = `update tbl_categoria set status_categoria = ${status} where id = ${id};`;

    //execura o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {

        return true;

    } else {

        return false;

    }

}

//função para retornar todos os registros do BD 
const selectAllCategorias = async function (tipo) {

    //objeto do tipo RecordSet (rsCategorias) para receber os dados do BD
    const rsCategorias = await prisma.$queryRaw`select * from tbl_categoria where codigo_tipo like ${tipo}`;

    if (rsCategorias.length > 0) {

        return rsCategorias;

    } else {

        return false;

    }

}

module.exports = {

    insertCategoria,
    updateStatusCategoria,
    selectAllCategorias

}