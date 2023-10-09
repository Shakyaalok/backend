window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const decodeToken = parseJwt(token)
    console.log(decodeToken)
    if (decodeToken.ispremiumuser) {

        // console.log('token in premium feature', token)
        axios.get('http://localhost:4000/premium', { headers: { 'Authorization': token } })
            .then((response) => {
                // console.log(response.data[0].name)// right way to access
                // console.log(response.data.name) // not right way
                for (const leader of response.data) {
                    // console.log(leader.Name, leader.totalExpenses)
                    showLeaderboard(leader)
                }

            })
            .catch((err) => {
                console.log('error from frontend in premium Feautre', err)
            })
    } else {
        document.getElementById('premiumParent').style.display = 'none';

    }


})

// show Leaderboard
function showLeaderboard(leader) {
    const premiumFeature = document.getElementById('premiumFeature');
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `
    <div class="card mb-4">
    <ul>
       <div class="d-flex gap-4"> <li>Name: ${leader.name}  </li>
       <li>Total Expense: ${leader.totalExpenses}  </li> </div>
     <div>
    </ul>
    </div>
    `;

    premiumFeature.appendChild(newDiv)
}
// token decode-->i use this here due to if the user is premium then show leaderboard otherwise hide that leaderboard
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}








// show the reports and all the
// download and the links
// show the history of the file dowloaded
const showFileDown = document.getElementById('historyofFile')
console.log(showFileDown)
showFileDown.addEventListener('click', historyOfFiles)

function historyOfFiles() {
    const token = localStorage.getItem('token');
    const decodeToken = parseJwt(token); // decoding the token
    // console.log(decodeToken.ispremiumuser)
    const userId = decodeToken.userId;
    console.log(decodeToken)
    if (decodeToken.ispremiumuser) {
        axios.get(`http://localhost:4000/expense/download/history/${userId}`, { headers: { 'Authorization': token } })
            .then((response) => {
                console.log('history--->', response)
                for (const files of response.data.fileUrl) {
                    showFile(files)
                }
                console.log('response for the url', response, response.data.fileUrl)
            })
    } else {
        document.getElementById('parentLinks').style.display = 'none'
    }

}


function DowloadFile(fileUrl) {
    console.log('download file url', fileUrl)
    var a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'myexpense.csv';

    a.click(); // this line is very important to start the dowloading
}



function showFile(url) {
    const emptyExistingElement = document.getElementById('showfiledowmlinks')
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `
<div class="card mt-5">
<div class='d-flex justify-content-between align-items-center gap-4 p-2'> 
<div class='overflow-hidden'>${url.fileUrl}</div>
<button class="btn btn-info" onclick='DowloadFile("${url.fileUrl}")' >Download</button>
</div>


</div>
`

    emptyExistingElement.appendChild(newDiv)
}