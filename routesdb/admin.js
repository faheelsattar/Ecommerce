const router = require("express").Router()
const path = require("path")
const admincontrollers= require("../controllersdb/admin")

router.get("/add-products" , admincontrollers.getAddProducts) //using ths controller in controllers folder

router.post("/add-products", admincontrollers.saveProducts) //using ths controller in controllers folder

router.get("/products", admincontrollers.getProducts )

router.get("/edit-product", admincontrollers.getEditProducts)

router.post("/edit-product", admincontrollers.postEditProducts)

router.post("/delete-product", admincontrollers.postDeleteProduct)

module.exports.adminroutes = router
