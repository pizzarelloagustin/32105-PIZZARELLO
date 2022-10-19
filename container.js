import knex from "knex";

class DBcontainer {

    constructor(config, tabla) {
        this.knex = knex(config);
        this.table = tabla;
    }

    async getAll() {
        try {
            return await this.knex.select("*").from(this.table);
        } catch (e) {
            throw new Error(e);
        }
    }

    async InsertValue(obj) {
        try {
            return await this.knex.insert(obj).into(this.table);
        } catch (e) {
            throw new Error(e);
        }
    }

    async updateEntry(obj, id) {
        try {
            return await this.knex.from(this.table).where("id", id).update(obj);
        } catch (e) {
            throw new Error(e);
        }
    }

    async getbyId(id) {
        try {
            return await this.knex.select("*").from(this.table).where({ id });
        } catch (e) {
            throw new Error(e);
        }
    }
    
    async deleteEntry(id) {
        try {
            return await this.knex.from(this.table).where({ id }).del();
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default DBcontainer;