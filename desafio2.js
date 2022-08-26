const fs = require("fs");

class Contenedor {

    constructor(archivo) {
        this.archivo = archivo;
    }

    async save(obj) {
        try {
            const data = await fs.promises.readFile(`./data/${this.archivo}.txt`, "utf-8");
            const productos = JSON.parse(data);
            const id = productos.length + 1;
            obj.id = id;
            productos.push(obj);
            const productosString = JSON.stringify(productos);
            await fs.promises.writeFile(`./data/${this.archivo}.txt`, productosString);
            return "Producto Guardado";
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        try {
            const data = await fs.promises.readFile(`./data/${this.archivo}.txt`, "utf-8");
            const productos = JSON.parse(data);
            const producto = productos.find((producto) => producto.id == id);
            if (producto) {
                return producto;
            } else {
                return null;
            }
        } catch (error) {
            return {};
        }

    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(`./data/${this.archivo}.txt`, "utf-8");
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async deleteById(id) {
        try {
            const data = await this.getAll();
            const dataSinId = data.filter(producto => producto.id != id);
            const dataSinIdString = JSON.stringify(dataSinId);
            await fs.promises.writeFile(`./data/${this.archivo}.txt`, dataSinIdString);
            return dataSinId;
        } catch (error) {
            return error
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(`./data/${this.archivo}.txt`, "[]");
            return [];
        } catch (error) {
            return error
        }
    }
}

async function start() {
    const db = new Contenedor("productos");
    const producto1 = await db.save({ title: "celular", price: "100000", thumbnail: "https://www.freepik.es/fotos-vectores-gratis/celular" });
    console.log(producto1)
    const producto2 = await db.save({ title: "notebook", price: "500000", thumbnail: "https://www.freepik.es/fotos-vectores-gratis/notebook" });
    console.log(producto2)
    const producto3 = await db.save({ title: "televisor", price: "200000", thumbnail: "https://www.freepik.es/fotos-vectores-gratis/televisor" });
    console.log(producto3)
    const producto2id = await db.getById(2);
    console.log(producto2id);
    const producto5 = await db.getById(5);
    console.log(producto5);
    const productos = await db.getAll();
    console.log(productos);
    const producto2delete = await db.deleteById(2);
    console.log(producto2delete);
    const productosDelete = await db.deleteAll();
    console.log(productosDelete);
}

start();