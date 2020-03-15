const db= require("../utils/database")

class User{
    constructor(name, email, password){
        this.name=name
        this.email=email
        this.password= password
    }
    
    static checkUser(email){
        const query = "select email from users where email= ?"
        return db.execute(query, [email])
    }

    addUser(){
        const query= "insert into users(name, email, password) values(?,?,?)"
        return db.execute(query, [this.name, this.email, this.password])
    }

    static checkPassword(email){
        const query = "select id, email, password from users where  email= ?"
        return db.execute(query, [email])
    }
}

module.exports= User 