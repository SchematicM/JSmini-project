export  default function createUserObj(user, userDiv) {
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
