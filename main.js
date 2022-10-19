import db_mysql_config from "./db_mysql_config.js";
import db_sqlite_config from "./db_sqlite_config.js";
import express from "express";
import DBcontainer from "./container.js";

const app = express();

const DB_products = new DBcontainer(db_mysql_config, "products");
const DB_msg = new DBcontainer(db_sqlite_config, "msg");


app.use(express.json());
app.set("json spaces", 2);


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



app.listen(8080, () => {
    console.log("Server on");
});