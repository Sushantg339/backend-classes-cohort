const express = require('express')
const authRoutes = require('../src/routes/auth.routes')
const postRoutes = require('./routes/post.routes')
const cookieParser = require('cookie-parser')
const app = express()


app.use(express.json())
app.use(cookieParser())
app.use('/api/auth' , authRoutes)
app.use('/api/posts' , postRoutes)


module.exports = app