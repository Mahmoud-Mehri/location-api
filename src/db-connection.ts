import { Sequelize } from "sequelize";
import config from "./config";

export const sqlConnection = new Sequelize(
  "locationdb",
  "testuser",
  "testpass",
  {
    dialect: "postgres",
    host: config.postgres.host,
    port: config.postgres.port,
    logging: config.postgres.logging,
  }
);
