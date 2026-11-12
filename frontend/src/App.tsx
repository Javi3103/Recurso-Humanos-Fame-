import React from 'react';
import { NewReportForm } from './components/NewReportForm';

export function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center selection:bg-amber-400 selection:text-slate-900 py-6 sm:py-12">
      <main>
        <NewReportForm />
      </main>
    </div>
  );
}

export default App;
