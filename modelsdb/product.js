const db= require("../utils/database")
class Product {
    constructor(title, imageURL, price, description){
        this.title= title   
        this.imageURL=imageURL
        this.price= price
        this.description= description
    }

    save(userid){
       const query = 'insert into products (title, price, description, imageURL, userId) values(?,?,?,?,?)'
       return db.execute(query,[this.title,this.price, this.description, this.imageURL,userid])
    }

    static fetchAll(){
        const query= 'select * from products'
        return db.execute(query)
    }

    static findById(id){
        const query= 'select * from products where products.id= ?'
        return db.execute(query,[id])
    }

    editProduct(id, userid){
        const query = "update products set title=?, price=?, description=?, imageURL=? where id= ? and userId=?"
        return db.execute(query,[this.title,this.price, this.description, this.imageURL, id, userid])
    }

    static deleteProduct(id,userid){
        const query ="delete from  products where id=? and userId=?"
        return db.query(query,[id, userid])
    }
}



module.exports = Product