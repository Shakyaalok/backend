window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const decodeToken = parseJwt(token)
    console.log(decodeToken)
    if (decodeToken.ispremiumuser) {

        // console.log('token in premium feature', token)
        axios.get('http://localhost:4000/premium', { headers: { 'Authorization': token } })
            .then((response) => {
                // console.log(response)
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


// token decode-->i use this here due to if the user is premium then show leaderboard otherwise hide that leaderboard
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


// show Leaderboard
function showLeaderboard(leader) {
    const premiumFeature = document.getElementById('premiumFeature');
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `
    <div class="card mb-4">
    <ul>
       <div class="d-flex gap-4"> <li>Name: ${leader.Name}  </li>
       <li>Total Expense: ${leader.totalExpenses}  </li> </div>
     <div>
    </ul>
    </div>
    `;

    premiumFeature.appendChild(newDiv)
}