const apiURL = "http://localhost:5002"

export default {
    getProduct(id) {
        return fetch(`${apiURL}/products/${id}`).then(r => r.json())
    },

    getAllProduct() {
        return fetch(`${apiURL}/products`).then(r => r.json())
    },

    deleteProducts(id) {
        return fetch(`${apiURL}/products/${id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(() => this.getAllProduct())
    },
    postProduct(newProducts) {
        return fetch(`${apiURL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newProducts)
        })
        .then(product => product.json())
    },
    putProduct(editedProducts) {
        return fetch(`${apiURL}/products/${editedProducts.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedProducts)
        }).then(data => data.json());
      }

}