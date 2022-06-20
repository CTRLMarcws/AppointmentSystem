const express = require ('express');
const routes = require ('./routes/index');
const { init } = require ('./database/init');
const nunjucks = require("nunjucks")
const app = express()
const port = 4000;
const bodyParser = require('body-parser');

nunjucks.configure("src/views",{
    express: app,
    noCache: true
})


app.use(express.json());
app.use(routes)

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(express.static("public"))

app.get("/",(req, res) => {
    init();
    return res.render("index.html")
})

//database 3306
app.listen(port, () => {
    console.log('Server started at port:', port);
});