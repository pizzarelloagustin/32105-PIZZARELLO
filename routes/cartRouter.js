const express = require('express');
const cartManager = require('../managers/cartManager')

const router = express.Router();

const carts = new cartManager('carts');

router.post('/', async (req,res) => {
    const cart = await carts.save();
    res.send(cart);
})

router.delete('/:id', async (req,res) => {
    let params = req.params;
    id = parseInt(params.id)
    const cart = await carts.deleteById(id);
    res.send(cart);
})

router.get('/:id/products', async (req,res) =>{
    let params = req.params;
    id = parseInt(params.id);
    const allProductsInCart = await carts.getProductsByCartId(id);
    res.send(allProductsInCart);
})

router.post('/:id/products', async (req,res) => {
    let product = req.body;
    let params = req.params;
    id = parseInt(params.id);
    const addProductToCartById = await carts.addProductToCartById(id,product);
    res.send(addProductToCartById);
})

router.delete('/:id/products/:idProd', async (req,res) => {
    let cartId = req.params.id;
    let productId = req.params.idProd;
    cartId = parseInt(cartId);
    productId = parseInt(productId);
    const deleteProductInCartById = await carts.deleteProductInCartById(cartId,productId);
    res.send(deleteProductInCartById);
})

module.exports = router;