const mongoose = require('mongoose');

const almacenSchema = mongoose.Schema({
    warehouseTyoe:{
        type: String,
        required: true
    },
    warehouseName:{
        type: String,
        required: true
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
})

module.exports = mongoose.model('Almacen', almacenSchema)