const express = require('express');
const AuthController = require('../controllers/auth.controller');
const IdentifyUser = require('../middleware/auth.middleware');

const authRouter = express.Router()

authRouter.post('/register', AuthController.RegisterController)
authRouter.post('/login', AuthController.LoginController)
authRouter.post('/logout', AuthController.LogoutController)
authRouter.get('/profile', IdentifyUser, AuthController.ProfileController)
authRouter.get('/user', IdentifyUser, AuthController.AllUserDataFetch)
authRouter.get('/me', IdentifyUser, AuthController.userController)

authRouter.get('/user/:id', IdentifyUser, AuthController.uniqueUserFetch)




module.exports = authRouter;