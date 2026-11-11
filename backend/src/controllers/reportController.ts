import { Request, Response, NextFunction } from 'express';
import { sendReportNotification, ReportMailData } from '../services/emailService';

export class ReportController {
  /**
   * POST /api/reports
   * Recibir sugerencia o denuncia y despachar el correo electrónico a Talento Humano
   */
  public static async createReport(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        title,
        description,
        type,
        is_anonymous,
        reporter_name,
        reporter_department,
      } = req.body;

      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        res.status(400).json({ error: 'El campo Asunto es obligatorio.' });
        return;
      }

      if (!description || typeof description !== 'string' || description.trim().length === 0) {
        res.status(400).json({ error: 'El campo de mensaje o detalle es obligatorio.' });
        return;
      }

      const MAX_CHARS = 400;
      if (description.trim().length > MAX_CHARS) {
        res.status(400).json({ error: `El mensaje no puede superar el límite de ${MAX_CHARS} caracteres.` });
        return;
      }

      const validTypes = ['SUGERENCIA', 'DENUNCIA'];
      const finalType = validTypes.includes(type) ? type : 'SUGERENCIA';

      const mailData: ReportMailData = {
        title: title.trim(),
        description: description.trim(),
        type: finalType as any,
        is_anonymous: Boolean(is_anonymous),
        reporter_name: is_anonymous ? undefined : reporter_name?.trim(),
        reporter_department: is_anonymous ? undefined : reporter_department?.trim(),
        created_at: new Date(),
      };

      // Enviar el correo electrónico
      const result = await sendReportNotification(mailData);

      res.status(200).json({
        success: true,
        message: 'Tu mensaje ha sido enviado exitosamente al correo de Talento Humano.',
        preview_url: result.startsWith('http') ? result : undefined,
      });
    } catch (error) {
      next(error);
    }
  }
}
