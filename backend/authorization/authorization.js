const user = require('../Model/user');
const JWT = require('jsonwebtoken')
const dummyToken = 'lkefhltfyowfgdf'


exports.authenticateToken = async(req,res,next) => {
    let  token = req.header('authorization')
    // console.log("authencticate user:",token)
    const userId = JWT.verify(token,dummyToken)
    // console.log(userId)
    user.findByPk(userId).then(user=>{
        // console.log(result)
        req.user = user
        next();
    })
}