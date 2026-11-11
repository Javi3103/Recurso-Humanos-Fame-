import React from 'react';
import { Shield, Lock } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo y Nombre FAME */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 shadow-sm shadow-amber-500/20 font-black">
              <Shield className="w-5 h-5 fill-slate-950 stroke-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 tracking-wider text-base">FAME S.A.C.</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold uppercase border border-amber-200">
                  Talento Humano
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide">
                Buzón de Escucha Activa y Transparencia
              </p>
            </div>
          </div>

          {/* Indicador de Canal Seguro */}
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Canal Confidencial</span>
          </div>

        </div>
      </div>
    </header>
  );
};
