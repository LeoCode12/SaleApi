const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    marca_producto: {
        type: String,
        required: true,
        maxlenght:50
    },
    descripcion_producto: {
        type: String,
        required: true
    },
    precio_producto: {
        type: Number,
        required: true
    },
    imagen_producto: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Producto',productoSchema)