const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
        message: "unauthorised access",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({
        _id: decoded.id,
        });

        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
        message: "token invalid",
        });
    }

};

module.exports = authMiddleware;
