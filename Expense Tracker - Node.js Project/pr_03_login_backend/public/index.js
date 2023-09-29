// const btn = document.getElementById('btn')
const loginbtn = document.getElementById('login-btn')

// btn.addEventListener('click', singUp);
loginbtn.addEventListener('click', login)


function singUp() {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const mobile = document.getElementById('mobile').value
    const password = document.getElementById('password').value



    const user = {
        name: name,
        email: email,
        mobile: mobile,
        password: password
    }

    axios.post('http://localhost:4000/singup', user)
        .then((response) => {

            console.log(response)
            if (response.status === 201) {

                showMsg(response.data.message)
                console.log(response.data.message)

            } else if (response.status === 200) {

                const errorMessage = response.data.message;
                showMsg(errorMessage)

            }
        }).catch((err) => console.log(err))
}




function login() {
    console.log(1)
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value



    const crederntials = {
        email: email,
        password: password
    }




    axios.post('http://localhost:4000/singup/login', crederntials)
        .then((response) => {

            console.log(response)
            if (response.status === 201) {

                showMsg(response.data.message)
                console.log(response.data.message)

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