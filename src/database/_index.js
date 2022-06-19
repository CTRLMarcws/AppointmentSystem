const mysql = require('mysql');
const config = require('../../config/default.json')

console.log(config.database.host);

const connection = mysql.createConnection(config.database)

// {
//     host: config.database.host,
//     port: config.database.port,
//     user: config.database.user,
//     password: config.database.password,
//     database: config.database.database
// }

const table = () => {
    let exists = db.run()
    if (!exists) {
        const query = "CREATE TABLE"
        const table = db.run(query);
        return table;
    }
    return table;
}

connection.connect(err => {
    if (err) throw err;
    console.log('connected')
});

function execute(resQuery, res) {
    const conn = mysql.createConnection({});
    conn.query(resQuery, (err, results, fields) => {
        if (err) {
            res.json(err);
        }
        res.json(results);
        conn.end();
    })
}

module.exports = execute();