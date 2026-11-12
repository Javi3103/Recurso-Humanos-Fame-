import React from 'react';
import { Navbar } from './components/Navbar';
import { NewReportForm } from './components/NewReportForm';

export function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-400 selection:text-slate-900 pb-12">
      <div>
        <Navbar />
        
        <main>
          <NewReportForm />
        </main>
      </div>
    </div>
  );
}

export default App;
