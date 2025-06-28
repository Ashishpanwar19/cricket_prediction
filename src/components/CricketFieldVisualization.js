import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Target, Users, BarChart3, Zap, Star, TrendingUp, Award, Clock, MapPin } from 'lucide-react';

// Authentic team data with official colors and player information
const teamData = {
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

// Live match data simulation
const liveMatchData = {
  currentScore: { runs: 156, wickets: 4, overs: 16.3 },
  target: 185,
  required: { runs: 29, balls: 21 },
  currentBatsmen: ['MS Dhoni', 'Ravindra Jadeja'],
  currentBowler: 'Jasprit Bumrah',
  momentum: 'CSK',
  runRate: { current: 9.54, required: 8.29 }
};

// Player Position Component
function PlayerPosition({ player, playerData, teamColors, isHighlighted, onClick, isCurrentPlayer }) {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${playerData.position.x}%`,
        top: `${playerData.position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onClick(player, playerData)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: isCurrentPlayer ? 1.3 : 1,
        boxShadow: isCurrentPlayer ? `0 0 20px ${teamColors.primary}` : 'none'
      }}
      transition={{ delay: Math.random() * 0.5 }}
    >
      <div className="relative">
        {/* Player Image */}
        <div 
          className={`w-16 h-16 rounded-full border-4 overflow-hidden ${
            isCurrentPlayer ? 'border-yellow-400 animate-pulse' : 'border-white'
          }`}
          style={{ borderColor: isHighlighted ? teamColors.primary : undefined }}
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
        
        {/* Player Name */}
        <div 
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-bold text-white whitespace-nowrap"
          style={{ backgroundColor: teamColors.primary }}
        >
          {player.split(' ').pop()}
        </div>
        
        {/* Role Badge */}
        <div 
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ backgroundColor: teamColors.secondary }}
        >
          {playerData.role === 'Batsman' ? 'B' : 
           playerData.role === 'Bowler' ? 'BL' : 
           playerData.role === 'All Rounder' ? 'AR' : 'WK'}
        </div>
        
        {/* Current Player Indicator */}
        {isCurrentPlayer && (
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
  );
}

// Cricket Field Component
function CricketField({ battingTeam, bowlingTeam, selectedPlayer, onPlayerSelect }) {
  const battingTeamData = teamData[battingTeam];
  const bowlingTeamData = teamData[bowlingTeam];

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
        <PlayerPosition
          key={`batting-${player}`}
          player={player}
          playerData={playerData}
          teamColors={battingTeamData.colors}
          isHighlighted={selectedPlayer?.name === player}
          onClick={onPlayerSelect}
          isCurrentPlayer={liveMatchData.currentBatsmen.includes(player)}
        />
      ))}

      {/* Bowling Team Players (positioned differently) */}
      {Object.entries(bowlingTeamData.players).map(([player, playerData]) => {
        // Adjust positions for fielding team
        const fieldingPosition = {
          x: 100 - playerData.position.x,
          y: 100 - playerData.position.y
        };
        
        return (
          <PlayerPosition
            key={`bowling-${player}`}
            player={player}
            playerData={{...playerData, position: fieldingPosition}}
            teamColors={bowlingTeamData.colors}
            isHighlighted={selectedPlayer?.name === player}
            onClick={onPlayerSelect}
            isCurrentPlayer={liveMatchData.currentBowler === player}
          />
        );
      })}

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
function LiveScoreboard({ battingTeam, bowlingTeam }) {
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
      {/* Match Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img src={teamData[battingTeam].logo} alt={battingTeam} className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="text-white font-bold text-lg">{teamData[battingTeam].fullName}</h3>
            <p className="text-gray-400 text-sm">vs {teamData[bowlingTeam].fullName}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-yellow-400 font-bold">LIVE</div>
          <div className="text-white text-sm">{currentTime.toLocaleTimeString()}</div>
        </div>
      </div>

      {/* Current Score */}
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

      {/* Target & Required */}
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

      {/* Run Rates */}
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

// Player Statistics Panel
function PlayerStatsPanel({ selectedPlayer, teamColors }) {
  if (!selectedPlayer) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
        <Users className="text-white/50 mx-auto mb-4" size={48} />
        <p className="text-white/70">Click on a player to view detailed statistics</p>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center gap-4 mb-6">
        <img
          src={selectedPlayer.data.image}
          alt={selectedPlayer.name}
          className="w-20 h-20 rounded-full object-cover border-4"
          style={{ borderColor: teamColors.primary }}
        />
        <div>
          <h3 className="text-2xl font-bold text-white">{selectedPlayer.name}</h3>
          <p className="text-blue-300">{selectedPlayer.data.role}</p>
          <div 
            className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mt-2"
            style={{ backgroundColor: teamColors.primary }}
          >
            {selectedPlayer.team}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {selectedPlayer.data.stats.runs && (
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-yellow-400">{selectedPlayer.data.stats.runs}</div>
            <div className="text-white/70 text-sm">Career Runs</div>
          </div>
        )}
        
        {selectedPlayer.data.stats.wickets && (
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-red-400">{selectedPlayer.data.stats.wickets}</div>
            <div className="text-white/70 text-sm">Career Wickets</div>
          </div>
        )}
        
        {selectedPlayer.data.stats.average && (
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-green-400">{selectedPlayer.data.stats.average}</div>
            <div className="text-white/70 text-sm">Average</div>
          </div>
        )}
        
        {selectedPlayer.data.stats.strikeRate && (
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-400">{selectedPlayer.data.stats.strikeRate}</div>
            <div className="text-white/70 text-sm">Strike Rate</div>
          </div>
        )}
        
        {selectedPlayer.data.stats.economy && (
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-2xl font-bold text-purple-400">{selectedPlayer.data.stats.economy}</div>
            <div className="text-white/70 text-sm">Economy</div>
          </div>
        )}
      </div>

      {/* Performance Highlights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-white/10 to-white/5 rounded-xl">
        <h4 className="text-white font-bold mb-2">Performance Highlights</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/70">Form:</span>
            <span className="text-green-400">Excellent</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Recent Matches:</span>
            <span className="text-white">5 games</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Impact Rating:</span>
            <span className="text-yellow-400">★★★★☆</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Match Momentum Indicator
function MatchMomentum() {
  const momentumPercentage = liveMatchData.momentum === 'CSK' ? 65 : 35;
  
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="text-green-400" size={24} />
        <h3 className="text-xl font-bold text-white">Match Momentum</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white font-medium">CSK</span>
          <span className="text-yellow-400 font-bold">{momentumPercentage}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${momentumPercentage}%` }}
            transition={{ duration: 1.5 }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-white font-medium">MI</span>
          <span className="text-blue-400 font-bold">{100 - momentumPercentage}%</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-blue-400 to-cyan-400 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${100 - momentumPercentage}%` }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-white/10 rounded-xl">
        <p className="text-white/80 text-sm text-center">
          {liveMatchData.momentum} has the momentum with recent boundaries and partnerships
        </p>
      </div>
    </motion.div>
  );
}

// Main Cricket Field Visualization Component
export default function CricketFieldVisualization() {
  const [battingTeam, setBattingTeam] = useState('CSK');
  const [bowlingTeam, setBowlingTeam] = useState('MI');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerSelect = (playerName, playerData) => {
    const team = Object.keys(teamData).find(t => 
      teamData[t].players[playerName]
    );
    
    setSelectedPlayer({
      name: playerName,
      data: playerData,
      team: teamData[team].fullName,
      teamColors: teamData[team].colors
    });
  };

  const swapTeams = () => {
    setBattingTeam(bowlingTeam);
    setBowlingTeam(battingTeam);
    setSelectedPlayer(null);
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
          🏏 Live Cricket Match Visualization
        </h1>
        <p className="text-blue-200 text-lg">
          Interactive 2D field with real player positions and live statistics
        </p>
      </motion.div>

      {/* Team Logos and Match Info */}
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={teamData[battingTeam].logo} alt={battingTeam} className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-white">{teamData[battingTeam].fullName}</h2>
              <p className="text-blue-300">Captain: {teamData[battingTeam].captain}</p>
            </div>
          </div>
          
          <motion.button
            onClick={swapTeams}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Swap Innings
          </motion.button>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h2 className="text-2xl font-bold text-white">{teamData[bowlingTeam].fullName}</h2>
              <p className="text-red-300">Captain: {teamData[bowlingTeam].captain}</p>
            </div>
            <img src={teamData[bowlingTeam].logo} alt={bowlingTeam} className="w-16 h-16 rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Main Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cricket Field */}
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
            />
          </motion.div>
          
          {/* Field Instructions */}
          <motion.div
            className="mt-4 p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-white/80 text-sm text-center">
              👆 Click on players to view detailed statistics • ⭐ Current batsmen and bowler are highlighted
            </p>
          </div>
        </div>

        {/* Live Scoreboard */}
        <div>
          <LiveScoreboard battingTeam={battingTeam} bowlingTeam={bowlingTeam} />
        </div>
      </div>

      {/* Player Stats and Momentum */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PlayerStatsPanel 
          selectedPlayer={selectedPlayer} 
          teamColors={selectedPlayer?.teamColors || teamData[battingTeam].colors}
        />
        <MatchMomentum />
      </div>

      {/* Current Match Status */}
      <motion.div
        className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-3xl p-8 border border-green-400/30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Clock className="text-green-400" size={32} />
          <h3 className="text-2xl font-bold text-white">Current Match Status</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {liveMatchData.currentBatsmen.join(' & ')}
            </div>
            <div className="text-white/70">Current Batsmen</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">
              {liveMatchData.currentBowler}
            </div>
            <div className="text-white/70">Current Bowler</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {teamData[battingTeam].homeGround}
            </div>
            <div className="text-white/70">Venue</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}