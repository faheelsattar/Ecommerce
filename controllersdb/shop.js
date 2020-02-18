const Product = require("../modelsdb/product")
const Cart = require("../modelsdb/cart")

exports.getIndex=(req,res)=>{
    Product.fetchAll()
    .then(([rows,fields])=>{
        res.render("admin/products",  
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
    Product.fetchAll()
    .then(([rows,fields])=>{
        res.render("admin/products",  
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
    Cart.getCart((cart)=>{
        Product.fetchAll((products)=>{
            const cartproducts=[]
            for(product of products){
                const cartproductsdata=cart.product.find(prod=> prod.id === product.id)
                console.log(cartproductsdata,1)
                if(cartproductsdata){
                    cartproducts.push({productdata:product, quantity:cartproductsdata.quantity })
                }
            }
            console.log(cartproducts)
            res.render("shop/cart", 
            {
                path:"/cart", 
                pagetitle:"Cart",
                products:cartproducts
            })
        })
    })
}

exports.postCart=(req,res)=>{
    const {productid} = req.query
    Product.findById(productid, (product)=>{
        console.log(product[0].price)
    Cart.addToCart(productid, product[0].price)
    })
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



