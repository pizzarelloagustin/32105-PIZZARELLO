const fs = require('fs');

class productManager {

    constructor(fileName) {
        this.fileName = `./public/files/${fileName}.json`
    }
    
    async readProducts() {
        let data = await fs.promises.readFile(this.fileName,'utf-8');
        let products = JSON.parse(data);
        return products;
    }

    async save(newProduct) {
        if(!producto.title || !producto.description || !producto.code || !producto.stock || !producto.price || !producto.thumbnail) {
            return {status:"error", error:"missing field"}
        }
        try{
            if(fs.existsSync(this.fileName)) {
                let products = await this.readProducts();
                // Me costo, pero me di cuenta que con este metodo solucionas el problema de eliminar un
                // elemento del json products y no te repide id
                let id = products[products.length-1].id+1;
                newProduct.id = id;
                newProduct.timestamp = Date.now();
                products.push(newProduct);
                await fs.promises.writeFile(this.fileName, JSON.stringify(products,null,2))
                return {status:"success",message:"Product created"}
            }else{
                newProduct.id = 1;
                newProduct.timestamp = Date.now();
                await fs.promises.writeFile(this.fileName, JSON.stringify([newProduct],null,2));
                return {status: "success", message: "Product created"};
            }
        }catch(error){
            return {status:"error", message: error}
        }
    }

    async getAll() {
        try{
            if(fs.existsSync(this.fileName)) {
                let products = await this.readProducts();
                return {status:"success", products: products}
            }else{
                return {status:"Error", error: "File does not exist."}
            }
        }catch(error){
            return {status:"error", message: error}
        }
    }

    async getById (id) {
        if(!id) {
            return {status:"error", error:"ID needed"}
        }
        try{
            if(fs.existsSync(this.fileName)) {
                let products = await this.readProducts();
                let product = products.find(p => p.id === id);
                if(product) {
                    return {status:"success", product: product}
                }else{
                    return {status:"error", error: "Product not found"}
                }
            }
        }catch(error){
            return {status:"error", message: error}
        }
    }

    async updateById(id,productUpdate) {
        if(!productUpdate.title || !productUpdate.price || !productUpdate.thumbnail) {
            return {status:"error", error:"missing field"}
        }
        try{
            if(fs.existsSync(this.fileName)){
                let products = await this.readProducts();
                let product = products.findIndex(p => p.id === id);
                // Tengo que agregar la condicion 0 porque sino no puedo modificar el primer elemento
                if(product || product === 0) {
                    products[product].title = productUpdate.title;
                    products[product].price = productUpdate.price;
                    products[product].thumbnail = productUpdate.thumbnail;
                    await fs.promises.writeFile(this.fileName,JSON.stringify(products,null,2))
                    return {status:"success",message:"Product Modified"}
                }else{
                    return {status:"error", error:"Product not found", product:product}
                }
            }
        }catch(error){
            return {status:"error", message: error}
        }
    }

    async deleteById(id) {
        if(!id) {
            return {status:"error", error:"ID needed"}
        }
        try{
            if(fs.existsSync(this.fileName)){
                let products = await this.readProducts();
                let product = products.find(p => p.id === id);
                if(product) {
                    products.splice(product.id-1,1);
                    await fs.promises.writeFile(this.fileName, JSON.stringify(products,null,2))
                    return {status:"success", message:"Product deleted"}
                }else{
                    return {status:"error", error:"Product not found"}
                }
            }
        }catch(error){
            return {status:"error", message: error}
        }
    }

}

module.exports = productManager;