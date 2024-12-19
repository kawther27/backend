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

// Synchroniser la base de données
database.sync({ alter: true });

const app = express();

// Utilisation des modules importes
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Définir les routes
app.use('/api/testimonials', testimonialsRoute);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoute);
app.use('/public', express.static('public'));

const port = 5000;

app.listen(port, () => console.log(`Notre serveur tourne sur le port ${port}`));
