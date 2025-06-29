import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, TrendingUp, Clock, RefreshCw, Star } from 'lucide-react';

// Complete team data for all IPL teams with player information
const completeTeamData = {
  'CSK': {
    fullName: 'Chennai Super Kings',
    logo: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: {
      primary: '#FFFF3C',
      secondary: '#F99D1C',
      accent: '#1F4788'
    },
    captain: 'MS Dhoni',
    homeGround: 'MA Chidambaram Stadium',
    players: {
      'MS Dhoni': {
        role: 'Wicket Keeper',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 50, y: 85 },
        stats: { runs: 4632, average: 38.09, strikeRate: 135.92 }
      },
      'Ruturaj Gaikwad': {
        role: 'Batsman',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 20, y: 20 },
        stats: { runs: 2380, average: 32.43, strikeRate: 129.18 }
      },
      'Ravindra Jadeja': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 30, y: 60 },
        stats: { runs: 2756, wickets: 157, average: 29.95 }
      },
      'Deepak Chahar': {
        role: 'Bowler',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 50, y: 10 },
        stats: { wickets: 59, economy: 7.28, average: 27.81 }
      },
      'Moeen Ali': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 70, y: 40 },
        stats: { runs: 1162, wickets: 25, strikeRate: 157.59 }
      }
    }
  },
  'MI': {
    fullName: 'Mumbai Indians',
    logo: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: {
      primary: '#004BA0',
      secondary: '#D1AB3E',
      accent: '#FFFFFF'
    },
    captain: 'Rohit Sharma',
    homeGround: 'Wankhede Stadium',
    players: {
      'Rohit Sharma': {
        role: 'Batsman',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 20, y: 20 },
        stats: { runs: 6211, average: 30.35, strikeRate: 130.61 }
      },
      'Jasprit Bumrah': {
        role: 'Bowler',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 50, y: 10 },
        stats: { wickets: 145, economy: 7.39, average: 24.54 }
      },
      'Hardik Pandya': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 40, y: 50 },
        stats: { runs: 2915, wickets: 42, strikeRate: 143.89 }
      },
      'Ishan Kishan': {
        role: 'Wicket Keeper',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 50, y: 85 },
        stats: { runs: 2644, average: 29.93, strikeRate: 135.04 }
      },
      'Kieron Pollard': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 70, y: 60 },
        stats: { runs: 3412, wickets: 69, strikeRate: 147.32 }
      }
    }
  }
};

// Generate dynamic live match data based on teams
function generateLiveMatchData(battingTeam, bowlingTeam) {
  const battingPlayers = Object.keys(completeTeamData[battingTeam].players);
  const bowlingPlayers = Object.keys(completeTeamData[bowlingTeam].players);
  
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
      battingPlayers[Math.floor(Math.random() * battingPlayers.length)],
      battingPlayers[Math.floor(Math.random() * battingPlayers.length)]
    ],
    currentBowler: bowlingPlayers[Math.floor(Math.random() * bowlingPlayers.length)],
    momentum: Math.random() > 0.5 ? battingTeam : bowlingTeam,
    runRate: { 
      current: (Math.random() * 4 + 7).toFixed(2), 
      required: (Math.random() * 3 + 8).toFixed(2) 
    }
  };
}

// Team Selector Component
function TeamSelector({ teams, selectedTeam, onTeamSelect, label }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-blue-200">{label}</label>
      <select
        value={selectedTeam}
        onChange={(e) => onTeamSelect(e.target.value)}
        className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400"
      >
        {teams.map(team => (
          <option key={team} value={team} className="text-gray-900">
            {completeTeamData[team].fullName}
          </option>
        ))}
      </select>
    </div>
  );
}

// 2D Cricket Field Component (Simplified)
function CricketField({ battingTeam, bowlingTeam, selectedPlayer, onPlayerSelect, liveMatchData }) {
  const battingTeamData = completeTeamData[battingTeam];
  const bowlingTeamData = completeTeamData[bowlingTeam];

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-green-600 to-green-800 rounded-3xl overflow-hidden border-4 border-white/30">
      {/* Field Background */}
      <div className="absolute inset-0">
        {/* Pitch */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-32 bg-yellow-200 rounded-full opacity-80" />
        
        {/* Boundary Circle */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-white/30 rounded-full" />
        
        {/* 30-yard Circle */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/20 rounded-full" />
      </div>

      {/* Batting Team Players */}
      {Object.entries(battingTeamData.players).map(([player, playerData]) => (
        <motion.div
          key={`batting-${player}`}
          className="absolute cursor-pointer"
          style={{
            left: `${playerData.position.x}%`,
            top: `${playerData.position.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onPlayerSelect(player, playerData)}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: liveMatchData.currentBatsmen.includes(player) ? 1.3 : 1,
            boxShadow: liveMatchData.currentBatsmen.includes(player) ? `0 0 20px ${battingTeamData.colors.primary}` : 'none'
          }}
          transition={{ delay: Math.random() * 0.5 }}
        >
          <div className="relative">
            <div 
              className={`w-16 h-16 rounded-full border-4 overflow-hidden ${
                liveMatchData.currentBatsmen.includes(player) ? 'border-yellow-400 animate-pulse' : 'border-white'
              }`}
            >
              <img
                src={playerData.image}
                alt={player}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
                }}
              />
            </div>
            
            <div 
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-bold text-white whitespace-nowrap"
              style={{ backgroundColor: battingTeamData.colors.primary }}
            >
              {player.split(' ').pop()}
            </div>
            
            <div 
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ backgroundColor: battingTeamData.colors.secondary }}
            >
              {playerData.role === 'Batsman' ? 'B' : 
               playerData.role === 'Bowler' ? 'BL' : 
               playerData.role === 'All Rounder' ? 'AR' : 'WK'}
            </div>
            
            {liveMatchData.currentBatsmen.includes(player) && (
              <motion.div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Star className="text-yellow-400" size={16} />
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Field Labels */}
      <div className="absolute top-4 left-4 text-white font-bold">
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: battingTeamData.colors.primary }}
          />
          <span>{battingTeam} (Batting)</span>
        </div>
      </div>
      
      <div className="absolute top-4 right-4 text-white font-bold">
        <div className="flex items-center gap-2">
          <span>{bowlingTeam} (Bowling)</span>
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: bowlingTeamData.colors.primary }}
          />
        </div>
      </div>
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

  return (
    <motion.div
      className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-6 border-4 border-yellow-400"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img src={completeTeamData[battingTeam].logo} alt={battingTeam} className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="text-white font-bold text-lg">{completeTeamData[battingTeam].fullName}</h3>
            <p className="text-gray-400 text-sm">vs {completeTeamData[bowlingTeam].fullName}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-yellow-400 font-bold">LIVE</div>
          <div className="text-white text-sm">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-white">{liveMatchData.currentScore.runs}</div>
          <div className="text-gray-400">Runs</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-red-400">{liveMatchData.currentScore.wickets}</div>
          <div className="text-gray-400">Wickets</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-400">{liveMatchData.currentScore.overs}</div>
          <div className="text-gray-400">Overs</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{liveMatchData.target}</div>
          <div className="text-white/70 text-sm">Target</div>
        </div>
        <div className="bg-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{liveMatchData.required.runs}</div>
          <div className="text-white/70 text-sm">Required ({liveMatchData.required.balls} balls)</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-400">{liveMatchData.runRate.current}</div>
          <div className="text-white/70 text-sm">Current RR</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-400">{liveMatchData.runRate.required}</div>
          <div className="text-white/70 text-sm">Required RR</div>
        </div>
      </div>
    </motion.div>
  );
}

// Main Cricket Field Visualization Component
export default function CricketFieldVisualization({ 
  initialBattingTeam = 'CSK', 
  initialBowlingTeam = 'MI'
}) {
  const [battingTeam, setBattingTeam] = useState(initialBattingTeam);
  const [bowlingTeam, setBowlingTeam] = useState(initialBowlingTeam);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [liveMatchData, setLiveMatchData] = useState(
    generateLiveMatchData(initialBattingTeam, initialBowlingTeam)
  );

  const availableTeams = Object.keys(completeTeamData);

  const handlePlayerSelect = (playerName, playerData) => {
    const team = Object.keys(completeTeamData).find(t => 
      completeTeamData[t].players[playerName]
    );
    
    setSelectedPlayer({
      name: playerName,
      data: playerData,
      team: completeTeamData[team].fullName,
      teamColors: completeTeamData[team].colors
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

  useEffect(() => {
    setLiveMatchData(generateLiveMatchData(battingTeam, bowlingTeam));
  }, [battingTeam, bowlingTeam]);

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
          Interactive 2D field with real player positions and live statistics
        </p>
      </motion.div>

      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <TeamSelector
            teams={availableTeams.filter(t => t !== bowlingTeam)}
            selectedTeam={battingTeam}
            onTeamSelect={setBattingTeam}
            label="Batting Team"
          />
          
          <TeamSelector
            teams={availableTeams.filter(t => t !== battingTeam)}
            selectedTeam={bowlingTeam}
            onTeamSelect={setBowlingTeam}
            label="Bowling Team"
          />
          
          <motion.button
            onClick={swapTeams}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw size={20} className="inline mr-2" />
            Swap Innings
          </motion.button>
          
          <motion.button
            onClick={updateMatch}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Target size={20} className="inline mr-2" />
            Update Match
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CricketField
              battingTeam={battingTeam}
              bowlingTeam={bowlingTeam}
              selectedPlayer={selectedPlayer}
              onPlayerSelect={handlePlayerSelect}
              liveMatchData={liveMatchData}
            />
          </motion.div>
        </div>

        <div>
          <LiveScoreboard 
            battingTeam={battingTeam} 
            bowlingTeam={bowlingTeam} 
            liveMatchData={liveMatchData}
          />
        </div>
      </div>
    </div>
  );
}