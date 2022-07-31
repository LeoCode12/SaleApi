const express = require('express')
const errors = require('http-errors')
const user = require('../usercases/user.usercase')
const authMiddleware = require('../midlewares/auth.midleware')

const router = express.Router()

router.post('/', async(request, response)=>{
    try {
        const createUser = await user.createUser(request.body)
        response.json({
            ok:true,
            message: 'Created User',
            User: createUser
        })
    } catch (error) {
        response.status(500)
        response.json({
            ok: false,
            message: error.message
        })
        console.log(error.message);
    }
})


router.get('/', async(request, response)=>{
    try {
        const getAllUser = await user.getUserAll()
        response.json({
            ok: true,
            message: 'Mostrando todos los usuarios',
            users: getAllUser
        })
    } catch (error) {
        response.status(500)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.get('/:id', async(request, response)=>{
    try {
        const getUserById = await user.getUserById(request.params.id)
        response.json({
            ok:true,
            message: 'Mostrando usuario',
            user: getUserById
        })
    } catch (error) {
        response.status(500)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.patch('/:id',authMiddleware, async(request, response)=>{
    try {
        const updateUser = await user.updateUser(request.params.id, request.body)
        response.json({
            ok: true,
            message: 'Usuario actualizado',
            user: updateUser
        })
    } catch (error) {
        response.status(500)
        response.json({
            ok:false,
            message: error.message
        })
    }
})

router.delete('/:id', authMiddleware, async(request, response) =>{
    try {
        const deleteUser = await user.deleteUser(request.params.id)
        response.json({
            ok: true,
            message: 'Usuario eliminado',
            user: deleteUser
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok:false,
            message: error.message
        })
    }
})

module.exports = router