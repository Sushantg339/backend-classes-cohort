const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.get('/',(req,res)=>{
    res.send('hello bhaisahab')
})

module.exports = app