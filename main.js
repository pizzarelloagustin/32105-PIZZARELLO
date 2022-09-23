const express = require('express');
const handlebars = require('express-handlebars');
const db = require("./db.js");
const db_msg = require("./db_msg.js")
const productos = new db("productos");
const messages = new db_msg("messages");
const path = require('path');

const { Server: HTTPServer } = require("http");
const { Server: SocketServer } = require("socket.io");

const app = express();
const httpServer = new HTTPServer(app);
const io = new SocketServer(httpServer);

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
/*
app.post("/api/productos", async (req,res) => {
    const { title, price, thumbnail } = req.body;
    const id = await productos.save({ title, price, thumbnail });
    return res.redirect("/");
})
*/
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

io.on("connection", async (socket) => {
    console.log(`conectado: ${socket.id}`);
    const mostrarProductos = await productos.getAll();
    //const mostrarMessages = await messages.getAll();
    socket.emit("products", mostrarProductos);
    //socket.emit("mensajes", mostrarMessages);

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