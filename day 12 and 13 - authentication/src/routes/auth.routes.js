const express = require('express')
const router = express.Router()
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')


router.post('/register' , async (req,res)=>{
    const {username , password} = req.body

    const user = await userModel.create({
        username ,
        password
    })


    const token = jwt.sign({
        id : user._id,

    },process.env.JWT_SECRET)

    res.cookie('token' , token)


    res.status(201).json({
        message : 'user registered successfully',
        user,
        token
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

router.get('/user', async (req,res)=>{
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({
            message : "unauthorised access. Invalid Token"
        })
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
    
        const user = await userModel.findOne({
            _id : decoded.id
        }).select('-password -__v' )

        res.status(200).json({
            message : "user data fetched successfully",
            user
        })
        
    } catch (error) {
        return res.status(401).json({
            message : "unauthorised - invalid token"
        })
    }


})


module.exports = router