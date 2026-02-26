const jwt = require('jsonwebtoken')


async function IdentifyUser(req, res, next) {
    const token = req.cookies.recipetoken
    if (!token) {
        return res.status(401).json({
            message: "token not found",
        })
    }
    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: 'user is unautorise'
        })
    }
    req.user = decoded
    next()
}

module.exports = IdentifyUser;