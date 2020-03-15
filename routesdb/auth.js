const router = require("express").Router()
const authcontroller= require("../controllersdb/auth")
const {sessionChecker} = require("../middlewares/session")


router.get("/login",authcontroller.getLogin)

router.post("/login",authcontroller.postLogin)

router.get("/signup",authcontroller.getSignup)

router.post("/signup",authcontroller.checkUser,authcontroller.postSignup)

router.post("/logout", sessionChecker, authcontroller.postLogout)

module.exports = router