const express = require("express");
const productsRouter = require('./routes/productsRouter');
const cartRouter = require('./routes/cartRouter')


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(__dirname + "/public"));

app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

app.listen(8080, () => {
    try{
        console.log("Server Iniciado")
    } catch (e) {
        console.log("Server Error", e)
    }
});