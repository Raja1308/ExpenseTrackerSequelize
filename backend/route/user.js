const express = require("express")
const route = express.Router()
const userController = require('../Controller/user')

route.post('/signup', userController.postSign)

module.exports=route