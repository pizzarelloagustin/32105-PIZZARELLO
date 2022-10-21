import db_mysql_config from "./db_mysql_config.js";
import db_sqlite_config from "./db_sqlite_config.js";
import express from "express";
import DBcontainer from "./container.js";


import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = new createServer(app);
const io = new Server(httpServer);

const DB_products = new DBcontainer(db_mysql_config, "products");
const DB_msg = new DBcontainer(db_sqlite_config, "msg");


app.use(express.json());
app.set("json spaces", 2);
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

io.on("connection", async (socket) => {
    console.log(`conectado: ${socket.id}`);

    const mostrarProductos = await DB_products.getAll();
    socket.emit("products", mostrarProductos);
    
    const mostrarMessages = await DB_msg.getAll();
    socket.emit("mensajes", mostrarMessages);

    socket.on("new_product", async (data) => {
        await DB_products.InsertValue(data);
        const mostrarProductos = await DB_products.getAll();
        io.sockets.emit("products", mostrarProductos);
    });

    socket.on("new_msg", async (data) => {
        await DB_msg.InsertValue(data);
        const mostrarMessages = await DB_msg.getAll();
        io.sockets.emit("mensajes", mostrarMessages);
    });
});

httpServer.listen(8080, () => {
    try{
        console.log("Server Iniciado")
    } catch (e) {
        console.log("Server Error", e)
    }
});


app.get("/products", async (req, res) => {
    const products = await DB_products.getAll();
    res.send(products);

});

app.post("/products", async (req, res) => {
    const { body } = req;
    await DB_products.InsertValue(body);
    res.send(body);
});

app.put("/products/:id", async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const result = await DB_products.updateEntry(body, id);
    res.send({ result });
});

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    const product = await DB_products.getbyId(id);
    res.send(product);
});

app.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const result = await DB_products.deleteEntry(id);
    res.send({ result });
});

app.get("/msgs", async (req, res) => {
    const msg = await DB_msg.getAll();
    res.send(msg);
});

app.post("/msgs", async (req, res) => {
    const { body } = req;
    await DB_msg.InsertValue(body);
    res.send(body);
});



app.listen(8081, () => {
    console.log("Server on");
});