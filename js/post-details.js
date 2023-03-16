// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

const currentURL = new URL(location.href);
const postId = currentURL.searchParams.get('postId');
const postInfoDiv = document.querySelector('.post-info');
const commentsDiv = document.querySelector('.post-comments');
const commentsContainer = document.querySelector('.comments');


function createUserObj(user, userDiv) {
    for (const userKey in user) {
        let div = document.createElement('div');
        div.classList.add(userKey);
        if (typeof user[userKey] !== 'object') {
            div.innerHTML = `<p>${userKey} : ${user[userKey]}</p>`
        } else {
            div.innerHTML = `<p>${userKey} :</p> `;
            createUserObj(user[userKey], div);
        }
        userDiv.appendChild(div);
    }
}

let post = fetch('https://jsonplaceholder.typicode.com/posts/'.concat(postId))
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return Promise.reject('Something went wrong during getting Post by post id!')
        }
    })
    .catch(error => console.error(error));
let comments = fetch('https://jsonplaceholder.typicode.com/comments?postId='.concat(postId))
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return Promise.reject('Something went wrong during getting Comments by post id!')
        }
    })
    .catch(error => console.error(error));
Promise.all([post, comments])
    .then((result) => {
        const post = result[0];
        const comments = result[1];
        createUserObj(post, postInfoDiv);
        const postsButton = document.getElementsByTagName('button')[0];
        postsButton.innerText = "View Comments";


        for (const comment of comments) {
            const div = document.createElement('div');
            div.classList.add('comment');
            div.innerHTML += `<h5>${comment.email}</h5><h5>Title: ${comment.name}</h5><p>${comment.body}</p>`;
            commentsContainer.appendChild(div);
        }
    }).then(resolve => {
    const postsButton = document.getElementsByTagName('button')[0];
    postsButton.addEventListener('click', function () {
        commentsDiv.classList.toggle('hide');
        if (postsButton.outerText === 'Hide Comments') {
            postsButton.innerText = 'View Comments'
        } else {
            postsButton.innerText = 'Hide Comments'
        }
    });
});