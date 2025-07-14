const express = require('express')
const connectToDB = require('./src/db/db')
const noteModel = require('./src/models/note.model')

connectToDB()

const app = express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.post('/notes' , async (req , res) => {
    const {title , content} = req.body
    await noteModel.create({
        title , content
    })

    res.json({
        message : 'note Created successfully'
    })

})

app.get('/notes' , async (req , res) => {
    const notes = await noteModel.find()

    res.json({
        message : "notes fetched successfully",
        notes : notes
    })
})

app.delete('/notes/:id' , async (req,res) =>{
    const noteId = req.params.id
    await noteModel.findOneAndDelete({
        _id : noteId
    })

    res.json({
        message : "note deleted sucessfully"
    })
})

app.patch('/notes/:id' , async(req,res) => {
    const noteId = req.params.id
    const {title} = req.body
    await noteModel.findOneAndUpdate({
        _id : noteId ,
    },{   
        title : title
    })

    res.json({
        message : 'note updated successfully'
    })
})


app.listen(3000 , ()=>{
    console.log('server is running on port 3000')
})