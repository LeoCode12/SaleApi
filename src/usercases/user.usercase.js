const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const errors = require('http-errors')

const jwt = require('../lib/jwt.lib')


async function login (email, password){
    const userFound = await User.findOne({email})
    if(!userFound){
        throw new createdError(401, 'Invalid data')
    }

    const isValidPassword = await bcrypt.compare(password, userFound.password)
    if(!isValidPassword){
        throw new createdError(401, 'Invalid data')
    }

    //Expedir token
    return {
        token: jwt.sign({id: userFound._id}),
        id : userFound._id
    }
}


async function createUser(userData) {
    const userFound = await User.findOne({email: userData.email})
    if(userFound){
        throw new errors(432, 'User already exists')
    }

    const hash = await bcrypt.hash(userData.password, 10)
    userData.password = hash
    return User.create(userData)
}

const getUserAll = () =>{
    return User.find()
}

const getUserById = (id) =>{
    const userFound = User.findById(id)

    if(!userFound){
        throw new error(404, 'User Not Found')
    }
    return userFound
}

const updateUser = (id, data) =>{
    return User.findByIdAndUpdate(id, data)
}

const deleteUser = (id) => {
    const userFound = User.findById(id)
    if(!userFound){
        throw new errors(404, 'User Not Found')
    }
    return userFound.findOneAndDelete(id)
}

module.exports = {
    createUser,
    getUserAll,
    getUserById,
    updateUser,
    deleteUser,
    login
}