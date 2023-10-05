const expenseBtn = document.getElementById('btn-add-expense');
const premiumBtn = document.getElementById('premium');
// const rzpl = require('razorpay')

console.log(premiumBtn)
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

    const decodeToken = parseJwt(token); // decoding the token
    if (decodeToken.ispremiumuser) {
        const premiumButton = document.getElementById('premium');
        premiumButton.style.display = 'none';
        const premiumUser = document.getElementById('premiumuser');
        premiumUser.innerHTML = 'You are now PREMIUM';

    }




    axios.get('http://localhost:4000/expense/', { headers: { 'Authorization': token } })
        .then((response) => {
            // console.log(response)
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
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:4000/expense/${ID}`, { headers: { 'Authorization': token } })
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



// PAYMENT
premiumBtn.addEventListener('click', payment);

async function payment() {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get('http://localhost:4000/order/payment', {
            headers: { 'Authorization': token }
        });

        // console.log('Response from server:', response);

        const options = {
            "key": response.data.key_id,
            "order_id": response.data.order.id,
            "handler": async function(response) {
                try {
                    const paymentResponse = await axios.post('http://localhost:4000/order/updatetransactions', {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id,
                    }, { headers: { 'Authorization': token } });

                    alert('Congratulations on becoming a valuable customer');
                    const premiumButton = document.getElementById('premium');
                    premiumButton.style.display = 'none';
                    const premiumUser = document.getElementById('premiumuser');
                    premiumUser.innerHTML = 'You are now PREMIUM';

                    // setting the updated token
                    console.log('token for updation', paymentResponse.data.token)
                    localStorage.setItem('token', paymentResponse.data.token)

                } catch (error) {
                    console.error('Error updating transaction:', error);
                    alert('Something went wrong');
                }
            }
        };

        const rzpl = new Razorpay(options);
        rzpl.open();

        rzpl.on('payment.failed', function(response) {
            console.error('Payment failed:', response);
            alert('Something went wrong');
        });
    } catch (error) {
        console.error('Error fetching payment details:', error);
        alert('Something went wrong');
    }
}


// token decode
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
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