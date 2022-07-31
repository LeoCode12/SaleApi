const express = require('express')
const cors = require('cors')

const productoRouter = require("./routers/producto.router")
const userRouter = require('./routers/user.router')
const authRouter = require('./routers/auth.router')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/producto', productoRouter)
app.use('/user', userRouter)
app.use('/auth', authRouter)

app.get('/', (request, response) =>{
    response.json({
        ok: true,
        message: 'Sale App APIV1'
    })
})

module.exports = app