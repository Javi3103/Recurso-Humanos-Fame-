import React from 'react';
import { Navbar } from './components/Navbar';
import { NewReportForm } from './components/NewReportForm';
import { Shield, Sparkles } from 'lucide-react';

export function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-400 selection:text-slate-900">
      <div>
        <Navbar />
        
        <main>
          <NewReportForm />
        </main>
      </div>

      {/* Footer Corporativo FAME */}
      <footer className="bg-white border-t border-slate-200 py-5 mt-10 text-center text-xs text-slate-500 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-amber-600" />
            <span className="font-extrabold text-slate-900 tracking-wider">FAME S.A.C.</span>
            <span className="text-slate-300">—</span>
            <span className="text-slate-600 font-medium">Industria de la Seguridad y Defensa Nacional</span>
          </div>

          <div className="flex items-center space-x-1.5 text-slate-400 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Disciplina • Innovación • Compromiso</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
