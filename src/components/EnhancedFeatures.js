import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Target, Users, BarChart3, Zap, Star, TrendingUp, Award, Play, Eye } from 'lucide-react';
import CricketFieldVisualization from './CricketFieldVisualization';

// Complete team data for all IPL teams
const enhancedTeamData = {
  'Mumbai Indians': {
    shortName: 'MI',
    logo: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: ['#004BA0', '#D1AB3E'],
    homeGround: 'Wankhede Stadium',
    captain: 'Rohit Sharma',
    coach: 'Mark Boucher',
    titles: 5,
    founded: 2008,
    currentForm: [1, 1, 0, 1, 1],
    keyPlayers: ['Rohit Sharma', 'Jasprit Bumrah', 'Hardik Pandya'],
    strengths: ['Power hitting', 'Death bowling', 'Experience'],
    weaknesses: ['Middle order', 'Spin bowling']
  },
  'Chennai Super Kings': {
    shortName: 'CSK',
    logo: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: ['#FFFF3C', '#F99D1C'],
    homeGround: 'MA Chidambaram Stadium',
    captain: 'MS Dhoni',
    coach: 'Stephen Fleming',
    titles: 4,
    founded: 2008,
    currentForm: [1, 0, 1, 1, 0],
    keyPlayers: ['MS Dhoni', 'Ravindra Jadeja', 'Ruturaj Gaikwad'],
    strengths: ['Experienced squad', 'Spin bowling', 'Finishing'],
    weaknesses: ['Pace bowling', 'Youth factor']
  },
  'Royal Challengers Bangalore': {
    shortName: 'RCB',
    logo: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: ['#EC1C24', '#FFD700'],
    homeGround: 'M. Chinnaswamy Stadium',
    captain: 'Virat Kohli',
    coach: 'Mike Hesson',
    titles: 0,
    founded: 2008,
    currentForm: [0, 1, 1, 0, 1],
    keyPlayers: ['Virat Kohli', 'Glenn Maxwell', 'Mohammed Siraj'],
    strengths: ['Top order batting', 'Aggressive approach'],
    weaknesses: ['Bowling depth', 'Consistency']
  },
  'Kolkata Knight Riders': {
    shortName: 'KKR',
    logo: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: ['#3A225D', '#B3A123'],
    homeGround: 'Eden Gardens',
    captain: 'Shreyas Iyer',
    coach: 'Brendon McCullum',
    titles: 2,
    founded: 2008,
    currentForm: [1, 0, 0, 1, 1],
    keyPlayers: ['Shreyas Iyer', 'Andre Russell', 'Sunil Narine'],
    strengths: ['All-rounders', 'Spin bowling', 'Home advantage'],
    weaknesses: ['Opening partnership', 'Death bowling']
  },
  'Delhi Capitals': {
    shortName: 'DC',
    logo: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: ['#17479E', '#EF1B23'],
    homeGround: 'Arun Jaitley Stadium',
    captain: 'Rishabh Pant',
    coach: 'Ricky Ponting',
    titles: 0,
    founded: 2008,
    currentForm: [1, 1, 0, 1, 0],
    keyPlayers: ['Rishabh Pant', 'Prithvi Shaw', 'Kagiso Rabada'],
    strengths: ['Young talent', 'Pace bowling', 'Aggressive batting'],
    weaknesses: ['Experience', 'Spin bowling']
  },
  'Punjab Kings': {
    shortName: 'PBKS',
    logo: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: ['#ED1A37', '#FDDE00'],
    homeGround: 'PCA Stadium',
    captain: 'Shikhar Dhawan',
    coach: 'Anil Kumble',
    titles: 0,
    founded: 2008,
    currentForm: [0, 1, 0, 1, 1],
    keyPlayers: ['Shikhar Dhawan', 'KL Rahul', 'Mohammed Shami'],
    strengths: ['Opening partnership', 'Power hitting'],
    weaknesses: ['Middle order', 'Death bowling']
  },
  'Rajasthan Royals': {
    shortName: 'RR',
    logo: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: ['#254AA5', '#E91C7A'],
    homeGround: 'Sawai Mansingh Stadium',
    captain: 'Sanju Samson',
    coach: 'Kumar Sangakkara',
    titles: 1,
    founded: 2008,
    currentForm: [1, 0, 1, 0, 1],
    keyPlayers: ['Sanju Samson', 'Jos Buttler', 'Yuzvendra Chahal'],
    strengths: ['Explosive batting', 'Spin bowling'],
    weaknesses: ['Consistency', 'Death bowling']
  },
  'Sunrisers Hyderabad': {
    shortName: 'SRH',
    logo: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: ['#FF822A', '#000000'],
    homeGround: 'Rajiv Gandhi Stadium',
    captain: 'Aiden Markram',
    coach: 'Brian Lara',
    titles: 1,
    founded: 2013,
    currentForm: [0, 0, 1, 1, 0],
    keyPlayers: ['Aiden Markram', 'Rashid Khan', 'Bhuvneshwar Kumar'],
    strengths: ['Bowling attack', 'Spin bowling'],
    weaknesses: ['Batting depth', 'Power hitting']
  }
};

// Enhanced Interactive Team Selector Component
function InteractiveTeamSelector({ selectedTeam, onTeamSelect, label, excludeTeam = null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTeam, setHoveredTeam] = useState(null);

  const availableTeams = Object.entries(enhancedTeamData).filter(
    ([teamName]) => teamName !== excludeTeam
  );

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-blue-200 mb-3">{label}</label>
      
      {/* Selected Team Display */}
      <motion.div
        className="bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/30 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={enhancedTeamData[selectedTeam].logo}
              alt={selectedTeam}
              className="w-16 h-16 rounded-full object-cover border-3 border-blue-400"
            />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Trophy size={12} className="text-gray-900" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{selectedTeam}</h3>
            <p className="text-blue-300 text-sm">{enhancedTeamData[selectedTeam].captain}</p>
            <div className="flex items-center gap-1 mt-1">
              {enhancedTeamData[selectedTeam].currentForm.map((result, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${result ? 'bg-green-400' : 'bg-red-400'}`}
                />
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-yellow-400 font-bold">{enhancedTeamData[selectedTeam].titles}</div>
            <div className="text-white/70 text-xs">Titles</div>
          </div>
        </div>
      </motion.div>

      {/* Dropdown Menu */}
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
                onMouseEnter={() => setHoveredTeam(teamName)}
                onMouseLeave={() => setHoveredTeam(null)}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={teamData.logo}
                    alt={teamName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{teamName}</h4>
                    <p className="text-blue-300 text-sm">{teamData.homeGround}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">{teamData.titles}</div>
                    <div className="text-white/70 text-xs">Titles</div>
                  </div>
                </div>
                
                {hoveredTeam === teamName && (
                  <motion.div
                    className="mt-3 pt-3 border-t border-white/20"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-white/70">Captain: </span>
                        <span className="text-white">{teamData.captain}</span>
                      </div>
                      <div>
                        <span className="text-white/70">Coach: </span>
                        <span className="text-white">{teamData.coach}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
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
      
      // Simulate real-time calculation
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
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400">{confidence}%</div>
              <div className="text-white/70 text-sm">Confidence</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-yellow-400">{prediction - 20}-{prediction + 20}</div>
              <div className="text-white/70 text-sm">Range</div>
            </div>
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

// Win Probability Calculator
function WinProbabilityCalculator({ team1, team2 }) {
  const [probabilities, setProbabilities] = useState(null);

  useEffect(() => {
    if (team1 && team2) {
      const team1Data = enhancedTeamData[team1];
      const team2Data = enhancedTeamData[team2];
      
      // Calculate based on titles, form, and random factors
      const team1Score = team1Data.titles * 10 + team1Data.currentForm.reduce((a, b) => a + b, 0) * 5;
      const team2Score = team2Data.titles * 10 + team2Data.currentForm.reduce((a, b) => a + b, 0) * 5;
      
      const total = team1Score + team2Score;
      const team1Prob = Math.round((team1Score / total) * 100);
      const team2Prob = 100 - team1Prob;
      
      setProbabilities({ team1: team1Prob, team2: team2Prob });
    }
  }, [team1, team2]);

  return (
    <motion.div
      className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-3xl p-8 border border-purple-400/30"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="text-purple-400" size={32} />
        <h3 className="text-2xl font-bold text-white">Win Probability</h3>
      </div>

      {probabilities ? (
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={enhancedTeamData[team1].logo}
                  alt={team1}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white font-medium">{team1}</span>
              </div>
              <span className="text-purple-400 font-bold text-xl">{probabilities.team1}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4">
              <motion.div
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${probabilities.team1}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={enhancedTeamData[team2].logo}
                  alt={team2}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white font-medium">{team2}</span>
              </div>
              <span className="text-pink-400 font-bold text-xl">{probabilities.team2}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4">
              <motion.div
                className="bg-gradient-to-r from-pink-400 to-red-400 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${probabilities.team2}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              />
            </div>
          </div>

          <div className="mt-6 p-4 bg-white/10 rounded-xl">
            <h4 className="text-white font-bold mb-2">Key Factors</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-white/70">Titles: </span>
                <span className="text-white">{enhancedTeamData[team1].titles} vs {enhancedTeamData[team2].titles}</span>
              </div>
              <div>
                <span className="text-white/70">Recent Form: </span>
                <span className="text-white">
                  {enhancedTeamData[team1].currentForm.reduce((a, b) => a + b, 0)}/5 vs {enhancedTeamData[team2].currentForm.reduce((a, b) => a + b, 0)}/5
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-white/60">
          Select teams to calculate win probability
        </div>
      )}
    </motion.div>
  );
}

// Main Enhanced Features Component
export default function EnhancedFeatures() {
  const [selectedTeam1, setSelectedTeam1] = useState('Mumbai Indians');
  const [selectedTeam2, setSelectedTeam2] = useState('Chennai Super Kings');
  const [activeView, setActiveView] = useState('overview');
  const [visualizationTeams, setVisualizationTeams] = useState({
    batting: 'Chennai Super Kings',
    bowling: 'Mumbai Indians'
  });

  // Function to start live visualization with predicted teams
  const startLiveVisualization = () => {
    setVisualizationTeams({
      batting: selectedTeam1,
      bowling: selectedTeam2
    });
    setActiveView('field');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          🏏 Enhanced Cricket Analytics
        </h1>
        <p className="text-blue-200 text-lg">
          Experience next-generation cricket prediction with interactive features
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
                <h2 className="text-3xl font-bold text-white">Interactive Team Selection</h2>
                <div className="ml-auto">
                  <motion.button
                    onClick={startLiveVisualization}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play size={20} />
                    View Live Match
                  </motion.button>
                </div>
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
                    <img
                      src={enhancedTeamData[selectedTeam1].logo}
                      alt={selectedTeam1}
                      className="w-20 h-20 rounded-full mx-auto mb-2 border-3 border-blue-400"
                    />
                    <h3 className="text-white font-bold">{selectedTeam1}</h3>
                    <p className="text-blue-300 text-sm">{enhancedTeamData[selectedTeam1].captain}</p>
                    <div className="text-xs text-green-400 mt-1">Batting First</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">VS</div>
                    <div className="text-yellow-400 text-sm">IPL 2024</div>
                    <div className="text-blue-300 text-xs mt-1">
                      {enhancedTeamData[selectedTeam1].homeGround}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <img
                      src={enhancedTeamData[selectedTeam2].logo}
                      alt={selectedTeam2}
                      className="w-20 h-20 rounded-full mx-auto mb-2 border-3 border-red-400"
                    />
                    <h3 className="text-white font-bold">{selectedTeam2}</h3>
                    <p className="text-red-300 text-sm">{enhancedTeamData[selectedTeam2].captain}</p>
                    <div className="text-xs text-red-400 mt-1">Bowling First</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Real-time Predictions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RealTimeScorePrediction team1={selectedTeam1} team2={selectedTeam2} />
              <WinProbabilityCalculator team1={selectedTeam1} team2={selectedTeam2} />
            </div>

            {/* Team Comparison Quick Stats */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Trophy className="text-yellow-400" size={32} />
                <h2 className="text-3xl font-bold text-white">Head-to-Head Comparison</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[selectedTeam1, selectedTeam2].map((team, index) => (
                  <motion.div
                    key={team}
                    className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/30"
                    initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={enhancedTeamData[team].logo}
                        alt={team}
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-white">{team}</h3>
                        <p className="text-blue-300">{enhancedTeamData[team].shortName}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 rounded-xl p-3 text-center">
                        <div className="text-2xl font-bold text-yellow-400">{enhancedTeamData[team].titles}</div>
                        <div className="text-white/70 text-sm">Titles</div>
                      </div>
                      <div className="bg-white/10 rounded-xl p-3 text-center">
                        <div className="text-2xl font-bold text-green-400">
                          {enhancedTeamData[team].currentForm.reduce((a, b) => a + b, 0)}/5
                        </div>
                        <div className="text-white/70 text-sm">Recent Form</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-white/70 text-sm mb-1">Strengths</div>
                        <div className="flex flex-wrap gap-1">
                          {enhancedTeamData[team].strengths.map((strength, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full"
                            >
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-white/70 text-sm mb-1">Weaknesses</div>
                        <div className="flex flex-wrap gap-1">
                          {enhancedTeamData[team].weaknesses.map((weakness, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full"
                            >
                              {weakness}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Star className="text-yellow-400" size={32} />
                <h2 className="text-3xl font-bold text-white">Key Features Showcase</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Users,
                    title: "All 8 IPL Teams",
                    description: "Complete database with all current IPL teams and their detailed statistics",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: Target,
                    title: "Real-time Predictions",
                    description: "AI-powered score predictions for any team combination with confidence intervals",
                    color: "from-green-500 to-emerald-500"
                  },
                  {
                    icon: Eye,
                    title: "Live Field Visualization",
                    description: "2D cricket field with real player positions for your selected teams",
                    color: "from-purple-500 to-pink-500"
                  },
                  {
                    icon: BarChart3,
                    title: "Win Probability",
                    description: "Dynamic win probability calculations based on team strength and current form",
                    color: "from-yellow-500 to-orange-500"
                  },
                  {
                    icon: TrendingUp,
                    title: "Team Analytics",
                    description: "Comprehensive team analysis with strengths, weaknesses, and head-to-head stats",
                    color: "from-red-500 to-pink-500"
                  },
                  {
                    icon: Award,
                    title: "Integrated Experience",
                    description: "Seamless flow from prediction to live visualization for complete match analysis",
                    color: "from-indigo-500 to-purple-500"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    whileHover={{ scale: 1.05, rotateY: 5 }}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="field"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <CricketFieldVisualization 
              initialBattingTeam={enhancedTeamData[visualizationTeams.batting]?.shortName || 'CSK'}
              initialBowlingTeam={enhancedTeamData[visualizationTeams.bowling]?.shortName || 'MI'}
              teamData={enhancedTeamData}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}