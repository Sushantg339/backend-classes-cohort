const express = require('express')
const app = express() // server created in this line

app.get('/' , (req , res) => {
    res.send('hii')
})

app.get('/home' , (req , res) => {
    res.send('home page h ye')
})

app.get('/about' , (req,res)=>{
    res.send('about pageeeeeee')
})

app.get('/contact' , (req,res)=>{
    res.send('contact kr mujhe')
})

app.listen(3000 , ()=>{
    console.log('server is running on port 3000')
}) // server started in this line