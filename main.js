const express = require('express');
const db = require("./db.js");
const db_msg = require("./db_msg.js")
const productos = new db("productos");
const messages = new db_msg("messages");

const { Server: HTTPServer } = require("http");
const { Server: SocketServer } = require("socket.io");

const app = express();
const httpServer = new HTTPServer(app);
const io = new SocketServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

io.on("connection", async (socket) => {
    console.log(`conectado: ${socket.id}`);
    const mostrarProductos = await productos.getAll();
    const mostrarMessages = await messages.getAll();
    socket.emit("products", mostrarProductos);
    socket.emit("mensajes", mostrarMessages);

    socket.on("new_product", async (data) => {
        const id = await productos.save(data);
        const mostrarProductos = await productos.getAll();
        io.sockets.emit("products", mostrarProductos);
    });

    socket.on("new_msg", async (data) => {
        const msg = await messages.save(data);
        const mostrarMessages = await messages.getAll();
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