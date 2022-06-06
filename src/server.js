const express = require ('express');
const routes = require ('./routes/index');
// const database = require ('./database/index');

const app = express()

// const connection = database.createConnection()

app.use(express.json());
app.use(routes)

//database 3306
app.listen(4000, () => {
   
    console.log('Server started at port:4000');
});