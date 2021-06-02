const express = require("express");
const app = express();
const connection = require("./database/database");

//view engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//body parser (deprecated) no lugar dele, é essa middleware que está inclusa no express:
app.use(express.urlencoded({ extended: true })); 

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch ((error) => {
        console.log(error);
    })


app.get("/", (req, res) => {
    res.render("index");
})

app.listen(3131, () => {
    console.log("O servidor está rodando na porta 3131")
})

