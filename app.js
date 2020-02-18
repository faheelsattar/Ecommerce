const express = require("express")
const bodyParser = require("body-parser")
const path= require("path")
const http = require("http")
const app = express()
const {adminroutes}= require("./routesdb/admin")
const shoproutes= require("./routesdb/shop")
const errorController = require("./controllersdb/error")
const db=require("./utils/database")

app.set("view engine", "pug") //specifying the templating engine
app.set("views", "views") // specifying the folder for the templating files
app.use(bodyParser.urlencoded({extended:false}))
/*  app.use("/",(res, req, next)=>{
    console.log("I am middle ware one")
    next()
    })
    app.use((res, req, next)=>{
    console.log("I am middle ware two")
}) */


app.use(express.static(path.join(__dirname, "public"))) //static files ka location batanay kaliye
app.use("/admin",adminroutes)
app.use(shoproutes) 
app.use(errorController.notFoundError)

const server = http.createServer(app)

server.listen("4000",()=>{
    console.log("Server is up and running")
})


