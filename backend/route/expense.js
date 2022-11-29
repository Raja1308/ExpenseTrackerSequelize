const express = require("express")
const route = express.Router()
const expenseController = require('../Controller/expense')
const authorization = require('../authorization/authorization')

route.post('/home', authorization.authenticateToken,expenseController.postExpense)
//route.post('/signin', userController.postLogin)

route.get('/getAllExpense', authorization.authenticateToken,expenseController.getAllExpense)

route.post('/delExpense/:tdID', authorization.authenticateToken,expenseController.delExpense)

module.exports=route

