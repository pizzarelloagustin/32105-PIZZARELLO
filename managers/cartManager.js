const fs = require('fs');

class cartManager {
    constructor(fileName) {
        this.fileName = `./public/files/${fileName}.json`
    }

    async readCarts() {
        let data = await fs.promises.readFile(this.fileName,'utf-8');
        let carts = JSON.parse(data);
        return carts;
    }
    
    async save() {
        try{
            if(fs.existsSync(this.fileName)){
                let carts = await this.readCarts();
                let id = carts[carts.length-1].id+1;
                let cart = {
                    "id" : id,
                    "timestamp" : Date.now(),
                    "products" : []
                };
                carts.push(cart);
                await fs.promises.writeFile(this.fileName,JSON.stringify(carts,null,2))
                return {status:"success",message: `Cart created. Cart ID : ${cart.id}`}
            }else{
                let cart = {
                    "id" : 1,
                    "timestamp" : Date.now(),
                    "products" : []
                };
                await fs.promises.writeFile(this.fileName,JSON.stringify([cart],null,2));
                return {status:"success",message: `Cart created. Cart ID : ${cart.id}`}
            }
        }catch(error){
            return {status:"error",message:error}
        }
    }

    async deleteById(id) {
        if(!id) {
            return {status:"error", error:"ID needed"}
        }
        try{
            if(fs.existsSync(this.fileName)){
                let carts = await this.readCarts();
                let cart = carts.findIndex(p => p.id === id);
                //Esta es la otra forma de borrar el index 0
                cart = cart + 1;
                if(cart) {
                    carts.splice(cart-1,1);
                    await fs.promises.writeFile(this.fileName,JSON.stringify(carts,null,2))
                    return {status:"success",message:"Cart deleted"}
                }else{
                    return {status:"error", error:"Cart not found"}
                }
            }
        }catch(error){
            return {status:"error",message:error}
        }
    }

    async getProductsByCartId(id) {
        if(!id) return {status:"error", error:"ID needed"}
        try{
            if(fs.existsSync(this.fileName)){
                let carts = await this.readCarts();
                let cart = carts.find(p => p.id === id);
                if(cart) {
                    return {status:"success",products:cart.products}
                }else{
                    return {status:"error", error:"Cart not found"}
                }
            }
        }catch(error){
            return {status:"error",message:error}
        }
    }

    async addProductToCartById(id,product) {
        if(!id || !product) {
            return {status:"error", error:"missing field"}
        }
        try{
            if(fs.existsSync(this.fileName)){
                let carts = await this.readCarts();
                let cart = carts.findIndex(p => p.id === id);
                carts[cart].products.push(product);
                await fs.promises.writeFile(this.fileName,JSON.stringify(carts,null,2))
                return {status:"success",message: `product added to Cart ID ${carts[cart].id}`}
            }
        }catch(error){
            return {status:"error",message:error}
        }
    }

    async deleteProductInCartById(cartId,productId){
        if(!productId || !cartId){
            return {status:"error", error:"missing field"}
        }
        try{
            if(fs.existsSync(this.fileName)){
                let carts = await this.readCarts();
                let cartIndex = carts.findIndex(c => c.id === cartId);
                let productIndex = carts[cartIndex].products.findIndex(p => p === productId);
                // Otra forma de contemplar index 0
                if(cartIndex >= 0 || productIndex >= 0){
                    carts[cartIndex].products.splice(productIndex,1);
                    await fs.promises.writeFile(this.fileName,JSON.stringify(carts,null,2))
                    return {status:"success",message:`Product ${productId} inside cart ${cartId} deleted`}
                }else{
                    return {status:"error", error:"Cart/Product not found"}
                }
            }
        }catch(error){
            return {status:"error",message:error}
        }
    }
}

module.exports = cartManager;