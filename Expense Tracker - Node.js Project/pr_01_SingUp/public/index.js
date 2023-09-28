const btn = document.getElementById('btn')

btn.addEventListener('click', singUp);


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
            console.log(response.error)
        }).catch((err) => console.log(err))
}




// function error(errorData) {
//     const getError = document.getElementById('error')
//     const newSpan = document.createElement('span')
//     newSpan.innerHTML = `
//     <span>Error: ${errorData} is required </span>
//     `
// }