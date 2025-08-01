const express = require('express')
const app = express()
const indexRoutes = require('./routes/index.routes')

app.use((req,res,next)=>{
    console.log('this middleware is between app and route')
    next()
})

app.use('/' , indexRoutes)

module.exports = app