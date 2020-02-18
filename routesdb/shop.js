const path = require("path")
const router = require("express").Router()
const shopcontrollers = require("../controllersdb/shop")
/*
router.get("/",(req,res)=>{
    console.log(products)
    res.sendFile(path.join(__dirname, "../", "views", "shop.html"))
}) */

//Shows some products
router.get("/", shopcontrollers.getIndex) // using the show prdocuts controllers from controllers folder

//shows all the products
router.get("/products" , shopcontrollers.getProducts)

router.get("/cart", shopcontrollers.getCart)

router.post("/cart", shopcontrollers.postCart)

router.post("/cart-delete-item", shopcontrollers.postCartDeleteProduct)

router.get("/orders", shopcontrollers.getOrders)

router.get("/checkout", shopcontrollers.getCheckout)

router.get("/product/:productid",shopcontrollers.getProduct)
module.exports = router