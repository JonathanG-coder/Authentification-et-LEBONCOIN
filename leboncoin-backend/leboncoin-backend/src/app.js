import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Pour __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares globaux
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONT_URL, // http://localhost:5173
    credentials: true
}));
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  })
);


// --------------------------
// Servir les fichiers uploadés (avatars, images, etc.)
// --------------------------


app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {

    setHeaders: (res) => {
        // Autoriser le front à charger les images
        res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_URL);
    }
}));

// Routes (exemple)
import authRoutes from './routes/auth.routes.js';
import categoryRoutes from './routes/category.routes.js';
import annonceRoutes from './routes/annonce.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/annonces', annonceRoutes);

export default app;
