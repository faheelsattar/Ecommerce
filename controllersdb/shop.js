const Product = require("../modelsdb/product")
const Cart = require("../modelsdb/cart")

exports.getIndex=(req,res)=>{
    Product.fetchAll()
    .then(([rows,fields])=>{
        res.render("shop/index",  
        {
            products: rows, 
            path:"/products", 
            pagetitle:"Products",
            isauthenticated: req.session.isauthenticated
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
            products:rows[0],
            pagetitle:"Product Details",
            isauthenticated: req.session.isauthenticated
        }
    )
    })
    .catch(err=>console.log(err))   
}

exports.getProducts=(req,res)=>{
    Product.fetchAll()
    .then(([rows,fields])=>{
        res.render("shop/product-list",  
        {
            products: rows, 
            path:"/products", 
            pagetitle:"Products",
            isauthenticated: req.session.isauthenticated
        })
    })
    .catch((err)=>{console.log(err)})
 
}

exports.getOrders=(req,res)=>{
    res.render("shop/orders", 
    {
        path:"/orders", 
        pagetitle:"Orders",
        isauthenticated: req.session.isauthenticated
    })
}

exports.getCart=(req,res)=>{
    Cart.getCart(req.session.user.cartid)
    .then(([rows,fields]) => {
        res.render("shop/cart",{
            products:rows,
            pagetitle:"Cart",
            isauthenticated: req.session.isauthenticated
        })
    }).catch((err) => {
        console.log(err)
    });
}

exports.postCart=(req,res)=>{
    const {productid}= req.query
    Cart.getProducts(productid)
    .then(([rows,fields])=>{
        if(rows.length >0){
        Cart.addProducts(productid, req.session.user.cartid, true, rows[0].quantity+1)
        .then((result) => {
            res.redirect("/cart")
        }).catch((err) => {
            console.log(err)
        });
    }else{
        Cart.addProducts(productid, req.session.user.cartid, false,1)
        .then((result) => {
            res.redirect("/cart")
        }).catch((err) => {
            console.log(err)
        });
    }
    })
    .catch(err=>console.log(err))
}

exports.postCartDeleteProduct=(req,res)=>{
    const {id} = req.query
    Cart.deleteCart(id, req.session.user.cartid)
    .then((result) => {
        res.redirect("/cart")
    }).catch((err) => {
        console.log(err)
    });

}

exports.getCheckout=(req,res)=>{
    res.render("shop/checkout", 
    {
        path:"/checkout", 
        pagetitle:"Checkout",
        isauthenticated: req.session.isauthenticated
    })
}
