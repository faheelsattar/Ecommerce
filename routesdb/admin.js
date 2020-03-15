const router = require("express").Router()
const path = require("path")
const admincontrollers= require("../controllersdb/admin")
const {sessionChecker} = require("../middlewares/session")


router.get("/add-products" ,sessionChecker, admincontrollers.getAddProducts) //using ths controller in controllers folder

router.post("/add-products", sessionChecker, admincontrollers.saveProducts) //using ths controller in controllers folder

router.get("/products", admincontrollers.getProducts )

router.get("/edit-product", sessionChecker, admincontrollers.getEditProducts)

router.post("/edit-product", sessionChecker, admincontrollers.postEditProducts)

router.post("/delete-product", sessionChecker, admincontrollers.postDeleteProduct)

module.exports.adminroutes = router
