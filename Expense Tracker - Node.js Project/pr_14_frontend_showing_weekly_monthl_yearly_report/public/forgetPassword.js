// const forgetBtn = document.getElementById('forget-btn')
//     console.log(forgetBtn)

// forgetBtn.addEventListener('click', ShowForgetForm)

// function ShowForgetForm() {
//     const forForm = document.getElementById('showForgetForm')
//     const newDiv = document.createElement('div');

//     newDiv.innerHTML = `
//     <div class="mt-5 d-flex flex-column gap-2">
//      <div>  
//      <label for="email" class="form-label">Email</label>
//      <input name="email" type="email" class="form-control" id="email" placeholder=" " required>
//      <div class="error">not a valid email </div> </div>
//      <div> 
//      <button type="button" class="btn btn-success btn-green" id="passwordforget-btn">Submit Now </button>
//      </div>
//    </div>
//     `;
//     forForm.appendChild(newDiv);
// }



// const sendMail = document.getElementById('passwordforget-btn');
// sendMail.addEventListener('click', ForgetFormSubmission);


// function ForgetFormSubmission() {
//     const token = localStorage.getItem('token')
//     axios.get('http://localhost:4000/forget/forgotpassword', { headers: { 'Authorization': token } })
//         .then((response) => {
//             console.log(response)
//         })
//         .catch((err) => {
//             console.log('error in sending the mail')
//         })
// }


// in above code there was a problem like when the page is loaded at that time  this does not load     <button type="button" class="btn btn-success btn-green" id="passwordforget-btn">Submit Now </button>
// so that why i got the reference error so that's why i put the whole code in DOMContentLoaded because it will load the whole code at once when the page loads


window.addEventListener('DOMContentLoaded', function() {
    const forgetBtn = document.getElementById('forget-btn');
    // console.log(forgetBtn);

    forgetBtn.addEventListener('click', ShowForgetForm);

    function ShowForgetForm() {
        const forForm = document.getElementById('showForgetForm');
        const newDiv = document.createElement('div');

        newDiv.innerHTML = `
        <div class="mt-5 d-flex flex-column gap-2">
            <div>  
                <label for="forgetEmail" class="form-label">Email</label>
                <input name="email" type="email" class="form-control" id="forgetEmail" placeholder=" " required>
                <div class="error">not a valid email </div>
            </div>
            <div> 
                <button type="button" class="btn btn-success btn-green" id="passwordforget-btn">Submit Now </button>
            </div>
        </div>
        `;
        forForm.appendChild(newDiv);

        const sendMail = document.getElementById('passwordforget-btn');
        sendMail.addEventListener('click', ForgetFormSubmission);
    }

    function ForgetFormSubmission() {
        const token = localStorage.getItem('token');
        const email = document.getElementById('forgetEmail').value
        axios.post('http://localhost:4000/password/forgotpassword', { email }, { headers: { 'Authorization': token } })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log('error in sending the mail');
            });

        document.getElementById('forgetEmail').value = ""
    }
});