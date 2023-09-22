const btn = document.getElementById('btn');
// console.log(btn)


// post
btn.addEventListener('click', submitForm);

async function submitForm(e) {
    const referenceEle = e;
    e.preventDefault()
    let name = document.getElementById('name').value;
    let title = document.getElementById('title').value;
    let email = document.getElementById('email').value;
    let mobile = document.getElementById('mobile').value;


    let user = {
        name: name,
        title: title,
        email: email,
        mobile: mobile

    }


    // POST
    // 1. sending the data to the crud using post request
    if (e.currentTarget.innerHTML == 'Submit') {
        await axios.post('http://localhost:5000/user/v1/create', user)
            .then((response) => {
                show(response.data.detail);
                console.log(response.data.detail)
                document.getElementById('name').value = "";
                document.getElementById('title').value = "";
                document.getElementById('email').value = "";
                document.getElementById('mobile').value = "";
                alert('successfully sent!')
            })
            .catch((err) => console.log(err))
    } else {
        await axios.put(`/user/v1/update/${email}`, user)
            .then((response) => {
                console.log('this is response', response.data)
                    // referenceEle.currentTarget.innerHTML = 'Submit
                document.getElementById('name').value = "";
                document.getElementById('title').value = "";
                document.getElementById('email').value = "";
                document.getElementById('mobile').value = "";
                document.getElementById('btn').innerHTML = "Submit";
                const refreshElement = document.getElementById("target_" + response.data.AllDetails.email);
                refreshElement.innerHTML = `<li>Name:${response.data.AllDetails.name}</li>
                <li>Title:${response.data.AllDetails.title}</li>
                <li>Email:${response.data.AllDetails.email}</li>
                <li>Mobile:${response.data.AllDetails.mobile}</li>
                <div class="d-flex gap-3"><li><button type="button" class="btn" onclick='Delete("${response.data.AllDetails.email}")'>Delete${" "}${user.name}</button></li>
                <li><button type="button" class="btn" onclick='Edit("${response.data.AllDetails.email}")'>Edit</button></li></div>`;

                alert('successfully sent!')
            })
            .catch(err => console.log('error in updation from backend'))
    }
}


// on load to show the data
window.addEventListener('DOMContentLoaded', async() => {
    try {
        await axios.get('http://localhost:5000/user/v1/alldetails')
            .then((response) => {
                for (const item of response.data.AllDetails) {
                    show(item)
                }
                // console.log(response.data.AllDetails[0])
            })
            .catch(err => console.log(err))
    } catch (error) {
        console.log('error in data loaded', err)
    }

})


// Delete the booking
function Delete(emailId) {
    axios.delete(`http://localhost:5000/user/v1/delete/${emailId}`)
        .then((response) => {
            clearDeleted(emailId);
            console.log(response.data)
        })
        .catch(err => console.log('error in deleting the booking', err))
}


function clearDeleted(email) {
    document.getElementById('target_' + email).remove();
}


// function to update the user
async function Edit(emailId) {
    await axios.get(`http://localhost:5000/user/v1/get/${emailId}`)
        .then((response) => {
            console.log('this is response', response.data)
            const frmElement = document.getElementById("frmData");
            console.log("frmElement", frmElement)
            frmElement['name'].value = response.data.AllDetails.name;
            frmElement['title'].value = response.data.AllDetails.title;
            frmElement['email'].value = response.data.AllDetails.email;
            frmElement['mobile'].value = response.data.AllDetails.mobile;
            frmElement.elements['btn'].innerHTML = "Update";
        })
        .catch(err => console.log('error in updation from backend'))





    // console.log(1)
}


// // function to clear the page kind of refresh
function clearShowElement() {
    let ExistingEpmtyElement = document.getElementById('show');
    ExistingEpmtyElement.innerHTML = ' '


    // after emptying the page we have to get all the details as well
    axios.get('http://localhost:5000/user/v1/alldetails')
        .then((response) => {
            for (const item of response.data.AllDetails) {
                show(item)
            }

        })
        .catch(err => console.log(err))
}


// show the data on the page

function show(user) {
    let ExistingEmptyElement = document.getElementById('show');
    var newAddedElement = document.createElement('div');
    newAddedElement.innerHTML = `
    <div class="card li gap-2">  
    <ul id="target_${user.email}">
    <li>Name:${user.name}</li>
    <li>Title:${user.title}</li>
    <li>Email:${user.email}</li>
    <li>Mobile:${user.mobile}</li>
    <div class="d-flex gap-3"><li><button type="button" class="btn" onclick='Delete("${user.email}")'>Delete${" "}${user.name}</button></li>
    <li><button type="button" class="btn" onclick='Edit("${user.email}")'>Edit</button></li></div>
    </ul>
    </div>
    `
        // append the new element to the existing element
    ExistingEmptyElement.appendChild(newAddedElement)
}