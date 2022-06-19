const mysql = require('mysql2/promise');
const config = require('../../config/default.json');

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;
    
    const conn = await mysql.createConnection(config.database);
    console.log("MySql connected at", config.database.port);
    global.connection = conn;
    return conn;
}

async function execute(request){
    const conn = await connect();
    const results = await conn.query(request);
    return results[0];
}

function format(query, values) {
    return mysql.format(query, values);
}

async function commit(request) {
    const conn = await connect();
    return await conn.commit();
}

module.exports = { execute, format, commit }

/*
CREATE USER 'scheduler'@'localhost' IDENTIFIED WITH mysql_native_password BY 'schedulerapplication';
GRANT ALL PRIVILEGES ON *.* TO 'scheduler'@'localhost';
FLUSH PRIVILEGES;
 */