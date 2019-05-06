const apiURL = "http://localhost:5002"

export default {
    getShipping(id) {
        return fetch(`${apiURL}/shippings/${id}`).then(r => r.json())
    },

    getAllShipping() {
        return fetch(`${apiURL}/shippings`).then(r => r.json())
    },

    deleteShipping(id) {
        console.log(typeof(id))
        return fetch(`${apiURL}/shippings/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getAllShipping())
    },
    postShipping(newShipping) {
        return fetch(`${apiURL}/shippings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newShipping)
        })
        .then(ship => ship.json())
    },
    putShipping(editedShipping) {
        return fetch(`${apiURL}/shippings/${editedShipping.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedShipping)
        }).then(data => data.json());
      }

}