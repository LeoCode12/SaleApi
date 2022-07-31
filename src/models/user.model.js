const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    user_name:{
        type: String,
        required: true,
        minlenght: 3
    },
    email:{
        type: String,
        match:/^.*@.*\..*$/,
        required: true
    },
    alias:{
        type:String
    },
    password:{
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Users', userSchema)