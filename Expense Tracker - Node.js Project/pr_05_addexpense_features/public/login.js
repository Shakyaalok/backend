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
            if (response.status === 201) {

                showMsg('Welcome back ' + response.data.user.name)
                console.log(response.data.message)
                window.location.href = '/expense.html'
            } else if (response.status === 200) {

                const errorMessage = response.data.message;
                showMsg(errorMessage)

            }
        }).catch((err) => console.log(err))
}


function showMsg(message) {
    const getMessage = document.getElementById('showMsg')
    const newSpan = document.createElement('span')
    newSpan.innerHTML = `
    <span>${message}</span>
    `

    getMessage.appendChild(newSpan)
}