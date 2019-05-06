const apiURL = "http://localhost:5002"

export default {
    getPhaseTypes(id) {
        return fetch(`${apiURL}/phaseTypes/${id}`).then(r => r.json())
    },

    getAllPhaseTypes() {
        return fetch(`${apiURL}/phaseTypes`).then(r => r.json())
    }
} 