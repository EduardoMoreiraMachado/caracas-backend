//import da classe prismaClient que é responsável pelas interações com o BD
const { PrismaClient } = require('@prisma/client');

//instância da classe prismaClient
const prisma = new PrismaClient();

//função para inserir um novo registro no BD
const insertServico = async function (servico) {

    try {

        let sql = `insert into tbl_servico(
                                           nome,
                                           foto,
                                           descricao 
                                           )
                                            values
                                           (
                                           '${servico.nome}',
                                           '${servico.foto}',
                                           '${servico.descricao}'
                                           );
                                           `;
                        
        //execura o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
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

//função para atualizar um registro no BD
const updateServico = async function (servico) {

    try {

        let sql = `update tbl_servico set nome = '${servico.nome}',
                                          foto = '${servico.foto}',
                                          descricao = '${servico.descricao}'
                                          where id = ${servico.id};`;

        //execura o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
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
const deleteServico = async function (id) {

    let sql = `delete from tbl_servico where id = ${id};`;

    //execura o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {

        return true;

    } else {

        return false;

    }

}

//função para retornar um registro
const selectServico = async function (id) {

    //objeto do tipo RecordSet (rsCliente) para receber os dados do BD
    const rsCliente = await prisma.$queryRaw`select * from tbl_servico where id = ${id}`;
console.log(rsCliente);
    if (rsCliente.length > 0) {

        return rsCliente;

    } else {

        return false;

    }

}

//função para retornar todos os registros do BD 
const selectAllServicos = async function () {

    //import da classe primaClient que é responsável pelas interações com o BD
    const { PrismaClient } = require('@prisma/client');

    //instãncia da classe prismaClient
    const prisma = new PrismaClient();

    //objeto do tipo RecordSet (rsCategorias) para receber os dados do BD
    const rsServicos = await prisma.$queryRaw`select * from tbl_servico order by id desc`;

    if (rsServicos.length > 0) {

        return rsServicos;

    } else {

        return false;

    }

}

module.exports = {

    insertServico,
    updateServico,
    deleteServico,
    selectServico,
    selectAllServicos

}
