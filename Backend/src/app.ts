import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});