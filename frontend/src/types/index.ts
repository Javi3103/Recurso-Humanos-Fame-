export type ReportType = 'SUGERENCIA' | 'DENUNCIA';
export type PriorityLevel = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

export interface CreateReportDTO {
  title: string;
  description: string;
  type: ReportType;
  category?: string;
  priority?: PriorityLevel;
  is_anonymous: boolean;
  reporter_name?: string;
  reporter_email?: string;
  reporter_department?: string;
}
