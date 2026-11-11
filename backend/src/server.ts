import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import reportRoutes from './routes/reportRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Verificación de estado (Health Check)
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'OK',
    service: 'Buzón Talento Humano - FAME (Modo Correo Directo)',
    destination_email: process.env.NOTIFICATION_EMAIL || 'sjramos@espe.edu.ec',
    timestamp: new Date().toISOString(),
  });
});

// Rutas para envío de sugerencias y quejas
app.use('/api/reports', reportRoutes);

// Manejador central de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
  console.log(`✉️ Modo Correo Directo activo: Todas las sugerencias se envían a ${process.env.NOTIFICATION_EMAIL || 'sjramos@espe.edu.ec'}`);
  console.log(`⚡ Sin base de datos: arquitectura ultra ligera y sin dependencias.`);
});
