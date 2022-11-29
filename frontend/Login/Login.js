var email = document.getElementById('email');
var pass = document.getElementById('passw');
var loginButton = document.getElementById('loginbutton');

loginButton.addEventListener('click', (e)=>{
    e.preventDefault();
    const obj = {
        email : email.value,
        pass : pass.value
    }
    console.log(obj);
    axios.post('http://localhost:3000/signin', obj).then((result) => {
        console.log(result);
        localStorage.setItem('token', result.data.token)
        localStorage.setItem('userDetail', {name:result.data.name, email:result.data.email})
        window.location.replace('../Expense/Expense.html')
    }).catch((err) => {
        console.log(err);
    });
})


