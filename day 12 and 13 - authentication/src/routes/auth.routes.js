const express = require('express')
const router = express.Router()
const userModel = require('../models/user.model')


router.post('/register' , async (req,res)=>{
    const {username , password} = req.body
    const user = await userModel.create({
        username ,
        password
    })

    res.status(201).json({
        message : 'user registered successfully',
        user
    })
})

router.post('/login' , async (req,res)=>{
    const {username , password} = req.body
    const user = await userModel.findOne({
        username
    })

    if(!user){
        return res.status(401).json({
            message : 'invalid username'
        })
    } 

    const isPasswordValid = (password ===  user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message : 'password invalid'
        })
    }

    res.status(200).json({
        message : 'login successfull'
    })
})



module.exports = router