import { Sequelize } from "sequelize";

const config = require("./config.cjs");

const env = process.env.APP_ENV || "development";
export const sequelize = new Sequelize(config[env]);
