// Importations des modules necessaires
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Importer la base de données et les routes
import database from './config/connexion.js';
import testimonialsRoute from './routes/testimonials.js';
import authRoutes from './routes/auth.js'; 
import userRoute from './routes/users.js';

// synchronizes the Sequelize models with the database
database.sync({ alter: true });

const app = express();

// Utilisation des modules importes
app.use(cors());//Ensures API can handle requests from different origins.
app.use(compression());//Optimizes API response sizes.
app.use(helmet());//Adds security headers to your API.
app.use(bodyParser.json());//Parses incoming JSON and URL-encoded data.
app.use(bodyParser.urlencoded({ extended: false }));

// Définir les routes/endpoints
app.use('/api/testimonials', testimonialsRoute);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoute);
app.use('/public', express.static('public'));//for serving static files like images or other assets.

const port = 5000;

app.listen(port, () => console.log(`Notre serveur tourne sur le port ${port}`));
