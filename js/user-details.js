// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
//     котра має детальну інфу про поточний пост.

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

const currentURL = new URL(location.href);
const id = currentURL.searchParams.get('id');
const userInfoDiv = document.querySelector('.user-info');
const postDiv = document.querySelector('.posts-titles');
const postsContainer = document.querySelector('.posts');

let user = fetch('https://jsonplaceholder.typicode.com/users/'.concat(id))
    .then(value => value.json());
let posts = fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
    .then(value => value.json());
Promise.all([user, posts])
    .then((result) => {
        const user = result[0];
        const posts = result[1];
        createUserObj(user, userInfoDiv);

        for (const post of posts) {
            const div = document.createElement('div');
            div.classList.add('post');
            div.innerHTML += `<h4>${post.title}</h4>`;
            let viewPostButton = document.createElement('a');
            viewPostButton.innerText = 'View Post';
            div.appendChild(viewPostButton);
            postsContainer.appendChild(div);
        }
        const detailsButtons = document.getElementsByTagName('a');
        for (let i = 0; i < detailsButtons.length; i++) {
            const button = detailsButtons[i];
            button.addEventListener('click', function () {
                button.href = 'post-details.html?postId='.concat(posts[i].id);
            })
        }
    }).then(resolve => {
    const postsButton = document.getElementsByTagName('button')[0];
    postsButton.addEventListener('click', function () {
        postDiv.classList.toggle('hide');
        if (postsButton.outerText === 'Hide Posts') {
            postsButton.innerText = 'View Posts'
        } else {
            postsButton.innerText = 'Hide Posts'
        }
    });

})

