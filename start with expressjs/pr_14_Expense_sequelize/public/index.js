const btn = document.getElementById('btn');
// console.log(btn)



btn.addEventListener('click', submit);

function submit() {
    // console.log(1)

    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productCategory = document.getElementById('productCategory').value;

    const details = {
        productName: productName,
        productPrice: productPrice,
        productCategory: productCategory
    }


    // POST API 

    axios.post('http://localhost:4000/expense/add-expense', details)
        .then((response) => {

            console.log(response.data.details.id);
            show(response.data.details)
        })
        .catch((err) => console.log(err))
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:4000/expense/alldetails')
        .then((response) => {
            console.log(response.data)
            for (const item of response.data.alldetails) {
                show(item)
            }
        })
        .catch(err => console.log(err))
})

// delete

function deletee(productName) {
    console.log('id is ', productName)
    axios.delete(`http://localhost:4000/expense/delete/${productName}`)
        .then((response) => {
            refresh(productName)

            console.log('deleted successfully!')
        })
        .catch(err => console.log(err))
}




function refresh(productName) {
    console.log(document.getElementById("target_" + productName))
    document.getElementById("target_" + productName).remove();
}





// show the output to the screen
function show(Details) {
    const ExistingEmptyElement = document.getElementById('show')
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `
    <ul class="card text-success" id="target_${Details.productName}"><li>productName:  ${Details.productName}</li>
    <li class="text-success">productPrice:  ${Details.productPrice}</li>
    <li class="text-success">productCategory:  ${Details.productCategory}</li>
     <div class="gap-5 mt-2 mb-2 d-flex">   
      <li><button  class="btn" onclick="deletee('${Details.productName}')">Delete</button></li>
     <li><button class="btn" onclick="edit('${Details.id}')">Edit</button></li></ul></div>
    `

    ExistingEmptyElement.appendChild(newDiv)
}