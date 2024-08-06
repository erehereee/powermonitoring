const form_username = document.querySelectorAll('form input')[0];
const form_password = document.querySelectorAll('form input')[1];
const button = document.querySelector('.button input');

button.addEventListener('click', () => {
    fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({
          username : form_username.value,
          password: form_password.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => {
            if(!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then((json) => console.log(json.message))
})

