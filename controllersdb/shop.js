const Product = require("../modelsdb/product")
const Cart = require("../modelsdb/cart")

exports.getIndex=(req,res)=>{
    Product.fetchAll()
    .then(([rows,fields])=>{
        res.render("shop/index",  
        {
            products: rows, 
            path:"/products", 
            pagetitle:"Products"
        })// render the default templating engine that has been specified in app.js
    })
    .catch((err)=>{console.log(err)})
}

exports.getProduct=(req,res)=>{
    const productid= req.params.productid
    Product.findById(productid)
    .then(([rows,fields])=>{
        res.render("shop/product-details",
        {
            product:rows[0],
            pagetitle:"Product Details",
        }
    )
    })
    .catch(err=>console.log(err))   
}

exports.getProducts=(req,res)=>{
    Product.fetchAll()
    .then(([rows,fields])=>{
        console.log(rows[0].id)
        res.render("shop/product-list",  
        {
            products: rows, 
            path:"/products", 
            pagetitle:"Products"
        })
    })
    .catch((err)=>{console.log(err)})
 
}

exports.getOrders=(req,res)=>{
    res.render("shop/orders", 
    {
        path:"/orders", 
        pagetitle:"Orders"
    })
}

exports.getCart=(req,res)=>{
    
}

exports.postCart=(req,res)=>{
    const {productid}= req.query
    Cart.getProducts(productid)
    .then(([rows,fields])=>{
        if(rows.length >0){
        Cart.addProducts(productid,true,rows[0].quantity+1)
        .then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
    }else{
        Cart.addProducts(productid,false,1)
        .then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
    }
    })
    .catch(err=>console.log(err))
    res.redirect("/cart")
}

exports.postCartDeleteProduct=(req,res)=>{
    const {id} = req.query
    Product.findById(id, (product)=>{
        console.log(id,product[0].price)
        Cart.deleteProduct(id ,product[0].price)
        res.redirect("/cart")
    })
}

exports.getCheckout=(req,res)=>{
    res.render("shop/checkout", 
    {
        path:"/checkout", 
        pagetitle:"Checkout"
    })
}
