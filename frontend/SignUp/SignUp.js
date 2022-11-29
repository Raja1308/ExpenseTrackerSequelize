var uname = document.getElementById("name");
var mobileNum = document.getElementById("mobile");
var email = document.getElementById("email");
var passw = document.getElementById("passw");
var confirmPassw = document.getElementById("confirmpassw");
var regButton = document.getElementById("regbutton");

regButton.addEventListener('click',(e)=>{
    e.preventDefault();
    const obj = {
        name : uname.value,
        phone : mobileNum.value,
        email : email.value,
        password : passw.value,
        confirmPassword : confirmPassw.value
    }
    console.log(obj);
    axios.post('http://localhost:3000/signup',obj).then(res=>{
        console.log(res.data);
       showAlert(res.data.flag)
    })
})

function showAlert(flag){
  if(flag){
    alert("user created")
  }else{
    alert("user already exist")
  }
}


