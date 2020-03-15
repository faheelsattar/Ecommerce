const sessionChecker=(req,res,next)=>{
    if (req.session.isauthenticated){
        return next()
    }else{
        res.redirect("/auth/login")
    }
}

module.exports.sessionChecker=sessionChecker