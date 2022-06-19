const express = require ('express');
const routes = require ('./routes/index');
const database = require ('./database/index');

const app = express()
const port = 4000;

app.use(express.json());
app.use(routes)

//database 3306
app.listen(port, () => {
    console.log('Server started at port:', port);
});