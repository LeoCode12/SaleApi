const express = require('express')
const createErrors = require('http-errors')

const Almacen = require('../usercases/almacen.usecase')
const User = require('../usercases/user.usercase')

const authMiddleware = require('../midlewares/auth.midleware')

const router = express.Router()

router.post('/', authMiddleware, async(request, response) =>{
    const {user} = request.query
    console.log(user);
    const infUser = await User.getUserById(user)
    try{
        let message
        let newAlmacen
        if (infUser.rol != 'Administrador') {
            message = 'No eres Administrador'
        }else if(infUser.rol == 'Administrador'){
            const data ={
                ...request.body,
                user: user
            }
            newAlmacen = await Almacen.createAlmacen(data)
            message = 'Almacen Creado'
        }
        response.json({
            ok: true,
            message: message,
            almacen: newAlmacen
        })
    }
    catch(error){
        response.status(400)
        response.json({
            ok: false,
            error: error.message
        })
    }
})

router.get('/', async(request, response)=>{
    const {user} = request.query
    try{
        let getAlmacen
        if(!user){
            getAlmacen = await Almacen.getAlmacenAll()
        }else if(!!user){
            getAlmacen = await Almacen.getAlmacenByIdUser(user)
        }
        response.json({
            ok: true,
            message: 'Mostrando Almacen',
            Almacenes: getAlmacen
        })
    }
    catch(error){
        response.status(400)
        response.json({
            ok: false,
            error: error.message
        })
    }
})

module.exports = router