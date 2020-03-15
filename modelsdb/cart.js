const db = require("../utils/database")

class Cart{

    static createCart(userid){
        const query ="insert into cart (userid, createdAt) values(?,NOW())"
        return db.execute(query, [userid])
    }

    static getProducts(productid,){
        const query= "select id,quantity from cartitems where cartId=? and productId=?"
        return db.execute(query, [1,productid])
    }

    static addProducts(productid, cartid, productexists, quantity){
        let query
        if(productexists){
            query ='update cartitems set quantity=? where cartId=? and productId=? '
            return db.execute(query,[quantity,cartid,productid])
        }else{
            query ="insert into cartitems (quantity, cartId, productId) values(?,?,?)"
            return db.execute(query,[quantity,cartid,productid])
        }
    }

    static getCartId(userid){
        const query= "select id from cart where userid=?"
        return db.execute(query, [userid])
    }
    static getCart(cartid){
        const query = "select products.id, products.title, cartitems.quantity from products inner join cartitems on products.Id = cartitems.productId where cartitems.cartId=?"
        return db.execute(query,[cartid])
    }

    static deleteCart(productid,cartid){
        const query = "DELETE FROM cartitems where cartId=? and productId = ?"
        return db.execute(query,[cartid,productid])
    }

    static deleteProductFromCart(id){
        const query ="delete from  cartitems where productId=?"
        return db.query(query,[id])
    }
}

module.exports= Cart