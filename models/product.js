const path = require("path")
const fs= require("fs")

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
}

module.exports = Product