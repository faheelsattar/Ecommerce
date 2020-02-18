const Product = require("../modelsdb/product")

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
            pagetitle:"Products"
        })
    })
    .catch((err)=>{console.log(err)})
}

exports.getEditProducts=(req,res)=>{
    const {id} = req.query
    console.log(id)
    Product.findById(id, (product)=>{
        res.render("admin/edit-product",
        {
            product:product,     
        }
        )
    })
}

exports.postEditProducts=(req,res)=>{
    console.log("posteditproduct")
    const {id}= req.query
    const {title, imageURL, price, description}= req.body
    Product.editProduct(id, title, imageURL, price, description)
    res.redirect("/admin/products")
}

exports.postDeleteProduct=(req,res)=>{
    const {id} = req.query
    console.log(id)
    Product.deleteProduct(id)
    res.redirect("/admin/products")
}