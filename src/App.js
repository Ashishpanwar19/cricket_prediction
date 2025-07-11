import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScorePrediction from './components/ScorePrediction';
import PlayerStats from './components/PlayerStats';
import TeamComparison from './components/TeamComparison';
import MatchVisualization from './components/MatchVisualization';
import EnhancedFeatures from './components/EnhancedFeatures';
import EnhancedDatabase from './components/EnhancedDatabase';
import FlutterIntegration from './components/FlutterIntegration';
import { Trophy, TrendingUp, Users, BarChart3, Star, Database, Smartphone } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('enhanced');

  const tabs = [
    { id: 'enhanced', label: 'Enhanced Features', icon: Star },
    { id: 'prediction', label: 'Score Prediction', icon: TrendingUp },
    { id: 'players', label: 'Player Stats', icon: Users },
    { id: 'teams', label: 'Team Comparison', icon: Trophy },
    { id: 'visualization', label: 'Match Analysis', icon: BarChart3 },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'flutter', label: 'Mobile App', icon: Smartphone }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="p-6 text-center"
        >
          <motion.h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🏏 CricketPredictPro
          </motion.h1>
          <motion.p className="text-xl text-blue-200">
            AI-Powered Cricket Analytics & Predictions with Database Integration
          </motion.p>
        </motion.header>

        {/* Navigation Tabs */}
        <motion.nav className="max-w-7xl mx-auto px-6 mb-8">
          <div className="flex flex-wrap justify-center gap-2 bg-white/10 backdrop-blur-lg rounded-2xl p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-900 shadow-lg transform scale-105'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <Icon size={20} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'enhanced' && <EnhancedFeatures />}
            {activeTab === 'prediction' && <ScorePrediction />}
            {activeTab === 'players' && <PlayerStats />}
            {activeTab === 'teams' && <TeamComparison />}
            {activeTab === 'visualization' && <MatchVisualization />}
            {activeTab === 'database' && <EnhancedDatabase />}
            {activeTab === 'flutter' && <FlutterIntegration />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default App;