const expenseBtn = document.getElementById('btn-add-expense');
// const show = document.getElementById('show'); // show all previous expense on button-->on DOm content loaded
expenseBtn.addEventListener('click', addExpense);


function addExpense() {
    const productName = document.getElementById('product-name').value
    const productPrice = document.getElementById('product-price').value
    const productCategory = document.getElementById('product-category').value
    const remarks = document.getElementById('remarks').value


    const expenseDetails = {
        productName: productName,
        productPrice: productPrice,
        productCategory: productCategory,
        remarks: remarks
    }

    const token = localStorage.getItem('token');
    console.log("token", token)
    axios.post('http://localhost:4000/expense/add', expenseDetails, { headers: { 'Authorization': token } })
        .then((response) => {

            console.log(response.data.expense.id);
            console.log(response.data);
            showMsgOnTop(response.data.message)
            getOneExpense(response.data.expense.id)
        })
        .catch((err) => console.log('error in expense.js file', err))


    //resetting the input value
    document.getElementById('product-name').value = ""
    document.getElementById('product-price').value = ""
    document.getElementById('product-category').value = ""
    document.getElementById('remarks').value = ""
}


// get All expense
// show.addEventListener('click', showAllExpenses);



// function showAllExpenses() {
//     const token = localStorage.getItem('token');
//     // console.log(token)
//     axios.get('http://localhost:4000/expense/', { headers: { 'Authorization': token } })
//         .then((response) => {
//             console.log(response)
//             for (const expense of response.data.expenses) {
//                 showExpense(expense)
//             }
//         })
// }


window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    console.log("token", token)
    axios.get('http://localhost:4000/expense/', { headers: { 'Authorization': token } })
        .then((response) => {
            console.log(response)
            for (const expense of response.data.expenses) {
                showExpense(expense)
            }
        })
})


// get one expense 
function getOneExpense(ID) {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:4000/expense/${ID}`, { headers: { 'Authorization': token } })
        .then((response) => {
            console.log('this is response', response);
            showExpense(response.data.expense);
        })
}


function showMsgOnTop(Details) {
    const ExistingEmptyElement = document.getElementById('MsgTop');
    const newDiv = document.createElement('div');
    newDiv.innerHTML = `
    <span> ${Details} </span>
    `;
    ExistingEmptyElement.appendChild(newDiv)
}


// delete expense
function deletee(ID) {
    axios.delete(`http://localhost:4000/expense/${ID}`)
        .then((response) => {
            console.log(response)
            deleteAfterRefresh(ID)
        })
        .catch((err) => {
            console.log('error in deletion')
        })
}


function deleteAfterRefresh(ID) {
    document.getElementById('target_' + ID).remove()
}


function showExpense(details) {
    const ExistingEmptyElement = document.getElementById('showExpense');
    const Div = document.createElement('div');
    Div.innerHTML = `
    <div class="card mb-4" id='target_${details.id}'>
    <ul>
     <li>Product Name: ${details.productName}  </li>
     <li>Product Price: ${details.productPrice}  </li>
     <li>Product Category: ${details.productCategory}  </li>
     <li>Remarks: ${details.remarks}  </li>
     <div>
      <li  class="btn btn-success"
      onclick='deletee("${details.id}")'>Delete </li>
     </div>
    </ul>
    </div>
    `;
    ExistingEmptyElement.appendChild(Div)
}