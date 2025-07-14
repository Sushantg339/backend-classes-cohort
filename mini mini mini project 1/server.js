const express = require('express')
const app = express()
app.use(express.json()) // middleware(built-in) to get data at req.body


app.get('/' , (req , res) => {
    res.send('mini project start')
})

let notes = []

app.post('/notes' , (req , res) => {
    // console.log(req.body);
    let currentNote = req.body
    // console.log(currentNote)
    notes.push(currentNote)
    // console.log(notes)
    res.json(
        {
            message : "notes created successfully",
            notes : currentNote
        }
    )
})

app.get('/show-notes' , (req,res) => {
    res.send(notes)
})

app.delete('/delete/:index' , (req , res) =>{
    const index = req.params.index;

    delete notes[index]

    res.json({
        message : "note deleted successfully"
    })
})

app.patch('/update/:index' , (req,res) => {
    const index = req.params.index
    const {title} = req.body

    notes[index].title = title

    res.json({
        message : "notes updated successfully"
    })
})

app.listen(3000 , ()=>{
    console.log('sever is running on port 3000')
})  