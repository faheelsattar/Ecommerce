const path = require("path")
const fs= require("fs")

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
)
class Cart{
    static addToCart(id, prodprice){        //[{prodid, prodprice},so], [{},so]
        fs.readFile(p,(err,filecontent)=>{
            let cart = {product:[], totalprice:0}
            if(!err){
                cart =  JSON.parse(filecontent)
            }     
            const productexistsindex= cart.product.findIndex(prod=> prod.id === id)     
            const productexists = cart.product[productexistsindex] 
            let updateproduct
            if (productexists){
                updateproduct = {...productexists}
                updateproduct.quantity= updateproduct.quantity+ 1
                cart.product[productexistsindex]= updateproduct
            }else{
                updateproduct={id: id, quantity:1}
                console.log(cart.product)
                cart.product=[...cart.product , updateproduct]
            }
            cart.totalprice=cart.totalprice + +prodprice
            fs.writeFile(p,JSON.stringify(cart), (err)=>{
                console.log(err)
            })
        })
        
    }
 
    static deleteProduct(id, productprice){
        fs.readFile(p,(err,filecontent)=>{
            let cart= JSON.parse(filecontent)
            if(err){
                return
            }else{
                const productindex =cart.product.findIndex(prod => prod.id === id)
                const {quantity} = cart.product[productindex]
                cart.product.splice(productindex, 1)
                cart.totalprice= cart.totalprice- (quantity*productprice)
                fs.writeFile(p, JSON.stringify(cart), (err)=>{
                    if(err){
                        console.log(err)
                    }
                })
           
            } 
        })
    }

    static getCart(cb){
        fs.readFile(p, (err,filecontent)=>{
            const cart = JSON.parse(filecontent)
            if(err){
                cb(null)
            }else{
                cb(cart)
            }
        })
    }
}

module.exports= Cart