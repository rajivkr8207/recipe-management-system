const Usermodel = require("../models/user.model");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const RegisterController = async (req, res) => {
    const { fullname, username, email, password } = req.body
    console.log(fullname, username, email, password);
    // const isUseralreadyexist = await Usermodel.findOne({ username })

    // if (isUseralreadyexist) {
    //     return res.status(409).json({
    //         message: 'user is already exist'
    //     })
    // }
    const hashPassword = await bcrypt.hash(password, 10)


    const user = await Usermodel.create({
        username,
        fullname,
        email,
        password: hashPassword,
    })

    return res.status(201).json({
        message: "user Register successfully",
        user: {
            fullname: user.fullname,
            email: user.email
        }
    })
}



const LoginController = async (req, res) => {
    const { username, email, password } = req.body

    const isUseralreadyexist = await Usermodel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select('+password')
    if (!isUseralreadyexist) {
        return res.status(409).json({
            message: 'user is  not exist'
        })
    }

    const isPassword = await bcrypt.compare(password, isUseralreadyexist.password)
    if (!isPassword) {
        return res.status(409).json({
            message: 'invalid credintial'
        })
    }
    const token = jwt.sign({ id: isUseralreadyexist._id }, process.env.JWT_SECRET, { expiresIn: "3d" })
    res.cookie('recipetoken', token,
        {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
    )
    return res.status(200).json({
        message: "user login successfully",
        token,
        user: {
            _id: isUseralreadyexist._id,
            username: isUseralreadyexist.username,
            email: isUseralreadyexist.email,
            fullname: isUseralreadyexist.fullname,
        }
    })
}


const ProfileController = async (req, res) => {
    const user = await Usermodel.findOne({ _id: req.user.id })
    return res.status(200).json({
        message: "profile fetch successfully",
        user
    })
}
const userController = async (req, res) => {
    return res.status(200).json({ user: req.user });
}

const LogoutController = (req, res) => {
    res.clearCookie('recipetoken');
    res.status(200).json({
        message: "Logout successful"
    });
}

const AllUserDataFetch = async (req, res) => {
    const allUser = await Usermodel.find()
    return res.status(200).json({
        message: "all user is fetch",
        allUser: allUser
    })
}

const uniqueUserFetch = async (req, res) => {
    const id = req.params.id
    const uniqueUser = await Usermodel.findOne({
        _id: id
    })
    return res.status(200).json({
        message: "user is fetch",
        user: uniqueUser
    })
}

module.exports = {
    RegisterController,
    LoginController,
    ProfileController,
    LogoutController,
    AllUserDataFetch,
    uniqueUserFetch,
    userController
}