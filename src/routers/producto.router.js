const express = require("express")
const createErrors = require("http-errors")

const Producto = require("../usercases/producto.usercase")
const authMiddleware = require('../midlewares/auth.midleware')

const router = express.Router()

// router.use(authMiddleware)

router.post('/', authMiddleware, async (request, response)=>{
    try{
        const newProducto = await Producto.createProducto(request.body)
        response.json({
            ok: true,
            message: 'Producto Creado',
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
    try {
        const productoAll = await Producto.getAll()
        response.json({
            ok: true,
            mesagge: "Mostrando todos los productos",
            allProducto: productoAll
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
    try {
        const updateProducto = await Producto.updateProducto(request.params.id, request.body)
        response.json({
            ok: true,
            message: 'Producto Actualizado',
            update: updateProducto
        })
    } catch (error) {
        response.json({
            ok: false,
            message: error.message
        })
    }
})

router.delete('/:id', authMiddleware, async(request, response)=>{
    try {
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
            delete: deleteProducto
        })
    } catch (error) {
        response.status(400)
        response.json({
            ok: false,
            message: error.message
        })
    }
})

module.exports = router