//import da classe prismaClient que é responsável pelas interações com o BD
const { PrismaClient } = require('@prisma/client');

//instância da classe prismaClient
const prisma = new PrismaClient();

//função para inserir um novo registro no BD
const insertCliente = async function (cliente) {

    try {

        let sql = `insert into tbl_adm(
                                       nome,
                                       email,
                                       senha 
                                       )
                                       values
                                       (
                                           '${cliente.nome}',
                                           '${cliente.email}',
                                           md5('${cliente.senha}')
                                       );
                                       `;
                        
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

//função para atualizar um registro no BD
const updateCliente = async function (cliente) {

    try {

        let sql = `update tbl_adm set nome = '${cliente.nome}',
                                      email = '${cliente.email}',
                                      senha = md5('${cliente.senha}')
                                      where id = ${cliente.id};`;

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
const deleteCliente = async function (id) {

    let sql = `delete from tbl_adm where id = ${id};`;

    //executa o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {

        return true;

    } else {

        return false;

    }

}

//função para validar o login 
const selectCliente = async function (email, senha) {

    let sql = `select * from tbl_adm where email = '${email}' and senha = md5('${senha}');`
    //objeto do tipo RecordSet (rsCliente) para receber os dados do BD
    const rsCliente = await prisma.$queryRawUnsafe(sql);

    if (rsCliente.length > 0) {

        return rsCliente;

    } else {

        return false;

    }

}



module.exports = {

    insertCliente,
    updateCliente,
    deleteCliente,
    selectCliente

}
