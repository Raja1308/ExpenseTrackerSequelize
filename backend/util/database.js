const Sequelize = require('sequelize')

const sequelize = new Sequelize('expense','root','9301125rj', {
    dialect: 'mysql',
    host:'localhost'
})

module.exports = sequelize;  