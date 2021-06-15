const express = require ("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles", (req,res) => {
    Article.findAll({
        include: [{model: Category}]
    }).then(articles => {
        res.render("admin/articles/index", {articles: articles});
    }); 
});

router.get("/admin/articles/new", (req,res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", {categories: categories})
    })
    
});

router.post("/articles/save", (req,res) => {
    var title = req.body.title;
    var description = req.body.description;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        description: description,
        categoryId: category
    }).then(()=> {
        res.redirect("/admin/articles")
    });

});

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){ //  SE FOR DIFERENTE DE NULO / IF DIFFERENT OF NULL

        if(!isNaN(id)){ // SE PASSAR EM TODAS AS VALIDAÇÕES / IF PASSED ALL VALIDATIONS

            Article.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/articles");
            });

        } else { // SE NÃO FOR UM NÚMERO / IF NOT A NUMBER
            res.redirect("/admin/articles");
        }

    } else { // SE FOR NULO / IF RESULT IS EQUALS A NULL

        res.redirect("/admin/articles");

    }
});

router.post("/articles/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var category = req.body.category;
    var body = req.body.body;
    var description = req.body.description;

    Article.update({title: title, description:description, category:category, body:body, slug: slugify(title)},{
        where: {
            id: id
        }
    }).then(()=> {
        res.redirect("/admin/articles");
    });
});

router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;

    if (isNaN(id)){
        res.redirect("/admin/articles");
    }

    Article.findByPk(id).then(article => {
        if(article != undefined){

            res.render("admin/articles/edit",{article: article});

        }else{
            res.redirect("/admin/articles"); 
        }
    });  
});

module.exports = router;