import { createConnection } from 'mysql';

const connection = createConnection({
    host: 'localhost',
    user: 'user',
    password: 'pass',
    database: 'data'
})

connection.connect(err => {
    if (err) throw err;
    console.log('connected')
});