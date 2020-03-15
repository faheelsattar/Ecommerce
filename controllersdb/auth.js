const User = require("../modelsdb/user")
const bcrypt = require("bcryptjs")
const Shop = require("../modelsdb/cart")

exports.getLogin=(req,res)=>{
    console.log(req.session)
    res.render("auth/login" , 
    {
        path:"/auth/login",
        isauthenticated: req.session.isauthenticated
    })
}

exports.postLogin=(req,res)=>{
    const {email, password} = req.body
    User.checkUser(email)
    .then(([rows,fields]) => {
        if (rows.length>0){
            User.checkPassword(rows[0].email)
            .then(([rows,fields]) => {
                bcrypt.compare(password, rows[0].password)
                .then((match)=>{
                    if(match){
                        Shop.getCartId(rows[0].id)
                        .then(([cart]) => {
                            req.session.isauthenticated=true
                            req.session.user= {
                            userid : rows[0].id,
                            useremail: rows[0].email,
                            cartid:cart[0].id
                        }
                        return res.redirect("/")
                        }).catch((err) => {
                            console.log(err)
                        });
                        
                    }else{
                        return  res.redirect("/auth/login")
                    }
                })
                .catch(err=>console.log(err))
            }).catch((err) => {
                console.log(err)
            });
        }else{
            return res.redirect("/auth/signup")
        }
    })
    .catch((err) => {
        console.log(err)
    });
}

exports.getSignup=(req,res)=>{
    res.render("auth/signup" , 
    {
        path:"/auth/signup",
        isauthenticated: req.session.isauthenticated
    })
}

exports.checkUser=(req,res,next)=>{
    const {email} = req.body
    User.checkUser(email)
    .then(([rows,fields]) => {
        if (rows.length>0){
            return res.redirect("/")
        }else{
            next()
        }
    }).catch((err) => {
        console.log(err)
    });
}

exports.postSignup=(req,res)=>{
    const {name, email, password}= req.body
    bcrypt.hash(password, 12)
    .then((result)=>{
        const user = new User(name, email, result)
        user.addUser()
        .then(([result]) => {
            console.log(result.insertId)
            Shop.createCart(result.insertId)
            .then((result) => {
                res.redirect("/auth/login")
            }).catch((err) => {
                console.log(err)
            });
            
        }).catch((err) => {
            console.log(err)
        });
    })
    .catch(err=>console.log(err))
    
}

exports.postLogout=(req,res)=>{
    req.session.destroy((err)=>{
        console.log(err)
        res.redirect("/")
    })
}