const loginbtn = document.getElementById('login-btn')
loginbtn.addEventListener('click', login)


function login() {
    console.log(1)
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const crederntials = {
        email: email,
        password: password
    }

    document.getElementById('email').value = ""
    document.getElementById('password').value = ""

    axios.post('http://localhost:4000/singup/login', crederntials)
        .then((response) => {

            console.log(response)
                // console.log('idddddddddd-->', response.data.user.id)
            if (response.status === 201) {

                showMsg('Welcome back ' + response.data.user.name)
                    // console.log(response.data.message)
                localStorage.setItem('token', response.data.token);
                window.location.href = '/expense.html';
                ispremiumUser(response.data.user.id)

            } else if (response.status === 200) {

                const errorMessage = response.data.message;
                showMsg(errorMessage)

            }
        }).catch((err) => console.log(err))
}



// isPremiumUser frontend-part

async function ispremiumUser(ID) {
    const token = localStorage.getItem('token');
    await axios.get(`http://localhost:4000/order/ispremium/${ID}`, {
            headers: { 'Authorization': token }
        })
        .then((response) => {
            console.log('response for the premum user', response)
        }).catch((err) => {
            console.log('error in getting the status of the user if premium or not', err)
        })
}




function showMsg(message) {
    const getMessage = document.getElementById('showMsg')
    const newSpan = document.createElement('span')
    newSpan.innerHTML = `
    <span>${message}</span>
    `

    getMessage.appendChild(newSpan)
}