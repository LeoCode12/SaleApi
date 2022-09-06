const errors = require('http-errors')
const Producto = require("../models/producto.model")

const createProducto = (newData)=>{
    const newProducto = new Producto(newData)   

    const error = newProducto.validateSync()

    if(error){
        console.error("error: ",error)
        throw new errors(400, 'validation failed')
    }

    return newProducto.save()
}

const getAll = () =>  Producto.find()

const getById = (id) =>  {
    const productoFound = Producto.findById(id)
    if(!productoFound){
        throw new errors(404, 'Producto Not Found')
    }
    return productoFound
}

const getProductoByIdUser = (id) =>{
    return Producto.find({user: id})
}

const updateProducto = (id, newData) => {
    return Producto.findByIdAndUpdate(id, newData)
}

const deleteProducto = (id) => {

    const error = Producto.findById(id)

    if(!error){
        throw new errors(404, 'Producto Not Found')
    }

    return Producto.findOneAndDelete(id)
}

module.exports = {
    createProducto,
    getAll,
    getById,
    updateProducto,
    deleteProducto,
    getProductoByIdUser
}