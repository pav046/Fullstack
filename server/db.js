const pgp = require('pg-promise')()
const db = pgp({
    user: 'user',
    host: 'localhost',
    password: 'password',
    database: 'database',
    port: 5432
})

module.exports = db