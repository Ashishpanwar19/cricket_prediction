import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Target, Users, Download, Smartphone, Eye } from 'lucide-react';
import CricketFieldVisualization from './CricketFieldVisualization';

// Enhanced team data with animated logos
const enhancedTeamData = {
  'Mumbai Indians': {
    shortName: 'MI',
    colors: ['#004BA0', '#D1AB3E'],
    homeGround: 'Wankhede Stadium',
    captain: 'Rohit Sharma',
    titles: 5,
    currentForm: [1, 1, 0, 1, 1],
    animatedLogo: '🏏'
  },
  'Chennai Super Kings': {
    shortName: 'CSK',
    colors: ['#FFFF3C', '#F99D1C'],
    homeGround: 'MA Chidambaram Stadium',
    captain: 'MS Dhoni',
    titles: 4,
    currentForm: [1, 0, 1, 1, 0],
    animatedLogo: '🦁'
  },
  'Royal Challengers Bangalore': {
    shortName: 'RCB',
    colors: ['#EC1C24', '#FFD700'],
    homeGround: 'M. Chinnaswamy Stadium',
    captain: 'Virat Kohli',
    titles: 0,
    currentForm: [0, 1, 1, 0, 1],
    animatedLogo: '👑'
  },
  'Kolkata Knight Riders': {
    shortName: 'KKR',
    colors: ['#3A225D', '#B3A123'],
    homeGround: 'Eden Gardens',
    captain: 'Shreyas Iyer',
    titles: 2,
    currentForm: [1, 0, 0, 1, 1],
    animatedLogo: '⚔️'
  }
};

// Animated Team Logo Component
const AnimatedTeamLogo = ({ team, size = 'w-16 h-16' }) => {
  const teamData = enhancedTeamData[team];
  
  return (
    <motion.div
      className={`${size} rounded-full relative overflow-hidden border-3 border-white/30 flex items-center justify-center text-4xl`}
      style={{
        background: `linear-gradient(135deg, ${teamData.colors[0]}, ${teamData.colors[1]})`
      }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      animate={{
        boxShadow: [
          `0 0 20px ${teamData.colors[0]}40`,
          `0 0 30px ${teamData.colors[1]}60`,
          `0 0 20px ${teamData.colors[0]}40`
        ]
      }}
      transition={{
        boxShadow: { duration: 2, repeat: Infinity },
        hover: { type: "spring", stiffness: 300 }
      }}
    >
      <motion.span
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {teamData.animatedLogo}
      </motion.span>
    </motion.div>
  );
};

// Interactive Team Selector Component
function InteractiveTeamSelector({ selectedTeam, onTeamSelect, label, excludeTeam = null }) {
  const [isOpen, setIsOpen] = useState(false);

  const availableTeams = Object.entries(enhancedTeamData).filter(
    ([teamName]) => teamName !== excludeTeam
  );

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-blue-200 mb-3">{label}</label>
      
      <motion.div
        className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/30 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-4">
          <AnimatedTeamLogo team={selectedTeam} />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{selectedTeam}</h3>
            <p className="text-blue-300 text-sm">{enhancedTeamData[selectedTeam].captain}</p>
            <div className="flex items-center gap-1 mt-1">
              {enhancedTeamData[selectedTeam].currentForm.map((result, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full ${result ? 'bg-green-400' : 'bg-red-400'}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              ))}
            </div>
          </div>
          <div className="text-right">
            <motion.div 
              className="text-yellow-400 font-bold text-2xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {enhancedTeamData[selectedTeam].titles}
            </motion.div>
            <div className="text-white/70 text-xs">Titles</div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-lg rounded-2xl border border-white/20 z-50 max-h-80 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {availableTeams.map(([teamName, teamData]) => (
              <motion.div
                key={teamName}
                className={`p-4 cursor-pointer border-b border-white/10 last:border-b-0 ${
                  teamName === selectedTeam ? 'bg-blue-500/20' : 'hover:bg-white/10'
                }`}
                onClick={() => {
                  onTeamSelect(teamName);
                  setIsOpen(false);
                }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-3">
                  <AnimatedTeamLogo team={teamName} size="w-12 h-12" />
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{teamName}</h4>
                    <p className="text-blue-300 text-sm">{teamData.homeGround}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">{teamData.titles}</div>
                    <div className="text-white/70 text-xs">Titles</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Real-time Score Prediction Component
function RealTimeScorePrediction({ team1, team2 }) {
  const [prediction, setPrediction] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    if (team1 && team2) {
      setIsCalculating(true);
      
      const timer = setTimeout(() => {
        const baseScore = 160;
        const team1Strength = enhancedTeamData[team1].titles * 5;
        const team2Strength = enhancedTeamData[team2].titles * 5;
        const randomFactor = Math.random() * 30 - 15;
        
        const predictedScore = Math.round(baseScore + team1Strength - team2Strength + randomFactor);
        const calculatedConfidence = Math.round(75 + Math.random() * 20);
        
        setPrediction(predictedScore);
        setConfidence(calculatedConfidence);
        setIsCalculating(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [team1, team2]);

  return (
    <motion.div
      className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-3xl p-8 border border-green-400/30"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Target className="text-green-400" size={32} />
        <h3 className="text-2xl font-bold text-white">Real-time Score Prediction</h3>
      </div>

      {isCalculating ? (
        <div className="text-center py-8">
          <motion.div
            className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-white/80">Analyzing team strengths and conditions...</p>
        </div>
      ) : prediction ? (
        <div className="text-center">
          <motion.div
            className="text-6xl font-bold text-green-400 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {prediction}
          </motion.div>
          <p className="text-white text-xl mb-4">Predicted Score for {team1}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <motion.div 
              className="bg-white/10 rounded-xl p-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-blue-400">{confidence}%</div>
              <div className="text-white/70 text-sm">Confidence</div>
            </motion.div>
            <motion.div 
              className="bg-white/10 rounded-xl p-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-yellow-400">{prediction - 20}-{prediction + 20}</div>
              <div className="text-white/70 text-sm">Range</div>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-white/60">
          Select teams to see prediction
        </div>
      )}
    </motion.div>
  );
}

// Mobile App Download Component
function MobileAppDownload() {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = (platform) => {
    setDownloadStarted(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          const element = document.createElement('a');
          const file = new Blob(['Cricket Predictor App - Demo Version'], { type: 'application/vnd.android.package-archive' });
          element.href = URL.createObjectURL(file);
          element.download = `cricket-predictor-${platform.toLowerCase()}.apk`;
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
          
          setTimeout(() => {
            setDownloadStarted(false);
            setDownloadProgress(0);
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-8 border border-blue-400/30"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center mb-8">
        <motion.div
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Smartphone className="text-white" size={40} />
        </motion.div>
        
        <h3 className="text-3xl font-bold text-white mb-4">Download Cricket Predictor</h3>
        <p className="text-blue-200 mb-8">
          Get real-time cricket predictions on your mobile device
        </p>

        {downloadStarted ? (
          <div className="space-y-4">
            <div className="text-white font-bold">Downloading... {downloadProgress}%</div>
            <div className="w-full bg-white/20 rounded-full h-4">
              <motion.div
                className="bg-gradient-to-r from-blue-400 to-purple-400 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${downloadProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              onClick={() => handleDownload('Android')}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl font-bold shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={24} />
              <div className="text-left">
                <div>Download for</div>
                <div className="text-sm opacity-80">Android</div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => handleDownload('iOS')}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-2xl font-bold shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download size={24} />
              <div className="text-left">
                <div>Download for</div>
                <div className="text-sm opacity-80">iOS</div>
              </div>
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Main Enhanced Features Component
export default function EnhancedFeatures() {
  const [selectedTeam1, setSelectedTeam1] = useState('Mumbai Indians');
  const [selectedTeam2, setSelectedTeam2] = useState('Chennai Super Kings');
  const [activeView, setActiveView] = useState('overview');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          🏏 Professional Cricket Analytics with Mobile App
        </h1>
        <p className="text-blue-200 text-lg">
          Experience next-generation cricket prediction with professional mobile app download
        </p>
      </motion.div>

      {/* View Selector */}
      <motion.div
        className="flex justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <button
          onClick={() => setActiveView('overview')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
            activeView === 'overview'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Target size={20} />
          Overview & Predictions
        </button>
        <button
          onClick={() => setActiveView('field')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
            activeView === 'field'
              ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Eye size={20} />
          Live Field Visualization
        </button>
        <button
          onClick={() => setActiveView('mobile')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
            activeView === 'mobile'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Smartphone size={20} />
          Mobile App
        </button>
      </motion.div>

      {/* Content based on active view */}
      <AnimatePresence mode="wait">
        {activeView === 'overview' ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Interactive Team Selection */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Users className="text-blue-400" size={32} />
                <h2 className="text-3xl font-bold text-white">Interactive Team Selection with Animated Logos</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InteractiveTeamSelector
                  selectedTeam={selectedTeam1}
                  onTeamSelect={setSelectedTeam1}
                  label="Select Team 1 (Batting)"
                  excludeTeam={selectedTeam2}
                />
                <InteractiveTeamSelector
                  selectedTeam={selectedTeam2}
                  onTeamSelect={setSelectedTeam2}
                  label="Select Team 2 (Bowling)"
                  excludeTeam={selectedTeam1}
                />
              </div>

              {/* Match Preview */}
              <motion.div
                className="mt-8 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-400/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <AnimatedTeamLogo team={selectedTeam1} size="w-20 h-20" />
                    <h3 className="text-white font-bold mt-2">{selectedTeam1}</h3>
                    <p className="text-blue-300 text-sm">{enhancedTeamData[selectedTeam1].captain}</p>
                    <div className="text-xs text-green-400 mt-1">Batting First</div>
                  </div>
                  
                  <div className="text-center">
                    <motion.div 
                      className="text-4xl font-bold text-white mb-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      VS
                    </motion.div>
                    <div className="text-yellow-400 text-sm">IPL 2024</div>
                    <div className="text-blue-300 text-xs mt-1">
                      {enhancedTeamData[selectedTeam1].homeGround}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <AnimatedTeamLogo team={selectedTeam2} size="w-20 h-20" />
                    <h3 className="text-white font-bold mt-2">{selectedTeam2}</h3>
                    <p className="text-red-300 text-sm">{enhancedTeamData[selectedTeam2].captain}</p>
                    <div className="text-xs text-red-400 mt-1">Bowling First</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Real-time Predictions */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
              <RealTimeScorePrediction team1={selectedTeam1} team2={selectedTeam2} />
            </div>
          </motion.div>
        ) : activeView === 'field' ? (
          <motion.div
            key="field"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <CricketFieldVisualization />
          </motion.div>
        ) : (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
          >
            <MobileAppDownload />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}