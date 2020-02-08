const Product = require("../models/product")

exports.getIndex=(req,res)=>{
    const products = Product.fetchAll()
    res.render("shop/product-list", {products: products, path:"/", pagetitle:"Home" }) //res.render is used to render the default templating engine that has been specified in app.js
}

exports.getProducts=(req,res)=>{
    const products = Product.fetchAll()
    res.render("shop/product-list", {products: products, path:"/products", pagetitle:"Products"} ) 
}


exports.getCart=(req,res)=>{
    res.render("shop/cart", {path:"/cart", pagetitle:"Cart"})
}

exports.getCheckout=(req,res)=>{
    res.render("shop/checkout", {path:"/checkout", pagetitle:"Checkout"})
}

