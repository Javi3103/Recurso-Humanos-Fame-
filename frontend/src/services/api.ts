import { CreateReportDTO } from '../types';

// En desarrollo local apunta a localhost:4000, pero en Docker/Ubuntu usa la ruta relativa '/api' a través de Nginx
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000/api' : '/api');

export const apiService = {
  /**
   * Enviar sugerencia o denuncia directamente al correo de Talento Humano
   */
  async createReport(data: CreateReportDTO): Promise<{ success: boolean; message: string; preview_url?: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        return await res.json();
      }
      
      const err = await res.json().catch(() => ({ error: 'Error en el servidor al enviar el correo' }));
      throw new Error(err.error || 'No fue posible enviar tu mensaje.');
    } catch (error: any) {
      console.warn('Error al conectar con la API:', error);
      throw new Error(error.message || 'Error de conexión con el servidor de correo.');
    }
  },
};
