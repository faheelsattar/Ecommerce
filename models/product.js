const path = require("path")
const fs= require("fs")
const Cart = require("./cart")

const p =path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
)

const getAllProducts= (cb)=>{
    fs.readFile(p , (err, filecontent)=>{
        if (err){
            cb([])
        }else{
           cb(JSON.parse(filecontent))
        }      
    })
}

class Product {
    constructor(title, imageURL, price, description){
        this.id=Math.random().toString()
        this.title= title   
        this.imageURL=imageURL
        this.price= price
        this.description= description
    }

    save(){
        getAllProducts((products)=>{
            products.push({
                id: this.id,
                title:this.title,
                imageURL: this.imageURL,
                price: this.price,
                description: this.description
            })

            fs.writeFile(p, JSON.stringify(products), (err) =>{
                console.log(err)
            })
        })
    }

    static fetchAll(cb){
        getAllProducts(cb) //higher order function
    }

    static findById(id, cb){
        var product =[]
        this.fetchAll((products) =>{
            const product= products.filter(prod => prod.id === id)
            cb(product)
        })
    }

    static editProduct(id, title, imageURL, price, description){
        this.fetchAll((products) =>{
            const productindex= products.findIndex(prod => prod.id === id )
            console.log(productindex, "index")
            products[productindex].id=id
            products[productindex].title= title
            products[productindex].imageURL= imageURL
            products[productindex].price= price
            products[productindex].description= description
            fs.writeFile(p,JSON.stringify(products) , (err)=>{
                console.log(err)
            } ) 
        })
    }

    static deleteProduct(id){
        this.fetchAll((products)=>{
            const productindex = products.findIndex(prod=> prod.id === id)
            const price = products[productindex].price
            products.splice(productindex,1)
            fs.writeFile(p , JSON.stringify(products),(err)=>{
                if(!err){
                    Cart.deleteProduct(id, price)
                }
            })
        })
    }
}



module.exports = Product