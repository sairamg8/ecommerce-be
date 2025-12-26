import mongoose from "mongoose";
import { Sequelize } from "sequelize";

const config = require("./config.cjs");

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI!);

  console.log("Mongoose connected");
};

const env = process.env.APP_ENV || "development";
export const sequelize = new Sequelize(config[env]);
