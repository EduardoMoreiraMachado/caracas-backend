const jwt = require('jsonwebtoken')

const SECRET = 'eduardo'

// tempo para valida
const EXPIRES = 86400

const createJWT = async function(payload) {
    // Gerar o token
        // payload: identificação do usuário autenticado (o ID)
        // SECRET: chave secreta
        // expiresIn: tempo de experação do token
    const token = jwt.sign({userID: payload}, SECRET, {expiresIn: EXPIRES})

    return token
}

// Validação de autenticidade do JWT (recebe o token para validação)
const validateJWT = async function(token) {
    let status

    // valida a autenticidade do token
        // decode: serve para pegar outras informações do token (ID, secret, expires)
    jwt.verify(token, SECRET, async function (erro, decode) {
        if(erro)
            status = false

        else
            status = true
    })

    // retorno fora do callback, porque é da função validate
        // se der erro (não for autenticado), o retorno é falso, se não, é verdadeiro
    return status
}

module.exports = {
    createJWT,
    validateJWT
}