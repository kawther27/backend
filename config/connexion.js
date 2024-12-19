//Connexion à la base de donnee (connexion.js)
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const database = new Sequelize
(    process.env.DB_NAME,
     process.env.DB_USER, 
     process.env.DB_PASSWORD,
 {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT, 
  port: process.env.DB_PORT,
  logging: false,
});

export default database;


