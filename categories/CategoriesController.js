const express = require ("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new");
});

router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if(title != undefined){

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/");
        })
    }else{
        res.redirect("/admin/categories/new");
    }
});

router.get("/admin/categories/", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories});
    });  
});

router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    if(id != undefined){ //  SE FOR DIFERENTE DE NULO / IF DIFFERENT OF NULL

        if(!isNaN(id)){ // SE PASSAR EM TODAS AS VALIDAÇÕES / IF PASSED ALL VALIDATIONS

            Category.destroy({
                where: {
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/categories");
            });

        } else { // SE NÃO FOR UM NÚMERO / IF NOT A NUMBER
            res.redirect("/admin/categories");
        }

    } else { // SE FOR NULO / IF RESULT IS EQUALS A NULL

        res.redirect("/admin/categories");

    }
});






module.exports = router;