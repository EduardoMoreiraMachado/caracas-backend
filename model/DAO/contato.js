//import da classe prismaClient que é responsável pelas interações com o BD
const { PrismaClient } = require('@prisma/client')

//instância da classe prismaClient
const prisma = new PrismaClient()

// Função para inserir um novo contato no banco de dados
const insertContato = async function(contato) {
    try {
        let dadosContato = contato

        let scriptSQL = `insert into tbl_contato (
                                                nome,
                                                email,
                                                telefone,
                                                celular,
                                                mensagem,
                                                id_opcao
                                                )
                                        values (
                                                '${dadosContato.nome}',
                                                '${dadosContato.email}',
                                                '${dadosContato.telefone}',
                                                '${dadosContato.celular}',
                                                '${dadosContato.mensagem}',
                                                '${dadosContato.id_opcao}'
                                                );`
                                                
        //execura o script SQL no BD ($executeRawUnsafe() permite encaminhar uma variável contendo o script)
        const result = await prisma.$executeRawUnsafe(scriptSQL)
        
        if (result)
            return true
        
        else
            return false
    }

    catch (error) {
        
        return false
    }
}

// Função para consultar uma mensagem no banco de dados
const selectContatoByID = async function(id) {
    try {
        let idContato = id

        let scriptSQL = `select tbl_contato.id as id_contato, tbl_contato.nome as nome_contato, tbl_contato.email, tbl_contato.telefone, tbl_contato.celular, tbl_contato.mensagem,
                                tbl_opcao.id as id_opcao, tbl_opcao.nome as nome_opcao

                         from   tbl_contato
                                inner join tbl_opcao
                                on		   tbl_contato.id_opcao = tbl_opcao.id
                         
                         where tbl_contato.id = ${idContato}`

        // Criação de objeto do tipo 'RecordSet' (rsAlunos), para receber os dados do DB, através do script SQL (select)
        const rsContato = await prisma.$queryRawUnsafe(scriptSQL)

        if (rsContato.length > 0)
            return rsContato
        
        else
            return false
    }

    catch(error) {
        return false
    }
}

// Função para consultar uma mensagem no banco de dados
const selectContatosByOpcao = async function(opcao) {
    try {
        let opcaoContato = opcao

        let scriptSQL = `select tbl_contato.id as id_contato, tbl_contato.nome as nome_contato, tbl_contato.email, tbl_contato.telefone, tbl_contato.celular, tbl_contato.mensagem,
                                tbl_opcao.id as id_opcao, tbl_opcao.nome as nome_opcao

                         from   tbl_contato
                                inner join tbl_opcao
                                on		   tbl_contato.id_opcao = tbl_opcao.id
                         
                         where tbl_contato.id_opcao = ${opcaoContato}`

        // Criação de objeto do tipo 'RecordSet' (rsAlunos), para receber os dados do DB, através do script SQL (select)
        const rsContato = await prisma.$queryRawUnsafe(scriptSQL)

        if (rsContato.length > 0)
            return rsContato
        
        else
            return false
    }

    catch(error) {
        return false
    }
}

// Função para consultar todas as mensagens do banco de dados
const selectAllContatos = async function() {
    try {
        let scriptSQL = `select tbl_contato.id as id_contato, tbl_contato.nome as nome_contato, tbl_contato.email, tbl_contato.telefone, tbl_contato.celular, tbl_contato.mensagem,
                                tbl_opcao.id as id_opcao, tbl_opcao.nome as nome_opcao

                         from   tbl_contato
                                inner join tbl_opcao
                                on		   tbl_contato.id_opcao = tbl_opcao.id
                                
                         order by tbl_contato.id desc`
                        
        const rsContato = await prisma.$queryRawUnsafe(scriptSQL)

        if (rsContato.length > 0)
            return rsContato
        
        else
            return false
    } 
    
    catch (error) {
        return false        
    }
}

//função para excluir um registro
const deleteContado = async function (id) {

    try {

        let sql = `delete from tbl_contato where id = ${id};`;

        const rsContato = await prisma.$queryRawUnsafe(sql);

        if (rsContato.length > 0) {

            return true;

        } else {

            return false;

        }

    } catch {

        return false;

    }

}

module.exports = {
    insertContato,
    selectContatoByID,
    selectAllContatos,
    selectContatosByOpcao,
    deleteContado
}
