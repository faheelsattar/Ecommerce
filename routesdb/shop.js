const path = require("path")
const router = require("express").Router()
const shopcontrollers = require("../controllersdb/shop")
const {sessionChecker} = require("../middlewares/session")

/*
router.get("/",(req,res)=>{
    console.log(products)
    res.sendFile(path.join(__dirname, "../", "views", "shop.html"))
}) */

//Shows some products
router.get("/", shopcontrollers.getIndex) // using the show prdocuts controllers from controllers folder

//shows all the products
router.get("/products" , shopcontrollers.getProducts)

router.get("/cart", sessionChecker,  shopcontrollers.getCart)

router.post("/cart", sessionChecker, shopcontrollers.postCart)

router.post("/cart-delete-item", sessionChecker, shopcontrollers.postCartDeleteProduct)

router.get("/orders", sessionChecker, shopcontrollers.getOrders)

router.get("/checkout", sessionChecker ,shopcontrollers.getCheckout)

router.get("/product/:productid",shopcontrollers.getProduct)
module.exports = router