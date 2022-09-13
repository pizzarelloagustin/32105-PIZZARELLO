const express = require("express");
const app = express();
const productosRouter = require("./productos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(__dirname + "/public"));

app.use("/api/productos", productosRouter);

app.listen(8080, () => {
  console.log("Server iniciado");
});