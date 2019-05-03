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
    postShipping(newShippings) {
        return fetch(`${apiURL}/shippings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newShippings)
        })
        .then(ship => ship.json())
    },
    putShipping(editedShippings) {
        return fetch(`${apiURL}/shippings/${editedShippings.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedShippings)
        }).then(data => data.json());
      }

}