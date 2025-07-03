import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, RefreshCw, Star } from 'lucide-react';

// Complete team data for all IPL teams with animated player avatars
const completeTeamData = {
  'CSK': {
    fullName: 'Chennai Super Kings',
    colors: { primary: '#FFFF3C', secondary: '#F99D1C' },
    animatedLogo: '🦁',
    players: {
      'MS Dhoni': {
        role: 'Wicket Keeper',
        avatar: '🥅',
        position: { x: 50, y: 85 },
        stats: { runs: 4632, average: 38.09, strikeRate: 135.92 }
      },
      'Ruturaj Gaikwad': {
        role: 'Batsman',
        avatar: '🏏',
        position: { x: 20, y: 20 },
        stats: { runs: 2380, average: 32.43, strikeRate: 129.18 }
      },
      'Ravindra Jadeja': {
        role: 'All Rounder',
        avatar: '⭐',
        position: { x: 30, y: 60 },
        stats: { runs: 2756, wickets: 157, average: 29.95 }
      },
      'Deepak Chahar': {
        role: 'Bowler',
        avatar: '⚡',
        position: { x: 50, y: 10 },
        stats: { wickets: 59, economy: 7.28, average: 27.81 }
      }
    }
  },
  'MI': {
    fullName: 'Mumbai Indians',
    colors: { primary: '#004BA0', secondary: '#D1AB3E' },
    animatedLogo: '🏏',
    players: {
      'Rohit Sharma': {
        role: 'Batsman',
        avatar: '🏏',
        position: { x: 20, y: 20 },
        stats: { runs: 6211, average: 30.35, strikeRate: 130.61 }
      },
      'Jasprit Bumrah': {
        role: 'Bowler',
        avatar: '⚡',
        position: { x: 50, y: 10 },
        stats: { wickets: 145, economy: 7.39, average: 24.54 }
      },
      'Hardik Pandya': {
        role: 'All Rounder',
        avatar: '⭐',
        position: { x: 40, y: 50 },
        stats: { runs: 2915, wickets: 42, strikeRate: 143.89 }
      },
      'Ishan Kishan': {
        role: 'Wicket Keeper',
        avatar: '🥅',
        position: { x: 50, y: 85 },
        stats: { runs: 2644, average: 29.93, strikeRate: 135.04 }
      }
    }
  }
};

// Generate dynamic live match data
function generateLiveMatchData(battingTeam, bowlingTeam) {
  const battingPlayers = Object.keys(completeTeamData[battingTeam]?.players || {});
  
  return {
    currentScore: { 
      runs: Math.floor(Math.random() * 80) + 120, 
      wickets: Math.floor(Math.random() * 6) + 2, 
      overs: (Math.floor(Math.random() * 40) + 120) / 10 
    },
    target: Math.floor(Math.random() * 50) + 180,
    required: { 
      runs: Math.floor(Math.random() * 40) + 20, 
      balls: Math.floor(Math.random() * 30) + 15 
    },
    currentBatsmen: [
      battingPlayers[0] || 'Player 1',
      battingPlayers[1] || 'Player 2'
    ],
    runRate: { 
      current: (Math.random() * 4 + 7).toFixed(2), 
      required: (Math.random() * 3 + 8).toFixed(2) 
    }
  };
}

// Animated Player Avatar Component
const AnimatedPlayerAvatar = ({ player, playerData, isActive, onClick }) => {
  const roleColors = {
    'Batsman': '#FFD700',
    'Bowler': '#FF4757',
    'All Rounder': '#2ED573',
    'Wicket Keeper': '#FFA502'
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${playerData.position.x}%`,
        top: `${playerData.position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      whileHover={{ scale: 1.3 }}
      onClick={() => onClick(player, playerData)}
      animate={{
        scale: isActive ? 1.4 : 1,
        boxShadow: isActive ? `0 0 25px ${roleColors[playerData.role]}` : 'none'
      }}
    >
      <motion.div 
        className="w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl"
        style={{ background: `linear-gradient(135deg, ${roleColors[playerData.role]}, ${roleColors[playerData.role]}80)` }}
        animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {playerData.avatar}
      </motion.div>
    </motion.div>
  );
};

// 2D Cricket Field Component
function CricketField({ battingTeam, bowlingTeam, selectedPlayer, onPlayerSelect, liveMatchData }) {
  const battingTeamData = completeTeamData[battingTeam];

  if (!battingTeamData) {
    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-green-600 to-green-800 rounded-3xl overflow-hidden flex items-center justify-center">
        <p className="text-white text-xl">Loading field...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-green-600 to-green-800 rounded-3xl overflow-hidden border-4 border-white/30">
      {/* Animated Field Background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #16a34a, #15803d)',
            'linear-gradient(135deg, #15803d, #166534)',
            'linear-gradient(135deg, #16a34a, #15803d)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        {/* Pitch */}
        <motion.div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-32 bg-yellow-200 rounded-full opacity-80"
          animate={{
            boxShadow: [
              '0 0 10px rgba(255, 255, 255, 0.5)',
              '0 0 20px rgba(255, 255, 255, 0.8)',
              '0 0 10px rgba(255, 255, 255, 0.5)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Boundary Circle */}
        <motion.div 
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-white/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Batting Team Players */}
      {Object.entries(battingTeamData.players).map(([player, playerData]) => (
        <AnimatedPlayerAvatar
          key={`batting-${player}`}
          player={player}
          playerData={playerData}
          isActive={liveMatchData.currentBatsmen.includes(player)}
          onClick={onPlayerSelect}
        />
      ))}

      {/* Field Labels */}
      <motion.div 
        className="absolute top-4 left-4 text-white font-bold"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: battingTeamData.colors.primary }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span>{battingTeam} (Batting)</span>
          <span className="text-2xl">{battingTeamData.animatedLogo}</span>
        </div>
      </motion.div>
    </div>
  );
}

// Live Scoreboard Component
function LiveScoreboard({ battingTeam, bowlingTeam, liveMatchData }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const battingTeamData = completeTeamData[battingTeam];

  if (!battingTeamData) {
    return (
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-6 border-4 border-yellow-400">
        <p className="text-white text-center">Loading scoreboard...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-6 border-4 border-yellow-400"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            className="text-4xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {battingTeamData.animatedLogo}
          </motion.div>
          <div>
            <h3 className="text-white font-bold text-lg">{battingTeamData.fullName}</h3>
            <p className="text-gray-400 text-sm">vs {completeTeamData[bowlingTeam]?.fullName}</p>
          </div>
        </div>
        
        <div className="text-right">
          <motion.div 
            className="text-yellow-400 font-bold"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            LIVE
          </motion.div>
          <div className="text-white text-sm">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <motion.div className="text-center">
          <motion.div 
            className="text-4xl font-bold text-white"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {liveMatchData.currentScore.runs}
          </motion.div>
          <div className="text-gray-400">Runs</div>
        </motion.div>
        <motion.div className="text-center">
          <motion.div className="text-4xl font-bold text-red-400">
            {liveMatchData.currentScore.wickets}
          </motion.div>
          <div className="text-gray-400">Wickets</div>
        </motion.div>
        <motion.div className="text-center">
          <motion.div className="text-4xl font-bold text-blue-400">
            {liveMatchData.currentScore.overs}
          </motion.div>
          <div className="text-gray-400">Overs</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div className="text-center">
          <div className="text-lg font-bold text-blue-400">{liveMatchData.runRate.current}</div>
          <div className="text-white/70 text-sm">Current RR</div>
        </motion.div>
        <motion.div className="text-center">
          <div className="text-lg font-bold text-orange-400">{liveMatchData.runRate.required}</div>
          <div className="text-white/70 text-sm">Required RR</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Main Cricket Field Visualization Component
export default function CricketFieldVisualization() {
  const [battingTeam, setBattingTeam] = useState('CSK');
  const [bowlingTeam, setBowlingTeam] = useState('MI');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [liveMatchData, setLiveMatchData] = useState(generateLiveMatchData('CSK', 'MI'));

  const availableTeams = Object.keys(completeTeamData);

  const handlePlayerSelect = (playerName, playerData) => {
    setSelectedPlayer({
      name: playerName,
      data: playerData,
      team: completeTeamData[battingTeam].fullName
    });
  };

  const swapTeams = () => {
    const newBattingTeam = bowlingTeam;
    const newBowlingTeam = battingTeam;
    setBattingTeam(newBattingTeam);
    setBowlingTeam(newBowlingTeam);
    setSelectedPlayer(null);
    setLiveMatchData(generateLiveMatchData(newBattingTeam, newBowlingTeam));
  };

  const updateMatch = () => {
    setLiveMatchData(generateLiveMatchData(battingTeam, bowlingTeam));
    setSelectedPlayer(null);
  };

  return (
    <div className="space-y-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          🏏 Live Cricket Match Visualization
        </h1>
        <p className="text-blue-200 text-lg">
          Interactive 2D field with animated player avatars
        </p>
      </motion.div>

      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Batting Team</label>
            <select
              value={battingTeam}
              onChange={(e) => setBattingTeam(e.target.value)}
              className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400"
            >
              {availableTeams.filter(t => t !== bowlingTeam).map(team => (
                <option key={team} value={team} className="text-gray-900">
                  {completeTeamData[team].fullName}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-blue-200">Bowling Team</label>
            <select
              value={bowlingTeam}
              onChange={(e) => setBowlingTeam(e.target.value)}
              className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400"
            >
              {availableTeams.filter(t => t !== battingTeam).map(team => (
                <option key={team} value={team} className="text-gray-900">
                  {completeTeamData[team].fullName}
                </option>
              ))}
            </select>
          </div>
          
          <motion.button
            onClick={swapTeams}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={20} className="inline mr-2" />
            Swap
          </motion.button>
          
          <motion.button
            onClick={updateMatch}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Target size={20} className="inline mr-2" />
            Update
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CricketField
            battingTeam={battingTeam}
            bowlingTeam={bowlingTeam}
            selectedPlayer={selectedPlayer}
            onPlayerSelect={handlePlayerSelect}
            liveMatchData={liveMatchData}
          />
        </div>

        <div>
          <LiveScoreboard 
            battingTeam={battingTeam} 
            bowlingTeam={bowlingTeam} 
            liveMatchData={liveMatchData}
          />
        </div>
      </div>

      {/* Selected Player Details */}
      {selectedPlayer && (
        <motion.div
          className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/30"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Player Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-bold text-white">{selectedPlayer.name}</h4>
              <p className="text-blue-300">{selectedPlayer.team}</p>
              <p className="text-yellow-400">{selectedPlayer.data.role}</p>
            </div>
            <div className="space-y-2">
              {selectedPlayer.data.stats.runs && (
                <div className="flex justify-between">
                  <span className="text-white/70">Runs:</span>
                  <span className="text-yellow-400 font-bold">{selectedPlayer.data.stats.runs}</span>
                </div>
              )}
              {selectedPlayer.data.stats.wickets && (
                <div className="flex justify-between">
                  <span className="text-white/70">Wickets:</span>
                  <span className="text-red-400 font-bold">{selectedPlayer.data.stats.wickets}</span>
                </div>
              )}
              {selectedPlayer.data.stats.average && (
                <div className="flex justify-between">
                  <span className="text-white/70">Average:</span>
                  <span className="text-green-400 font-bold">{selectedPlayer.data.stats.average}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}