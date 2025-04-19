import React from 'react';
import ScorePrediction from './components/ScorePrediction';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-cricket-blue">Cricket Score Predictor</h1>
        <p className="text-gray-600">AI-powered match predictions</p>
      </header>
      
      <main className="max-w-4xl mx-auto">
        <ScorePrediction />
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} CricketPredictPro
      </footer>
    </div>
  );
}

export default App;