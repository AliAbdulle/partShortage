const apiURL = "http://localhost:5002"

export default {
    getUser(id) {
        return fetch(`${apiURL}/users/${id}`).then(user => user.json())
    },

    getAllUser() {
        return fetch(`${apiURL}/users?_expand=productType&_expand=phaseType`).then(users => users.json())
    },
    postUser(newUser) {
        return fetch(`${apiURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newUser)
        })
        .then(users => users.json())
    }
}