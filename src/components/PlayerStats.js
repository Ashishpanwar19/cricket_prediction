import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Award, Star, TrendingUp, Users } from 'lucide-react';

// Animated player avatars using CSS-based animations and geometric patterns
const generateAnimatedAvatar = (playerName, role) => {
  const colors = {
    'Batsman': ['#FFD700', '#FF6B35', '#F7931E'],
    'Bowler': ['#FF4757', '#5352ED', '#3742FA'],
    'All Rounder': ['#2ED573', '#1E90FF', '#9C88FF'],
    'Wicket Keeper': ['#FFA502', '#FF6348', '#FF7675']
  };
  
  const roleColors = colors[role] || colors['Batsman'];
  const initials = playerName.split(' ').map(n => n[0]).join('').substring(0, 2);
  
  return {
    initials,
    colors: roleColors,
    pattern: Math.floor(Math.random() * 4) + 1
  };
};

// Animated Avatar Component
const AnimatedAvatar = ({ player, size = 'w-16 h-16' }) => {
  const avatar = generateAnimatedAvatar(player.name, player.role || player.position);
  
  return (
    <motion.div
      className={`${size} rounded-full relative overflow-hidden border-2 border-white/30`}
      style={{
        background: `linear-gradient(135deg, ${avatar.colors[0]}, ${avatar.colors[1]}, ${avatar.colors[2]})`
      }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {avatar.pattern === 1 && (
          <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
        )}
        {avatar.pattern === 2 && (
          <div className="w-full h-full" style={{
            background: 'radial-gradient(circle at 30% 30%, white 2px, transparent 2px), radial-gradient(circle at 70% 70%, white 2px, transparent 2px)',
            backgroundSize: '20px 20px'
          }} />
        )}
        {avatar.pattern === 3 && (
          <div className="w-full h-full" style={{
            background: 'linear-gradient(45deg, transparent 40%, white 40%, white 60%, transparent 60%)',
            backgroundSize: '10px 10px'
          }} />
        )}
        {avatar.pattern === 4 && (
          <div className="w-full h-full" style={{
            background: 'conic-gradient(from 0deg, transparent, white, transparent)'
          }} />
        )}
      </motion.div>
      
      {/* Player initials */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-white font-bold text-lg"
          animate={{
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {avatar.initials}
        </motion.span>
      </div>
      
      {/* Role indicator */}
      <motion.div
        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold"
        style={{ backgroundColor: avatar.colors[0] }}
        animate={{
          y: [-2, 2, -2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {player.role === 'Batsman' ? '🏏' : 
         player.role === 'Bowler' ? '⚡' : 
         player.role === 'All Rounder' ? '⭐' : '🥅'}
      </motion.div>
    </motion.div>
  );
};

export default function PlayerStats() {
  const [selectedCategory, setSelectedCategory] = useState('batsmen');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const playerData = {
    batsmen: [
      {
        id: 1,
        name: "Virat Kohli",
        team: "Royal Challengers Bangalore",
        runs: 7263,
        average: 37.25,
        strikeRate: 131.97,
        centuries: 5,
        fifties: 50,
        highestScore: 113,
        recentForm: [45, 67, 12, 89, 34],
        position: "Top Order",
        battingStyle: "Right-hand bat",
        role: "Batsman",
        nationality: "India",
        age: 35,
        price: "17.0 Cr"
      },
      {
        id: 2,
        name: "Rohit Sharma",
        team: "Mumbai Indians",
        runs: 6211,
        average: 30.35,
        strikeRate: 130.61,
        centuries: 1,
        fifties: 40,
        highestScore: 109,
        recentForm: [67, 23, 78, 45, 91],
        position: "Opener",
        battingStyle: "Right-hand bat",
        role: "Batsman",
        nationality: "India",
        age: 36,
        price: "16.0 Cr"
      },
      {
        id: 3,
        name: "KL Rahul",
        team: "Punjab Kings",
        runs: 4683,
        average: 47.31,
        strikeRate: 135.38,
        centuries: 4,
        fifties: 32,
        highestScore: 132,
        recentForm: [89, 45, 67, 23, 78],
        position: "Opener",
        battingStyle: "Right-hand bat",
        role: "Batsman",
        nationality: "India",
        age: 31,
        price: "17.0 Cr"
      },
      {
        id: 4,
        name: "Jos Buttler",
        team: "Rajasthan Royals",
        runs: 3582,
        average: 40.25,
        strikeRate: 148.97,
        centuries: 4,
        fifties: 22,
        highestScore: 124,
        recentForm: [103, 89, 45, 67, 23],
        position: "Opener",
        battingStyle: "Right-hand bat",
        role: "Wicket Keeper",
        nationality: "England",
        age: 33,
        price: "10.0 Cr"
      }
    ],
    bowlers: [
      {
        id: 5,
        name: "Jasprit Bumrah",
        team: "Mumbai Indians",
        wickets: 145,
        average: 24.54,
        economy: 7.39,
        strikeRate: 19.9,
        bestFigures: "4/14",
        recentForm: [2, 1, 3, 0, 2],
        bowlingStyle: "Right-arm fast",
        role: "Bowler",
        nationality: "India",
        age: 30,
        price: "12.0 Cr"
      },
      {
        id: 6,
        name: "Rashid Khan",
        team: "Sunrisers Hyderabad",
        wickets: 93,
        average: 20.78,
        economy: 6.33,
        strikeRate: 19.7,
        bestFigures: "3/7",
        recentForm: [1, 3, 2, 1, 2],
        bowlingStyle: "Right-arm leg-spin",
        role: "Bowler",
        nationality: "Afghanistan",
        age: 25,
        price: "15.0 Cr"
      },
      {
        id: 7,
        name: "Yuzvendra Chahal",
        team: "Rajasthan Royals",
        wickets: 187,
        average: 22.62,
        economy: 7.59,
        strikeRate: 17.9,
        bestFigures: "5/40",
        recentForm: [2, 0, 3, 1, 2],
        bowlingStyle: "Right-arm leg-spin",
        role: "Bowler",
        nationality: "India",
        age: 33,
        price: "6.5 Cr"
      }
    ],
    allRounders: [
      {
        id: 8,
        name: "Hardik Pandya",
        team: "Mumbai Indians",
        runs: 2915,
        wickets: 42,
        average: 28.89,
        strikeRate: 143.89,
        economy: 8.24,
        recentForm: [34, 2, 45, 1, 67],
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm fast-medium",
        role: "All Rounder",
        nationality: "India",
        age: 30,
        price: "15.0 Cr"
      },
      {
        id: 9,
        name: "Ravindra Jadeja",
        team: "Chennai Super Kings",
        runs: 2756,
        wickets: 157,
        average: 29.95,
        strikeRate: 127.3,
        economy: 7.68,
        recentForm: [23, 3, 34, 2, 45],
        battingStyle: "Left-hand bat",
        bowlingStyle: "Slow left-arm orthodox",
        role: "All Rounder",
        nationality: "India",
        age: 35,
        price: "16.0 Cr"
      },
      {
        id: 10,
        name: "Andre Russell",
        team: "Kolkata Knight Riders",
        runs: 2556,
        wickets: 73,
        average: 29.49,
        strikeRate: 179.33,
        economy: 8.76,
        recentForm: [88, 4, 23, 2, 45],
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm fast",
        role: "All Rounder",
        nationality: "West Indies",
        age: 36,
        price: "12.0 Cr"
      }
    ]
  };

  const categories = [
    { id: 'batsmen', label: 'Top Batsmen', icon: Target, color: 'from-yellow-500 to-orange-500' },
    { id: 'bowlers', label: 'Top Bowlers', icon: Trophy, color: 'from-red-500 to-pink-500' },
    { id: 'allRounders', label: 'All-Rounders', icon: Award, color: 'from-purple-500 to-indigo-500' }
  ];

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(selectedPlayer?.id === player.id ? null : player);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Users className="text-blue-400" size={40} />
          Player Statistics with Animated Avatars
        </h1>
        <p className="text-blue-200 text-lg">
          Comprehensive player data with beautiful animated profile pictures
        </p>
      </motion.div>

      {/* Category Selection */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedPlayer(null);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                  : 'bg-white/10 text-white hover:bg-white/20 hover:scale-102'
              }`}
            >
              <Icon size={20} />
              {category.label}
              <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                {playerData[category.id].length}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Player Showcase */}
      <motion.div 
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="text-yellow-400" size={32} />
          <h2 className="text-3xl font-bold text-white">Player Statistics</h2>
        </div>

        {/* Selected Player Details */}
        {selectedPlayer && (
          <motion.div
            className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/30 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-6 mb-6">
              <AnimatedAvatar player={selectedPlayer} size="w-24 h-24" />
              <div>
                <h3 className="text-3xl font-bold text-white">{selectedPlayer.name}</h3>
                <p className="text-blue-300 text-lg">{selectedPlayer.team}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="text-yellow-400" size={16} />
                  <span className="text-yellow-400 text-sm font-bold">Featured Player</span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-white/70">
                  <span>🏳️ {selectedPlayer.nationality}</span>
                  <span>🎂 {selectedPlayer.age} years</span>
                  <span>💰 ₹{selectedPlayer.price}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {selectedCategory === 'batsmen' && (
                <>
                  <motion.div 
                    className="bg-white/10 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-yellow-400">{selectedPlayer.runs}</div>
                    <div className="text-white/70 text-sm">Runs</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-green-400">{selectedPlayer.average}</div>
                    <div className="text-white/70 text-sm">Average</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-blue-400">{selectedPlayer.strikeRate}</div>
                    <div className="text-white/70 text-sm">Strike Rate</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-purple-400">{selectedPlayer.centuries}</div>
                    <div className="text-white/70 text-sm">Centuries</div>
                  </motion.div>
                </>
              )}

              {selectedCategory === 'bowlers' && (
                <>
                  <motion.div 
                    className="bg-white/10 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-red-400">{selectedPlayer.wickets}</div>
                    <div className="text-white/70 text-sm">Wickets</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-green-400">{selectedPlayer.average}</div>
                    <div className="text-white/70 text-sm">Average</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-blue-400">{selectedPlayer.economy}</div>
                    <div className="text-white/70 text-sm">Economy</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-purple-400">{selectedPlayer.bestFigures}</div>
                    <div className="text-white/70 text-sm">Best Figures</div>
                  </motion.div>
                </>
              )}

              {selectedCategory === 'allRounders' && (
                <>
                  <motion.div 
                    className="bg-white/10 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-yellow-400">{selectedPlayer.runs}</div>
                    <div className="text-white/70 text-sm">Runs</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-red-400">{selectedPlayer.wickets}</div>
                    <div className="text-white/70 text-sm">Wickets</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-green-400">{selectedPlayer.average}</div>
                    <div className="text-white/70 text-sm">Batting Avg</div>
                  </motion.div>
                  <motion.div 
                    className="bg-white/10 rounded-xl p-4 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl font-bold text-blue-400">{selectedPlayer.strikeRate}</div>
                    <div className="text-white/70 text-sm">Strike Rate</div>
                  </motion.div>
                </>
              )}
            </div>

            {/* Recent Form */}
            <div className="mt-6">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <TrendingUp size={16} />
                Recent Form (Last 5 matches)
              </h4>
              <div className="flex gap-2">
                {selectedPlayer.recentForm.map((score, index) => (
                  <motion.div
                    key={index}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${
                      score > 50 || score > 2 ? 'bg-green-500' : score > 25 || score > 1 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {score}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Player Style Information */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <h5 className="text-white font-bold mb-2">Playing Style</h5>
                <div className="text-white/80 text-sm space-y-1">
                  {selectedPlayer.battingStyle && (
                    <p><span className="text-blue-300">Batting:</span> {selectedPlayer.battingStyle}</p>
                  )}
                  {selectedPlayer.bowlingStyle && (
                    <p><span className="text-red-300">Bowling:</span> {selectedPlayer.bowlingStyle}</p>
                  )}
                  {selectedPlayer.position && (
                    <p><span className="text-green-300">Position:</span> {selectedPlayer.position}</p>
                  )}
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <h5 className="text-white font-bold mb-2">Career Highlights</h5>
                <div className="text-white/80 text-sm space-y-1">
                  {selectedPlayer.highestScore && (
                    <p><span className="text-yellow-300">Highest Score:</span> {selectedPlayer.highestScore}</p>
                  )}
                  {selectedPlayer.bestFigures && (
                    <p><span className="text-red-300">Best Bowling:</span> {selectedPlayer.bestFigures}</p>
                  )}
                  {selectedPlayer.fifties && (
                    <p><span className="text-green-300">Fifties:</span> {selectedPlayer.fifties}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Player Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playerData[selectedCategory].map((player, index) => (
            <motion.div
              key={player.id}
              className={`bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                selectedPlayer?.id === player.id 
                  ? 'border-yellow-400 shadow-lg shadow-yellow-400/20 scale-105' 
                  : 'border-white/30 hover:border-white/50 hover:scale-102'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => handlePlayerSelect(player)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <AnimatedAvatar player={player} />
                  <motion.div 
                    className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    <span className="text-xs font-bold text-gray-900">#{index + 1}</span>
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{player.name}</h3>
                  <p className="text-blue-300 text-sm">{player.team}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                      {player.role}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {selectedCategory === 'batsmen' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-white/70">Runs:</span>
                      <span className="text-yellow-400 font-bold">{player.runs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Average:</span>
                      <span className="text-green-400 font-bold">{player.average}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Strike Rate:</span>
                      <span className="text-blue-400 font-bold">{player.strikeRate}</span>
                    </div>
                  </>
                )}

                {selectedCategory === 'bowlers' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-white/70">Wickets:</span>
                      <span className="text-red-400 font-bold">{player.wickets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Average:</span>
                      <span className="text-green-400 font-bold">{player.average}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Economy:</span>
                      <span className="text-blue-400 font-bold">{player.economy}</span>
                    </div>
                  </>
                )}

                {selectedCategory === 'allRounders' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-white/70">Runs:</span>
                      <span className="text-yellow-400 font-bold">{player.runs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Wickets:</span>
                      <span className="text-red-400 font-bold">{player.wickets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Strike Rate:</span>
                      <span className="text-blue-400 font-bold">{player.strikeRate}</span>
                    </div>
                  </>
                )}
              </div>

              <motion.div 
                className="mt-4 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-center text-white/80 text-sm font-medium">
                  {selectedCategory === 'batsmen' && '🏏 Batting Powerhouse'}
                  {selectedCategory === 'bowlers' && '⚡ Bowling Maestro'}
                  {selectedCategory === 'allRounders' && '🌟 Complete Player'}
                </p>
                <div className="flex justify-center items-center gap-2 mt-2 text-xs text-white/60">
                  <span>🏳️ {player.nationality}</span>
                  <span>•</span>
                  <span>🎂 {player.age}y</span>
                  <span>•</span>
                  <span>💰 ₹{player.price}</span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Statistics Summary */}
      <motion.div
        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-8 border border-blue-400/30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          🏆 Category Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const players = playerData[category.id];
            const totalPlayers = players.length;
            const avgAge = Math.round(players.reduce((sum, p) => sum + p.age, 0) / totalPlayers);
            
            return (
              <motion.div
                key={category.id}
                className="bg-white/10 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <category.icon className="text-white mx-auto mb-3" size={32} />
                <h4 className="text-lg font-bold text-white mb-2">{category.label}</h4>
                <div className="space-y-2 text-sm text-white/80">
                  <p>Total Players: <span className="text-blue-400 font-bold">{totalPlayers}</span></p>
                  <p>Average Age: <span className="text-green-400 font-bold">{avgAge} years</span></p>
                  <p>Category: <span className="text-yellow-400 font-bold">{category.id}</span></p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}