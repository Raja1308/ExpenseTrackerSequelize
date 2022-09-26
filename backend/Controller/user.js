const user = require('../Model/user')
const bycrpt = require('bcrypt')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.postSign= async(req, res)=>{
 
 
  let userDetail  = req.body
  let existingUser = await user.findAll({where: {
    [Sequelize.Op.or]: [
      { email:userDetail.email },
      {phone:userDetail.phone }
    ]
  }}
    
  )
   console.log(existingUser)
  if(existingUser.length==0){
    const hashPassword = bycrpt.hashSync(userDetail.password,10)
    const hashConPass = bycrpt.hashSync(userDetail.confirmPassword,10)
    await user.create({
         name:userDetail.name,
         email:userDetail.email,
         phone:userDetail.phone,
         password:hashPassword,
         confirmpassword:hashConPass
      }).then(result=>{
        console.log(result)
        res.json({flag:true})
      })
      .catch(err=>{
        console.log("controller error",err)
      })
  }else{
    //console.log("Email already exists")
    res.json({flag:false});
  }
  
 
  // tableName.create()
  // 

}

