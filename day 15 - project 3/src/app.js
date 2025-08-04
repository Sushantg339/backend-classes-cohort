const express = require('express')
const connectToDB = require('./db/db')
const authRoutes = require('../src/routes/auth.routes')
const cookieParser = require('cookie-parser')
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use('/auth' , authRoutes)


module.exports = app