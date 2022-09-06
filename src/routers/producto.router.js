const express = require("express")
const createErrors = require("http-errors")

const Producto = require("../usercases/producto.usercase")
const User = require('../usercases/user.usercase')
const authMiddleware = require('../midlewares/auth.midleware')

const router = express.Router()

// router.use(authMiddleware)

router.post('/', authMiddleware, async (request, response)=>{
    const {user} = request.query
    const infUser = await User.getUserById(user)
    try{
        let newProducto
        let message
        if(infUser.rol != 'Administrador'){
            message = 'No eres Administrador'
        }else if(infUser.rol == 'Administrador'){
            const data={
                ...request.body,
                user: user
            }
            newProducto = await Producto.createProducto(data)
            message = 'Producto Creado'
        }
        response.json({
            ok: true,
            message: message,
            producto: newProducto
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
    try {
        let getProductos
        if(!user){
            getProductos = await Producto.getAll()
        }else if(!!user){
            getProductos = await Producto.getProductoByIdUser(user)
        }

        response.json({
            ok: true,
            mesagge: "Mostrando todos los productos",
            productos: getProductos
        })
    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.get('/:id', async(request, response)=>{
    try {
        const productoById = await Producto.getById(request.params.id)
        if(!productoById){
            throw new createErrors(404, "Producto Not Found")
        }
        response.json({
            ok: true,
            message: "Producto Obtenido",
            productoById: productoById
        })
    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.patch('/:id', authMiddleware, async(request, response) =>{
    const {user} = request.query
    const infUser = await User.getUserById(user)
    try {
        if(infUser.rol != 'Administrador'){
            response.json({
                ok: true,
                message: 'No eres Administrador'
            })
        }else if(infUser.rol == 'Administrador'){
            const updateProducto = await Producto.updateProducto(request.params.id, request.body)
            response.json({
                ok: true,
                message: 'Producto Actualizado',
                update: updateProducto
            })
        }
    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.delete('/:id', authMiddleware, async(request, response)=>{
    const {user} = request.query
    const infUser = await User.getUserById(user)
    try {
        if (infUser.rol != 'Administrador') {
            response.json({
                ok: false,
                message: 'No eres Administrador'
            })
        }else if(infUser.rol == 'Administrador'){
            const deleteProducto = await Producto.deleteProducto(request.params.id)
        
            if(!deleteProducto){
                response.status(404, 'Producto Not Found')
                response.json({
                    ok:false,
                    message: deleteProducto
                })
            }
            response.json({
                ok: true,
                message: 'Producto Eliminado',
                deleteProducto: deleteProducto
            })
        }
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

module.exports = router