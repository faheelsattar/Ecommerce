const db = require("../utils/database")

class Cart{
    static getProducts(productid){
        const query= "select id,quantity from cartitems where cartId=? and productId=?"
        return db.execute(query, [1,productid])
    }

    static addProducts(productid, productexists, quantity){
        let query
        if(productexists){
            query ='update cartitems set quantity=? where cartId=? and productId=? '
            return db.execute(query,[quantity,1,productid])
        }else{
            query ="insert into cartitems (quantity, cartId, productId) values(?,?,?)"
            return db.execute(query,[quantity,1,productid])
        }
    }

    


}

module.exports= Cart