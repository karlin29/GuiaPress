const express = require("express");
const app = express();
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require ("./articles/Article");
const Category = require ("./categories/Category");

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

app.use("/", categoriesController);
app.use("/",articlesController)


app.get("/", (req, res) => {
    Article.findAll({
        order:[
            ["id","DESC"]
        ]
    }).then(articles => {

        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories});
        });
    }); 
});

app.get("/:slug", (req, res) => {
    var slug =  req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories});
            });
        }else {
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    })
});



app.listen(3131, () => {
    console.log("O servidor está rodando na porta 3131")
});

