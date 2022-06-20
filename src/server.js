const express = require ('express');
const routes = require ('./routes/index');
const { init } = require ('./database/init');
const cors = require('cors');
const nunjucks = require("nunjucks");
const app = express()
const port = 4001;

nunjucks.configure("src/views",{
    express: app,
    noCache: true
})


app.use(express.json());
app.use(routes)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

app.get("/",(req, res) => {
    init();
    return res.render("index.html")
})

app.post('/applynew', async (req, res) => {
    console.log('requisição')
    console.log('\n\n\n\n', req.body)
    return res.status(200)
})

//database 3306
app.listen(port, () => {
    console.log('Server started at port:', port);
});