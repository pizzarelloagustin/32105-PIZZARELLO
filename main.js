const express = require("express");
const db = require("./db.js");
const app = express();
const productos = new db("productos");

app.get("/", (req, res) => {
    try {
        return res.send("Home");
    } catch (e) {
        return res.status(e).send(e);
    }
});

app.get("/productos", async (req, res) => {
    try {
        const data = await productos.getAll();
        console.log(data)
        return res.send(data);
    } catch (e) {
        return res.status(e).send(e);
    }
});

app.get("/productoRandom", async (req, res) => {
    try {
        const numRandom = Math.floor((Math.random() * 3)+1);
        const data = await productos.getById(numRandom);
        return res.send(data);
    } catch (e) {
        return res.status(e).send(e);
    }
});



app.listen(8080, () => {
    console.log("Iniciado");
});