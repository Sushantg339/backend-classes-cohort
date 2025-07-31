const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
const songRoutes = require('./routes/song.routes')

app.use('/' , songRoutes)


module.exports = app