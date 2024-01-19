const { Pool } = require('pg')
const dbConfig = {
    user: "postgres",
    password: "postgres",
    database: "jobTrackerDb",
    port: "5432",
    host: "localhost"		
}

const pool = new Pool(dbConfig)

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

module.exports = {
    query: (text, params, callback) => pool.query(text, params, callback),
    shutdown: () => pool.end(),
}