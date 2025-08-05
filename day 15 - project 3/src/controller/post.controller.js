const postModel = require('../models/post.model')
const generateCaption = require('../services/ai.service')
const createPostController = async (req,res) => {
    const file = req.file

    const base64ImageFile = new Buffer.from(file.buffer).toString('base64')

    const caption = await generateCaption(base64ImageFile)

    res.json({
        caption 
    })
}

module.exports = {
    createPostController
}