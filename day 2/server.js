const express = require('express')
const server = express()

server.get('/' , (req , res)=>{
    res.send('backend started using express')
})

server.get('/home' , (req , res) => {
    res.send('welcome to home page')
})

server.get('/about' ,(req , res) => {
    res.send('about page')
})

server.listen(3000 , ()=>{
    console.log('server is running on port 3000')
})