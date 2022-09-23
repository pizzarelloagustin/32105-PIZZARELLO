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
            const data = await fs.promises.readFile(`./data/${this.archivo}.txt`, "utf-8");
            const messages = JSON.parse(data);
            const id = messages.length + 1;
            obj.id = id;
            messages.push(obj);
            const messagesString = JSON.stringify(messages);
            await fs.promises.writeFile(`./data/${this.archivo}.txt`, messagesString);
            return id;
        } catch (error) {
            return error;
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

}

module.exports = Contenedor;