const DATABASE_PORT = 6349

export default {
    get: (endpoint, callback) =>
        fetch(`http://localhost:${DATABASE_PORT}` + endpoint)
        .then(data => data.json())
        .then(callback)
        .catch(console.log)
}