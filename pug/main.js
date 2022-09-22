const express = require('express');
const app = express();
const db = require("./db.js");
const productos = new db("productos");
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "pug");

app.get("/", (req,res) => {
    res.render("registro")
})

app.post("/api/productos", async (req,res) => {
    const { title, price, thumbnail } = req.body;
    const id = await productos.save({ title, price, thumbnail });
    return res.redirect("/");
})

app.get("/productos", async (req,res) => {
    const mostrarProductos = await productos.getAll();
    res.render("productos", {
        mostrarProductos,
    })
})

app.get("/registro", (req,res) => {
    return res.redirect("/");
})

app.listen(8080, () => {
    try{
        console.log("Server Iniciado")
    } catch (e) {
        console.log("Server Error", e)
    }
});