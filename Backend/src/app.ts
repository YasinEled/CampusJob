import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importa cors
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use(cors({
    origin: 'https://www.teachandlearn.cat', // Permitir solicitudes desde este dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
}));

// Middleware para analizar JSON
app.use(bodyParser.json());

// Rutas
app.use('/api/auth/login', authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});