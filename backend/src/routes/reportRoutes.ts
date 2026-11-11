import { Router } from 'express';
import { ReportController } from '../controllers/reportController';

const router = Router();

// Endpoint para enviar sugerencia, queja o reporte por correo
router.post('/', ReportController.createReport);

export default router;
