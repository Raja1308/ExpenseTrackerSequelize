const Expense = require('../Model/expense')
const user = require('../Model/expense')
exports.postExpense =(req,  res)=>{
    console.log("hello world")
    let expense = req.body
    console.log(expense)
    // magic function
    req.user.createExpense({
        amount:req.body.amount,
        category:req.body.category,
        description:req.body.description
    }).then(result=>{
      res.send({result, msg:"expense add"})
    }).catch(err=>{
        console.log(err)
    })
}
// exports.postExpense =(req,  res)=>{
//     console.log("hello world")
//     let expense = req.body
//     console.log(req.user.id)

//     Expense.create({
//         amount:req.body.amount,
//         category:req.body.amount,
//         description:req.body.description,
//         userId:req.user.id
//     })
// }

exports.getAllExpense = async(req, res) => {
    await req.user.getExpenses().then((result) => {
        //console.log(result);
        res.send({result});
    }).catch((err) => {
        console.log(err);
    });
}

exports.delExpense = (req, res) => {
    console.log('del', req.params.tdID);
    Expense.destroy({where : {id : req.params.tdID}}).then((result) => {
        res.send({msg : 'Item is deleted'});
    }).catch((err) => {
        console.log(err);
    });
}