const db= require("../utils/database")
const Cart = require("./cart")


class Product {
    constructor(title, imageURL, price, description){
        this.id=Math.random().toString()
        this.title= title   
        this.imageURL=imageURL
        this.price= price
        this.description= description
    }
    save(){
        const query="insert into products(title, price, description, imageURL) values(?,?,?,?)"
        return db.execute(query,[this.title, this.price, this.description, this.imageURL])     
    }

    static fetchAll(){
        const query= `select * from products`
        return db.execute(query)
    }

    static findById(id, cb){

    }

    static editProduct(id, title, imageURL, price, description){
        
    }

    static deleteProduct(id){
    }
}



module.exports = Product