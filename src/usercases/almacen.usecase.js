const Almacen = require('../models/almacen.model')
const errors = require('http-errors')

const createAlmacen = (data) => {
    const newAlmacen = new Almacen(data)

    const error = newAlmacen.validateSync()

    if(error){
        console.error("error:", error)
        throw new errors(400, 'validation failed')
    }

    return newAlmacen.save()
}

const getAlmacenAll = () => Almacen.find()

const getAlmacenById = (id) =>{
    const almacenFound = Almacen.findById(id)

    if(!almacenFound) throw new errors(404, 'Almacen no existe')

    return almacenFound
}

const updateAlmacen = (id, data) => {
    return Almacen.findByIdAndUpdate(id, data)
}

const deleteAlmacen = (id) => {
    const error = getAlmacenById(id)

    if(!error){
        throw new errors(404, 'Almacen no existe')
    }

    return Almacen.findByIdAndDelete(id)
}

const getAlmacenByIdUser = (id) => Almacen.find({user: id})

module.exports = {
    createAlmacen,
    getAlmacenAll,
    getAlmacenById,
    getAlmacenByIdUser,
    updateAlmacen,
    deleteAlmacen
}