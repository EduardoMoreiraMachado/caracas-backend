const MESSAGE_ERROR = {
    REQUIRED_FIELDS   : 'Existe(m) campo(s) obrigatórios que deve(m) ser enviado(s)!',
    INVALID_EMAIL     : 'O email informado não é válido!',
    CONTENT_TYPE      : 'O cabeçalho da requisição não possui um content-type válido!',
    EMPTY_BODY        : 'O body da requisição deve haver um conteúdo!',
    NOT_FOUND_DB      : 'Não foram encontrados registros no banco de dados!',
    INTERNAL_ERROR_DB : 'Não foi possível realizar a operação com o Banco de Dados!',
    REQUIRED_ID       : 'O id do registro é obrigatório neste tipo de requisição',
    NOT_A_NUMBER      : 'Existe(m) campo(s) que necessita(m) de números como dado',
    LIMIT_EXCEEDED    : 'Existe(m) campo(s), cujo tamanho excede o limite.',
    INVALID_LOGIN     : 'Email ou senha incorreto(s).'
};

const MESSAGE_SUCESS = {
    INSERT_ITEM : 'Item criado com sucesso no banco de dados',
    UPDATE_ITEM : 'Item atualizado com sucesso no banco de dados',
    DELETE_ITEM : 'Item excluido com sucesso no banco de dados'
};

module.exports = {

    MESSAGE_ERROR,
    MESSAGE_SUCESS
    
}