const express = require("express");
const { Router } = express;
const router = Router();

const Productos = [];

router.get("/", (req, res) => {
    //const { nombre, apellido, edad } = req.body;
    //Personas.push({ nombre, apellido, edad });
    //res.send({ agregado: { nombre, apellido, edad } });
    res.send(Productos)
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    productoById = Productos.find((producto) => producto.id == id);
    if (productoById) {
        return res.send(productoById);
    } else {
        return res.send({ error: "Producto no encontrado" });
    }
});

router.post("/", (req, res) => {
    const { title, price, thumbnail } = req.body;
    id = Productos.length + 1;
    Productos.push({ title, price, thumbnail, id });
    res.send({ Agregado: { title, price, thumbnail, id } });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;
    productoById = Productos.find((producto) => producto.id == id);
    indexById = Productos.indexOf(productoById);
    if (indexById) {
        Productos[indexById] = { title, price, thumbnail, id };
        return res.send({ Actualizado: { title, price, thumbnail, id } });
    } else {
        return res.send({ error: "Producto no encontrado" });
    }
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    productoById = Productos.find((producto) => producto.id == id);
    indexById = Productos.indexOf(productoById);
    if (indexById) {
        // Guardo objeto vacio, porque si elimino la posicion el array final tendra dimendion -1
        // y cuuando quiera agregar el siguiente producto, tendre dos productos con el mismo id final
        Productos[indexById] = {};
        return res.send({ Eliminado: {} });
    } else {
        return res.send({ error: "Producto no encontrado" });
    }
});

module.exports = router;