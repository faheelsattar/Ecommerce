const express = require("express")
const bodyParser = require("body-parser")
const path= require("path")
const http = require("http")
const app = express()
const {adminroutes}= require("./routesdb/admin")
const shoproutes= require("./routesdb/shop")
const errorController = require("./controllersdb/error")
const authroutes = require("./routesdb/auth")
const session = require("express-session")
const mysqlstore = require('express-mysql-session')(session);
const csrf = require("csurf")

const store = new mysqlstore({
    host: 'localhost',
    port: 3306,
    user:"root",
    database:"ecommerce",
    password:"",
    createDatabaseTable:true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'custom_session_id',
            expires: 'custom_expires_column_name',
            data: 'custom_data_column_name'
        }
    }
});

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

app.use(session({
    name: "userid",
    secret: "iudhiauad042das\d;sa]dmasdsahdbsidasjopc",
    store: store,
    resave:false,
    saveUninitialized:false,
}))

app.use(csrf())
app.use(express.static(path.join(__dirname, "public"))) //static files ka location batanay kaliye

app.use((req,res,next)=>{
    res.locals.csrfToken= req.csrfToken()
    next()
})
app.use("/admin",adminroutes)
app.use("/auth",authroutes)
app.use(shoproutes) 
app.use(errorController.notFoundError)

const server = http.createServer(app)

server.listen("4000",()=>{
    console.log("Server is up and running")
})




