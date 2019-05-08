
const apiURL = "http://localhost:5002"

export default {
    getProductTypes(id) {
        return fetch(`${apiURL}/productTypes/${id}`).then(r => r.json())
    },

    getAllProductTypes() {
        return fetch(`${apiURL}/productTypes`).then(r => r.json())
    }
} 
