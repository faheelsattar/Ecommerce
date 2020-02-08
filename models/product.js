const product =[]

class Product {
    constructor(title){
        this.title= title
    }

    save(){
        console.log(this)
        product.push({title:this.title})
    }

    static fetchAll(){
        return product
    }
}

module.exports = Product