const jwt = require('../lib/jwt.lib')

function auth (request, response, next){
    try {
        const authorization = request.headers.authorization || ''
        const token = authorization.replace('Bearer ', '')
        const isValidToken = jwt.verify(token)
        console.log(isValidToken);
        next()
    } catch (error) {
        response.status(401)
        response.json({
            ok: false,
            message: error.message
        })
    }
}

module.exports = auth