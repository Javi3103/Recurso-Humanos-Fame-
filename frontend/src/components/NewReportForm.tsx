import React, { useState } from 'react';
import { Lightbulb, ShieldAlert, CheckCircle2, Lock, Loader2, Send } from 'lucide-react';
import { CreateReportDTO, PriorityLevel, ReportType } from '../types';
import { apiService } from '../services/api';

export const NewReportForm: React.FC = () => {
  const [reportType, setReportType] = useState<ReportType>('SUGERENCIA');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  
  // Datos personales (solo si desmarca anonimato)
  const [reporterName, setReporterName] = useState<string>('');
  const [reporterDepartment, setReporterDepartment] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Estado de confirmación de envío
  const [sentSuccess, setSentSuccess] = useState<boolean>(false);

  const MAX_CHARS = 400;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim()) {
      setErrorMsg('El Asunto es obligatorio. Por favor escribe de qué se trata.');
      return;
    }

    if (!description.trim()) {
      setErrorMsg('El mensaje es obligatorio. Por favor explica los detalles.');
      return;
    }

    if (description.trim().length > MAX_CHARS) {
      setErrorMsg(`El mensaje no puede superar el límite de ${MAX_CHARS} caracteres.`);
      return;
    }

    const payload: CreateReportDTO = {
      title: title.trim(),
      description: description.trim(),
      type: reportType,
      category: reportType === 'SUGERENCIA' ? 'Sugerencia de Mejora' : 'Denuncia Interna',
      priority: 'MEDIA' as PriorityLevel,
      is_anonymous: isAnonymous,
      reporter_name: isAnonymous ? undefined : reporterName.trim(),
      reporter_department: isAnonymous ? undefined : reporterDepartment.trim(),
    };

    try {
      setLoading(true);
      await apiService.createReport(payload);
      setSentSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'No fue posible enviar tu mensaje. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSentSuccess(false);
    setTitle('');
    setDescription('');
    setReporterName('');
    setReporterDepartment('');
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      
      {/* Encabezado elegante y nítido */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          ¿En qué podemos mejorar?
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed max-w-md mx-auto">
          Escribe con total libertad. Tu mensaje llega directamente a la Gerencia de Talento Humano.
        </p>
      </div>

      {/* Tarjeta Blanca Cristalina sobre fondo plomo */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/60 p-6 sm:p-8 text-slate-800">
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* 1. Selector de Tipo: Solo Sugerencia y Denuncia */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              ¿Qué tipo de mensaje deseas enviar?
            </label>
            <div className="grid grid-cols-2 gap-3">
              
              {/* Opción 1: Sugerencia */}
              <button
                type="button"
                onClick={() => setReportType('SUGERENCIA')}
                className={`py-3.5 px-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                  reportType === 'SUGERENCIA'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className={`p-1.5 rounded-lg mb-1.5 ${reportType === 'SUGERENCIA' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>
                  <Lightbulb className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold">Sugerencia</span>
                <span className="text-[11px] text-slate-400 font-normal">Ideas para mejorar</span>
              </button>

              {/* Opción 2: Denuncia */}
              <button
                type="button"
                onClick={() => setReportType('DENUNCIA')}
                className={`py-3.5 px-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                  reportType === 'DENUNCIA'
                    ? 'border-red-600 bg-red-50 text-red-950 font-bold ring-2 ring-red-500/20 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className={`p-1.5 rounded-lg mb-1.5 ${reportType === 'DENUNCIA' ? 'bg-red-600 text-white' : 'text-slate-500'}`}>
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold">Denuncia</span>
                <span className="text-[11px] text-slate-400 font-normal">Reporte confidencial</span>
              </button>

            </div>
          </div>

          {/* 2. Campo Asunto (Obligatorio) */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Asunto <span className="text-red-500 font-bold">*</span>
              </label>
              <span className="text-[11px] text-slate-400 font-medium">Obligatorio</span>
            </div>
            <input
              type="text"
              required
              maxLength={120}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={reportType === 'SUGERENCIA' ? 'Ej: Propuesta para el comedor, mejora de turnos...' : 'Ej: Hostigamiento, falta de respeto, uso indebido...'}
              className="w-full text-sm px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
            />
          </div>

          {/* 3. Campo Mensaje (Obligatorio con máximo 400 caracteres) */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Cuéntanos qué sucede o qué propones <span className="text-red-500 font-bold">*</span>
              </label>
              <span className={`text-[11px] font-mono font-medium ${
                description.length >= MAX_CHARS ? 'text-red-600 font-bold' : description.length >= MAX_CHARS - 40 ? 'text-amber-600 font-semibold' : 'text-slate-400'
              }`}>
                {description.length}/{MAX_CHARS} caracteres
              </span>
            </div>
            <textarea
              required
              rows={4}
              maxLength={MAX_CHARS}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Escribe aquí con tus propias palabras lo que ocurre o la idea que tienes..."
              className="w-full text-sm p-4 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none resize-none transition-all"
            />
          </div>

          {/* 4. Opción de anonimato simple */}
          <div className="pt-2 border-t border-slate-100">
            <label className="flex items-center space-x-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-300 cursor-pointer"
              />
              <span className="text-xs font-medium text-slate-700 flex items-center space-x-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span><strong>Enviar de forma anónima</strong> (nadie sabrá quién eres)</span>
              </span>
            </label>

            {/* Si desmarca el anónimo, solicita nombre y área */}
            {!isAnonymous && (
              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-semibold">Tu nombre (opcional)</label>
                  <input
                    type="text"
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 mb-1 font-semibold">Tu área (opcional)</label>
                  <input
                    type="text"
                    value={reporterDepartment}
                    onChange={(e) => setReporterDepartment(e.target.value)}
                    placeholder="Ej. Producción / Planta"
                    className="w-full text-xs px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* Botón de Enviar */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Enviando mensaje...</span>
              </>
            ) : (
              <>
                <span>Enviar al Buzón</span>
                <Send className="w-4 h-4 text-amber-400" />
              </>
            )}
          </button>

        </form>
      </div>

      {/* Modal de Éxito al Enviar */}
      {sentSuccess && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-extrabold text-slate-900">
              ¡Mensaje enviado con éxito!
            </h3>
            
            <p className="text-slate-600 text-xs mt-2 leading-relaxed">
              Muchas gracias por comunicarte. Tu {reportType === 'SUGERENCIA' ? 'sugerencia' : 'denuncia'} ha sido enviada directamente a la bandeja de <strong>Talento Humano</strong> para su pronta atención.
            </p>

            <div className="mt-6">
              <button
                onClick={handleReset}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
              >
                Entendido / Enviar otro mensaje
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
