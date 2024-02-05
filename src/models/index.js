// models/index.js

import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import process from "process";
import { fileURLToPath } from "url";
import configJson from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configJson[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

const importModels = async () => {
    const files = fs
        .readdirSync(__dirname)
        .filter(
            (file) =>
                file.indexOf(".") !== 0 &&
                file !== basename &&
                file.slice(-3) === ".js" &&
                file.indexOf(".test.js") === -1
        );

    const modelPromises = files.map(async (file) => {
        const modulePath = path.resolve(__dirname, file);
        const module = await import(`file://${modulePath}`);
        const model = module.default(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

    await Promise.all(modelPromises);
};

await importModels();

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
