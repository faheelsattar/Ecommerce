const Product = require("../models/product")

exports.getIndex=(req,res)=>{
    Product.fetchAll((products)=>{
        res.render("shop/product-list", 
        {
            products: products, 
            path:"/products", 
            pagetitle:"Products"
        }) 
    })// render the default templating engine that has been specified in app.js
}

exports.getProduct=(req,res)=>{
    const productid= req.params.productid
    Product.findById(productid, (product)=>{
        console.log(product)
        res.render("shop/product-details",
        {
            product:product,
            pagetitle:"Product Details",
        }
    )
    })
}

exports.getProducts=(req,res)=>{
    Product.fetchAll( (products)=>{
        res.render("shop/product-list", 
        {
            products: products, 
            path:"/products", 
            pagetitle:"Products"
        }) 
    })
 
}

exports.getOrders=(req,res)=>{
    res.render("shop/orders", 
    {
        path:"/orders", 
        pagetitle:"Orders"
    })
}

exports.getCart=(req,res)=>{
    res.render("shop/cart", 
    {
        path:"/cart", 
        pagetitle:"Cart"
    })
}

exports.getCheckout=(req,res)=>{
    res.render("shop/checkout", 
    {
        path:"/checkout", 
        pagetitle:"Checkout"
    })
}

