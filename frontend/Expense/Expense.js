var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var tab = document.getElementById('tab');
var token = localStorage.getItem('token');

// Form submit event
form.addEventListener('submit', saveItem);
// Delete event
tab.addEventListener('click', delItem);
// Window event
window.addEventListener('DOMContentLoaded', () => {
  axios.get('http://localhost:3000/getAllExpense', {headers:{'authorization':token}}).then((res) => {
    var getAllExp = res.data.result;
    for(var x=0; x<getAllExp.length; x++){
      let expenseID = getAllExp[x].id;
      let amount = getAllExp[x].amount;
      let category = getAllExp[x].category;
      let desc = getAllExp[x].description;
      display(amount, category, desc, expenseID);
    }
  }).catch((err) => {
    console.log(err);
  });
} )

// Add item
function addItem(e){
    e.preventDefault();

    // // Get input value
    // var input = document.getElementById('inpText').value;
    // console.log(input);

    // // Create li element
    // var li = document.createElement('li');

    // // Add class to li
    // li.className = 'list-group-item';

    // // Add text node with input value
    // li.appendChild(document.createTextNode(input));

    // // Create delete button
    // var delBtn = document.createElement('button');

    // // Add class to delete button
    // delBtn.className = 'btn btn-danger btn-sm float-right delete';

    // // Add text node to delete button
    // delBtn.appendChild(document.createTextNode('X'));

    // // Append delete button to li
    // li.appendChild(delBtn);

    // // Append li to list
    // itemList.appendChild(li);

    // Get category
    var catg = document.getElementById('catg').value;
    
    // Get amount
    var amt = document.getElementById('amt').value;
   
    // Get descripton
    var desc = document.getElementById('desc').value;

    // Create tr element
    var tr = document.createElement('tr');

    // Create Ist td element
    var td1 = document.createElement('td');

    // Add text node into td1
    td1.appendChild(document.createTextNode(catg));

    // Create IInd td element
    var td2 = document.createElement('td');

    // Add text node into td2
    td2.appendChild(document.createTextNode(amt));

    // Create IIIrd td element
    var td3 = document.createElement('td');

    // Add text node into td1
    td3.appendChild(document.createTextNode(desc));

    // Create IVth td element
    var td4 = document.createElement('td');

    // Create delete button
    var delBtn = document.createElement('button');

    // Add class to delete button
    delBtn.className = 'btn btn-danger btn-sm delete';

    // Add text node to delete button
    delBtn.appendChild(document.createTextNode('X'));

    // Append delete button into td4 
    td4.appendChild(delBtn);

    // Append td1 into tr 
    tr.appendChild(td1);

    // Append td2 into tr 
    tr.appendChild(td2);

    // Append td3 into tr 
    tr.appendChild(td3);

    // Append td4 into tr 
    tr.appendChild(td4);

    // Append tr into table 
    tab.appendChild(tr);

}

function saveItem(e){
      e.preventDefault();
      // Get category
      var catg = document.getElementById('catg').value;
    
      // Get amount
      var amt = document.getElementById('amt').value;
     
      // Get descripton
      var desc = document.getElementById('desc').value;

      const item = {
        category : catg,
        amount : amt,
        description : desc
      }
      console.log(item);
      axios.post('http://localhost:3000/home',item, {headers:{'authorization':token}}).then((result) => {
        console.log(result);
        let expId = result.data.result.id;
        let amount = result.data.result.amount;
        let category = result.data.result.category;
        let description = result.data.result.description;
        display(amount, category, description, expId);
      }).catch((err) => {
        console.log("axios:",err);
      });
}

function display(amt, catg, desc, expId){
  
  document.getElementById('catg').value = '';
  document.getElementById('amt').value = '';
  document.getElementById('desc').value = '';

  // Create tr element
  var tr = document.createElement('tr');

  // Create Ist td element
  var td1 = document.createElement('td');

  // Add text node into td1
  td1.appendChild(document.createTextNode(catg));

  // Create IInd td element
  var td2 = document.createElement('td');

  // Add text node into td2
  td2.appendChild(document.createTextNode(amt));

  // Create IIIrd td element
  var td3 = document.createElement('td');

  // Add text node into td1
  td3.appendChild(document.createTextNode(desc));

  // Create IVth td element
  var td4 = document.createElement('td');

  // Create delete button
  var delBtn = document.createElement('button');

  // Add class to delete button
  delBtn.className = 'btn btn-danger btn-sm delete';

  // Add text node to delete button
  delBtn.appendChild(document.createTextNode('X'));

  // Append delete button into td4 
  td4.appendChild(delBtn);

  // Create Vth td element
  var td5 = document.createElement('td');

  // Add text node into td5
  td5.appendChild(document.createTextNode(expId));

  // Append td1 into tr 
  tr.appendChild(td1);

  // Append td2 into tr 
  tr.appendChild(td2);

  // Append td3 into tr 
  tr.appendChild(td3);

  // Append td4 into tr 
  tr.appendChild(td4);

  // Append td5 into tr 
  tr.appendChild(td5).style.display='none';

  // Append tr into table 
  tab.appendChild(tr);
}

function delItem(e){
  if(e.target.classList.contains('delete')){
    var td = e.target.parentElement;
    var tdID = td.nextSibling.textContent;
    console.log(tdID);
    axios.post(`http://localhost:3000/delExpense/${tdID}`, {}, {headers:{'authorization':token}}).then((result) => {
      console.log(result);
      var tr = td.parentElement;
      console.log(tr);
      tab.removeChild(tr);
    }).catch((err) => {
      console.log(err);
    });
  }
}