import nodemailer, { Transporter } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export interface ReportMailData {
  title: string;
  description: string;
  type: 'SUGERENCIA' | 'DENUNCIA';
  is_anonymous: boolean;
  reporter_name?: string;
  reporter_department?: string;
  created_at?: Date;
}

let transporter: Transporter | null = null;

async function getTransporter(): Promise<Transporter> {
  if (transporter) {
    return transporter;
  }

  // 1. Si el usuario configuró credenciales SMTP reales en .env (Gmail, Outlook o empresa)
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true', // true para puerto 465, false para 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log(`📧 Servicio de correo conectado con SMTP: ${process.env.SMTP_HOST || 'smtp.gmail.com'} (Remitente: ${process.env.SMTP_USER})`);
    return transporter;
  }

  // 2. Si aún no hay credenciales SMTP reales, usa el simulador Ethereal para generar vista previa
  console.log('🧪 Sin credenciales SMTP en .env: Generando cuenta de prueba Ethereal...');
  const testAccount = await nodemailer.createTestAccount();
  
  transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  console.log(`📧 Simulador de correo activo con usuario de prueba: ${testAccount.user}`);
  return transporter;
}

export async function sendReportNotification(data: ReportMailData): Promise<string> {
  const mailTransporter = await getTransporter();
  const destinationEmail = process.env.NOTIFICATION_EMAIL || '0998736909ramos@gmail.com';

  const typeLabels: Record<string, string> = {
    SUGERENCIA: '💡 SUGERENCIA DE MEJORA',
    DENUNCIA: '🛡️ DENUNCIA CONFIDENCIAL / LABORAL',
  };

  const typeTitle = typeLabels[data.type] || data.type;
  const isAnonymous = data.is_anonymous;
  
  const senderInfo = isAnonymous
    ? '<span style="color: #166534; font-weight: bold; background: #dcfce7; padding: 3px 8px; border-radius: 4px;">🔒 100% Anónimo (Identidad protegida)</span>'
    : `<strong>Nombre:</strong> ${data.reporter_name || 'No especificado'}<br><strong>Área / Departamento:</strong> ${data.reporter_department || 'No especificado'}`;

  const mailOptions = {
    from: `"Buzón Talento Humano - FAME" <${process.env.SMTP_USER || '0998736909ramos@gmail.com'}>`,
    to: destinationEmail,
    subject: `[Buzón RRHH] ${typeTitle}: ${data.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 14px; background-color: #ffffff;">
        
        <!-- Cabecera Institucional FAME -->
        <div style="background-color: #0f172a; color: #ffffff; padding: 20px; border-radius: 10px; margin-bottom: 24px; border-bottom: 4px solid #f59e0b;">
          <h2 style="margin: 0; font-size: 20px; letter-spacing: 0.5px;">Buzón de Talento Humano — FAME</h2>
          <p style="margin: 6px 0 0 0; font-size: 12px; color: #cbd5e1;">Buzón de Escucha Activa y Transparencia</p>
        </div>

        <!-- Tabla de Datos -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
          <tr>
            <td style="padding: 10px 0; color: #64748b; width: 140px;"><strong>Tipo de Mensaje:</strong></td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${typeTitle}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b;"><strong>Asunto:</strong></td>
            <td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${data.title}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b;"><strong>Remitente:</strong></td>
            <td style="padding: 10px 0; color: #0f172a;">${senderInfo}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b;"><strong>Fecha de Envío:</strong></td>
            <td style="padding: 10px 0; color: #0f172a;">${new Date().toLocaleString('es-PE')}</td>
          </tr>
        </table>

        <!-- Detalle del Mensaje -->
        <div style="background-color: #f8fafc; border-left: 4px solid #f59e0b; padding: 18px; border-radius: 6px; margin-bottom: 24px;">
          <p style="margin: 0 0 10px 0; font-size: 12px; font-weight: bold; color: #475569; text-transform: uppercase;">
            Mensaje del Colaborador:
          </p>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${data.description}</p>
        </div>

        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
        <p style="font-size: 11px; color: #94a3b8; text-align: center; margin: 0;">
          Notificación enviada automáticamente a la Gerencia de Talento Humano (${destinationEmail}).
        </p>
      </div>
    `,
  };

  const info = await mailTransporter.sendMail(mailOptions);
  console.log(`✉️ Correo enviado exitosamente a: ${destinationEmail} (ID: ${info.messageId})`);

  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.log(`🔗 Vista previa del correo: ${previewUrl}`);
    return previewUrl.toString();
  }

  return 'Correo enviado exitosamente a ' + destinationEmail;
}
