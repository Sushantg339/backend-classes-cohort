const express = require('express')
const app = express()

app.get('/' , (req , res)=>{
    res.send('hello world')
})

app.listen(3000 , ()=>{
    console.log('sever is running on port 3000')
})