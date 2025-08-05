const postModel = require('../models/post.model');
const generateCaption = require('../services/ai.service');
const uploadFile = require('../services/storage.service');
const { v4: uuidv4 } = require('uuid');

const createPostController = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const base64ImageFile = Buffer.from(file.buffer).toString('base64');
        const caption = await generateCaption(base64ImageFile);

        const result = await uploadFile(file.buffer, `${uuidv4()}`);

        const post = await postModel.create({
            caption,
            image: result.url,
            user: req.user.id
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = {
    createPostController
};
