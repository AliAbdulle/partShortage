const apiURL = "http://localhost:5002"

export default {
    getInventory(id) {
        return fetch(`${apiURL}/inventory/${id}`).then(r => r.json())
    },

    getAllInventory() {
        return fetch(`${apiURL}/inventory`).then(r => r.json())
    },

    deleteInventory(id) {
        console.log(typeof(id))
        return fetch(`${apiURL}/inventory/${id}`, {
            method: "DELETE"
        })
        .then(() => this.getAllInventory())
    },
    postInventory(newInventory) {
        return fetch(`${apiURL}/inventory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newInventory)
        })
        .then(ship => ship.json())
    },
    putProduct(editedInventory) {
        return fetch(`${apiURL}/inventory/${editedInventory.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedInventory)
        }).then(data => data.json());
      }

}