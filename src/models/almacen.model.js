const mongoose = require('mongoose')
user = require('./user.model')

const almacenSchema = mongoose.Schema({
    warehouseType:{
        type: String,
        required: true
    },
    warehouseName:{
        type: String,
        required: true
    },
    warehouseStatus:{
        type: Boolean,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('Almacen', almacenSchema)