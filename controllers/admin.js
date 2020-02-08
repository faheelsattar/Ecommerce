const Product = require("../models/product")

exports.getAddProducts=(req,res)=>{
    //res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    res.render("admin/add-products" , {path:"/admin/add-products"})
}

exports.saveProducts=(req,res)=>{
    const product = new Product(req.body.title)
    product.save()
    res.redirect("/")
}

exports.products=(req,res)=>{
    res.render("admin/products")
}
