const router = require("express").Router()
const path = require("path")
const admincontrollers= require("../controllers/admin")

router.get("/add-products" , admincontrollers.getAddProducts) //using ths controller in controllers folder

router.post("/add-products", admincontrollers.saveProducts) //using ths controller in controllers folder

router.get("/products", admincontrollers.products )

module.exports.adminroutes = router
