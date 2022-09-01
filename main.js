const express = require("express");

const app = express();


app.get("/", async (req, res) => {
    try {
        return res.send("prueba");
    } catch (e) {
        return res.status(e).send(e);
    }
});



app.listen(8080, () => {
    console.log("Iniciado");
});