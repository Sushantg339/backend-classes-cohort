const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect('mongodb+srv://sushantcareer1:OpU600NBtoTugx8d@cohort-backend.czui1db.mongodb.net/cohort')
    .then(()=>{
        console.log('connected to db')
    })
}

module.exports = connectToDB