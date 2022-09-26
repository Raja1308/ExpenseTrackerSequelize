const express = require("express")
const app = express();
const bodyparser = require('body-parser');
const cors = require("cors");
const sequelize = require('./util/database')
const userRoute = require('./route/user')
// midleware
app.use(bodyparser.json());
app.use(cors());
//route
app.use(userRoute)


sequelize.sync().then((result) => {
   app.listen(3000);
}).catch(err=>{
    console.log("conection error:", err)
})
