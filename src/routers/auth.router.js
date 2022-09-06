const express = require('express')
const createError = require('http-errors')

const user = require('../usercases/user.usercase')

const router = express.Router()


router.post('/login', async(request, response)=>{
    try {
        const {email, password} = request.body
        
        if(!email) throw new createError(400, 'Email is required')
        if(!password) throw new createError(400, 'Password is required')
        
        const data = await user.login(email, password)
        const {token, id} = data
 
        response.json({
            ok: true,
            message: "Datos de usuario",
            user: {token, id}
            
        })
        
    } catch (error) {
        response.status(error.status, 500)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

module.exports = router