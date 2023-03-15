// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
// котра має детальну інфорацію про об'єкт на який клікнули
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            return Promise.reject('Something went wrong during getting Users!')
        }
    })
    .then(users => {
        const usersDiv = document.querySelector('.users')

        for (const user of users) {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user');
            const h3 = document.createElement('h3');
            h3.innerHTML = `ID: ${user.id}<br/> ${user.name}`;
            const detailsButton = document.createElement('a');
            detailsButton.classList.add('details');
            detailsButton.innerText = 'Details';
            userDiv.append(h3, detailsButton);
            usersDiv.appendChild(userDiv);

        }

        const detailsButtons = document.getElementsByClassName('details');
        for (let i = 0; i < detailsButtons.length; i++) {
            const button = detailsButtons[i];
            button.addEventListener('click', function () {
                button.href = 'user-details.html?id='.concat(users[i].id);
            })
        }
    })
    .catch(error => console.error(error));

