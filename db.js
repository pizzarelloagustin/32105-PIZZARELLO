//const { create } = require("domain");
const fs = require("fs");

class Contenedor {

    constructor(archivo) {
        this.archivo = archivo;
        this.create();
    }

    async create() {
        try {
            await fs.promises.writeFile(`./data/${this.archivo}.txt`, "[]");
            return [];
        } catch (error) {
            return error
        }
    }

    async save(obj) {
        try {
            // no funciona si no existe el archivo
            const data = await fs.promises.readFile(`./data/${this.archivo}.txt`, "utf-8");
            const productos = JSON.parse(data);
            const id = productos.length + 1;
            obj.id = id;
            productos.push(obj);
            const productosString = JSON.stringify(productos);
            await fs.promises.writeFile(`./data/${this.archivo}.txt`, productosString);
            return id;
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

module.exports = Contenedor;