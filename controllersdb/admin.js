const Product = require("../modelsdb/product")
const Cart = require("../modelsdb/cart")

exports.getAddProducts=(req,res)=>{
    //res.sendFile(path.join(__dirname, "../", "views", "add-product.html"))
    res.render("admin/add-products" , 
    {
        path:"/admin/add-products",
        isauthenticated: req.session.isauthenticated
    })
}

exports.saveProducts=(req,res)=>{
    const title = req.body.title
    const imageURL =req.body.imageURL
    const price = req.body.price
    const description = req.body.description
    const product = new Product(title, imageURL, price, description)
    console.log(req.session.user)
    product.save(req.session.user.userid)
    .then(()=>{
        return res.redirect("/")
    })
    .catch((err)=>{console.log(err)})
}

exports.getProducts=(req,res)=>{
    Product.fetchAll()
    .then(([rows,fields])=>{
        res.render("admin/products",  
        {
            products: rows, 
            path:"/admin/products", 
            pagetitle:"Products",
            isauthenticated: req.session.isauthenticated
        })
    })
    .catch((err)=>{console.log(err)})
}

exports.getEditProducts=(req,res)=>{
    const {id} = req.query
    console.log(id)
    Product.findById(id)
    .then(([rows,fields])=>{
        res.render("admin/edit-product",
        {
            product:rows,    
            isauthenticated: req.session.isauthenticated 
        }
        )
    })
    .catch(err=>console.log(err))
}

exports.postEditProducts=(req,res)=>{
    console.log("posteditproduct")
    const {id}= req.query
    const {title, imageURL, price, description}= req.body
    const product = new Product(title, imageURL, price, description)
    product.editProduct(id, 2)
    .then((result) => {
        res.redirect("/admin/products")
    }).catch((err) => {
        console.log(err)
    });
    
}

exports.postDeleteProduct=(req,res)=>{
    const {id} = req.query
    console.log(id)
    Cart.deleteProductFromCart(id)
    .then(() => {
        Product.deleteProduct(id,2)
        .then((result) => {
            res.redirect("/admin/products")
        })
        .catch((err) => {
            console.log(err)
        });
    })
    .catch((err) => {
        console.log(err)
    });
}

