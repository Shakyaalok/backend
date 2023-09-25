const btn = document.getElementById('btn');
// console.log(btn)



btn.addEventListener('click', submit);

function submit() {
    // console.log(1)

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    const Blog = {
        title: title,
        author: author,
        content: content
    }


    // console.log(Blog)

    // POST API 

    axios.post('http://localhost:4000/blogs/addBlog', Blog)
        .then((response) => {

            console.log(response.data.blog);
            show(response.data.blog)
        })
        .catch((err) => console.log(err))
}


// for blog only
window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:4000/blogs/getAllBlogs')
        .then((response) => {
            console.log(response.data)
            console.log(response.data)
            for (const item of response.data) {
                show(item)
            }
        })
        .catch(err => console.log(err))
})

// for posting the comments



function postComments(ID) {
    // const postbtn = document.getElementById('post')

    let Comment = document.getElementById('post').value

    let comment = {
        blogComment: Comment,
        blogId: ID
    }

    axios.post('http://localhost:4000/comments/addcomments', comment)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => console.log(err))
}





// for comments only
function showComments(ID) {
    axios.get(`http://localhost:4000/comments/${ID}`)
        .then((response) => {
            console.log(response.data)
            const commentID = document.getElementById("comment_" + ID);
            let commentUI = `<ul class="card text-success">`
            for (const itm of response.data) {
                // showCommentINUI(item)
                commentUI = commentUI + `<li class="text-success">
                    ${itm.blogComment}
                    <li>
                    `;

            }


            commentID.innerHTML = commentUI + `</ul>`
        })
        .catch(err => console.log(err))
}
// window.addEventListener('DOMContentLoaded', () => {

// })


// delete

// function deletee(productName) {
//     console.log('id is ', productName)
//     axios.delete(`http://localhost:4000/expense/delete/${productName}`)
//         .then((response) => {
//             refresh(productName)

//             console.log('deleted successfully!')
//         })
//         .catch(err => console.log(err))
// }




// function refresh(productName) {
//     console.log(document.getElementById("target_" + productName))
//     document.getElementById("target_" + productName).remove();
// }





// show the output to the screen
function show(Details) {
    const ExistingEmptyElement = document.getElementById('show')
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `
    <ul class="card text-success" id="target_${Details.title}"><li>Title:  ${Details.title}</li>
    <li class="text-success">Author:  ${Details.author}</li>
    <li class="text-success">Content:  ${Details.content}</li>
    <div class="gap-5 mt-2 mb-2 d-flex">   
    <li><button  class="btn" onclick="deletee('${Details.productName}')">Delete</button></li>
   <li><button class="btn" onclick="showComments('${Details.id}')">show comments</button></li>
   <li>   <div>
   
   <textarea name="post" type="text" class="form-control" id="post"></textarea>
   <button type="button" class="btn btn-success btn-green" id="btnPost" onclick="postComments('${Details.id}')">Comments Now</button>
</div><li>
   <div id="comment_${Details.id}">
  
   </div>
      
   </ul></div>
    </ul>


    
    `

    ExistingEmptyElement.appendChild(newDiv)
}

// function showCommentINUI(comments) {
//     const ExitingCommentElement = document.getElementById('shcommentsow')
//     const newDiv = document.createElement('div')
//     newDiv.innerHTML = `
//     <ul class="card text-success" id="target_${comments.blogComment}"><li>Title:  ${Details.blogComment}</li>
//     <div class="gap-5 mt-2 mb-2 d-flex">   

//     <li><button  class="btn" onclick="deletee('${e}')">Delete</button></li>
//    <li><button class="btn" onclick="showComments('${e}')">shoe comments</button></li></ul></div>
//     </ul>



//     `

//     ExitingCommentElement.appendChild(newDiv)
// }