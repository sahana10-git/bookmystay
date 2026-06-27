const express = require('express')
const authRouter = express.Router()
const authController = require('../controllers/auth.controller')

authRouter.route('/signUp')
  .post(authController.signUp)

authRouter.route('/login')
.post(authController.login)

module.exports = authRouter