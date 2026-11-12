import React from 'react';
import { NewReportForm } from './components/NewReportForm';

export function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center selection:bg-amber-400 selection:text-slate-900 p-4 sm:p-6">
      <main className="w-full">
        <NewReportForm />
      </main>
    </div>
  );
}

export default App;
