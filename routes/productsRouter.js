const express = require('express');
const productManager = require('../managers/productManager')
const isAdmin = require('../middleware/validator')

const products = new productManager('products');

const router = express.Router();

const admin = true;

router.get('/', async (req,res) =>{
    const allProducts = await products.getAll();
    res.send(allProducts);
})

router.get('/:id', async (req,res) =>{
    let params = req.params;
    params = parseInt(params.id);
    const allProducts = await products.getById(params);
    res.send(allProducts);
})

router.post('/', isAdmin(admin), async (req,res) => {
    const newProduct = req.body;
    const product = await products.save(newProduct);
    res.send(product);
})

router.put('/:id', isAdmin(admin), async (req,res) => {
    const product = req.body;
    let params = req.params;
    id = parseInt(params.id);
    const updateProduct = await products.updateById(id,product);
    res.send(updateProduct);
})

router.delete('/:id', isAdmin(admin), async (req,res) => {
    let params = req.params;
    params = parseInt(params.id);
    const allProducts = await products.deleteById(params);
    res.send(allProducts);
})

module.exports = router;