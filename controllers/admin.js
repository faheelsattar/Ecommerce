const Product = require("../models/product")

exports.getAddProducts=(req,res)=>{
    //res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    res.render("admin/add-products" , 
    {
        path:"/admin/add-products"
    })
}

exports.saveProducts=(req,res)=>{
    const title = req.body.title
    const imageURL =req.body.imageURL
    const price = req.body.price
    const description = req.body.description
    const product = new Product(title, imageURL, price, description)
    product.save()
    res.redirect("/")
}

exports.products=(req,res)=>{
    const products = Product.fetchAll()
    res.render("admin/products",  
    {
        products: products, 
        path:"/admin/products", 
        pagetitle:"Products"
    })
}
