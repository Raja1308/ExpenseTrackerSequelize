const user = require('../Model/user')
const bycrpt = require('bcrypt')
const Sequelize = require('sequelize')
const JWT = require('jsonwebtoken')
const Op = Sequelize.Op
const dummyToken = 'lkefhltfyowfgdf'

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
  
}

exports.postLogin = async (req, res) => {
  let email = req.body.email;
  let pass = req.body.pass;
  let userData = await user.findAll({where : { email : email }});
  console.log(userData[0].name);
  if(userData.length > 0){
    let username = userData[0].name;
    let hashpassword = userData[0].password;
    let id = userData[0].id;
    let email = userData[0].email;
    let match = await bycrpt.compare(pass, hashpassword);
    if(match){
      let token = JWT.sign(id, dummyToken);
      res.send({name:username, email:email, token:token}); 
    }
    else{
       console.log('Password does not match');
    }
  }
  else{
   console.log("Email doesn't exists")
  }
}

