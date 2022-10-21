import knex from "knex";
import db_mysql_config from "./db_mysql_config.js";
import db_sqlite_config from "./db_sqlite_config.js";

const Knex_products = knex(db_mysql_config);

Knex_products.schema.hasTable('products').then(function (exists) {
    if (!exists) {
        Knex_products.schema
            .createTable("products", (table) => {
                table.increments("id");
                table.string("title");
                table.float("price");
                table.string("thumbnail");
            })
            .then(() => {
                console.log("ok products");
            })
            .catch((e) => console.log(e))
            .finally(() => console.log("Tabla products creada"),Knex_products.destroy());
    } else {
        console.log("La tabla products ya existe");
        Knex_products.destroy();
    }
});

const Knex_msg = knex(db_sqlite_config);

Knex_msg.schema.hasTable('msg').then(function (exists) {
    if (!exists) {
        Knex_msg.schema
            .createTable("msg", (table) => {
                table.increments("id");
                table.string("email");
                table.timestamp('created_at').defaultTo(Knex_msg.fn.now());
                table.string("msg");
            })
            .then(() => {
                console.log("ok msg");
            })
            .catch((e) => console.log(e))
            .finally(() => console.log("Tabla msg creada"),Knex_msg.destroy());
    } else {
        console.log("La tabla msg ya existe");
        Knex_msg.destroy();
    }
});