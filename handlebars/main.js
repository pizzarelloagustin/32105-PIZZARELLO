const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const db = require("./db.js");
const productos = new db("productos");
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.engine("hbs", handlebars.engine({
    extname: "hbs",
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "index",
}));

app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/", (req,res) => {
    res.render("index", {
        layout: "registro",
    })
})

app.post("/api/productos", async (req,res) => {
    const { title, price, thumbnail } = req.body;
    const id = await productos.save({ title, price, thumbnail });
    return res.redirect("/");
})

app.get("/productos", async (req,res) => {
    const mostrarProductos = await productos.getAll();
    res.render("index", {
        layout: "productos",
        mostrarProductos,
    })
})

app.get("/registro", (req,res) => {
    res.render("index", {
        layout: "registro",
    })
})

app.listen(8080, () => {
    try{
        console.log("Server Iniciado")
    } catch (e) {
        console.log("Server Error", e)
    }
});