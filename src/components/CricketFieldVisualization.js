import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Target, Users, BarChart3, Zap, Star, TrendingUp, Award, Clock, MapPin, RefreshCw } from 'lucide-react';

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
  },
  'RCB': {
    fullName: 'Royal Challengers Bangalore',
    logo: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: {
      primary: '#EC1C24',
      secondary: '#FFD700',
      accent: '#000000'
    },
    captain: 'Virat Kohli',
    homeGround: 'M. Chinnaswamy Stadium',
    players: {
      'Virat Kohli': {
        role: 'Batsman',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 25, y: 25 },
        stats: { runs: 7263, average: 37.25, strikeRate: 131.02 }
      },
      'Glenn Maxwell': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 45, y: 55 },
        stats: { runs: 2846, wickets: 38, strikeRate: 154.67 }
      },
      'Mohammed Siraj': {
        role: 'Bowler',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 55, y: 15 },
        stats: { wickets: 93, economy: 8.19, average: 27.89 }
      },
      'Dinesh Karthik': {
        role: 'Wicket Keeper',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 50, y: 80 },
        stats: { runs: 4842, average: 26.32, strikeRate: 135.36 }
      },
      'Wanindu Hasaranga': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 75, y: 45 },
        stats: { wickets: 26, economy: 7.65, strikeRate: 146.83 }
      }
    }
  },
  'KKR': {
    fullName: 'Kolkata Knight Riders',
    logo: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: {
      primary: '#3A225D',
      secondary: '#B3A123',
      accent: '#FFFFFF'
    },
    captain: 'Shreyas Iyer',
    homeGround: 'Eden Gardens',
    players: {
      'Shreyas Iyer': {
        role: 'Batsman',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 30, y: 30 },
        stats: { runs: 3127, average: 31.27, strikeRate: 123.18 }
      },
      'Andre Russell': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 60, y: 65 },
        stats: { runs: 2556, wickets: 73, strikeRate: 177.88 }
      },
      'Sunil Narine': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 40, y: 40 },
        stats: { runs: 1025, wickets: 148, economy: 6.67 }
      },
      'Pat Cummins': {
        role: 'Bowler',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 50, y: 12 },
        stats: { wickets: 32, economy: 7.86, average: 25.81 }
      },
      'Dinesh Karthik': {
        role: 'Wicket Keeper',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 50, y: 82 },
        stats: { runs: 4842, average: 26.32, strikeRate: 135.36 }
      }
    }
  },
  'DC': {
    fullName: 'Delhi Capitals',
    logo: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: {
      primary: '#17479E',
      secondary: '#EF1B23',
      accent: '#FFFFFF'
    },
    captain: 'Rishabh Pant',
    homeGround: 'Arun Jaitley Stadium',
    players: {
      'Rishabh Pant': {
        role: 'Wicket Keeper',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 50, y: 80 },
        stats: { runs: 3284, average: 34.52, strikeRate: 147.97 }
      },
      'Prithvi Shaw': {
        role: 'Batsman',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 15, y: 25 },
        stats: { runs: 1892, average: 24.25, strikeRate: 147.65 }
      },
      'Axar Patel': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 35, y: 50 },
        stats: { runs: 1058, wickets: 85, economy: 7.96 }
      },
      'Kagiso Rabada': {
        role: 'Bowler',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 55, y: 18 },
        stats: { wickets: 89, economy: 8.34, average: 20.82 }
      },
      'Mitchell Marsh': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 65, y: 55 },
        stats: { runs: 624, wickets: 13, strikeRate: 136.84 }
      }
    }
  },
  'PBKS': {
    fullName: 'Punjab Kings',
    logo: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: {
      primary: '#ED1A37',
      secondary: '#FDDE00',
      accent: '#FFFFFF'
    },
    captain: 'Shikhar Dhawan',
    homeGround: 'PCA Stadium',
    players: {
      'Shikhar Dhawan': {
        role: 'Batsman',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 20, y: 22 },
        stats: { runs: 6617, average: 34.84, strikeRate: 126.64 }
      },
      'Liam Livingstone': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 55, y: 60 },
        stats: { runs: 778, wickets: 10, strikeRate: 182.24 }
      },
      'Kagiso Rabada': {
        role: 'Bowler',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 48, y: 15 },
        stats: { wickets: 89, economy: 8.34, average: 20.82 }
      },
      'Jitesh Sharma': {
        role: 'Wicket Keeper',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 50, y: 78 },
        stats: { runs: 234, average: 19.50, strikeRate: 163.64 }
      },
      'Harpreet Brar': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 72, y: 42 },
        stats: { runs: 67, wickets: 25, economy: 7.65 }
      }
    }
  },
  'RR': {
    fullName: 'Rajasthan Royals',
    logo: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: {
      primary: '#254AA5',
      secondary: '#E91C7A',
      accent: '#FFFFFF'
    },
    captain: 'Sanju Samson',
    homeGround: 'Sawai Mansingh Stadium',
    players: {
      'Sanju Samson': {
        role: 'Wicket Keeper',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 50, y: 75 },
        stats: { runs: 3619, average: 28.27, strikeRate: 136.67 }
      },
      'Jos Buttler': {
        role: 'Batsman',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 18, y: 28 },
        stats: { runs: 2598, average: 40.59, strikeRate: 149.05 }
      },
      'Yuzvendra Chahal': {
        role: 'Bowler',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 52, y: 20 },
        stats: { wickets: 187, economy: 7.59, average: 22.18 }
      },
      'Shimron Hetmyer': {
        role: 'Batsman',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 38, y: 45 },
        stats: { runs: 1510, average: 27.45, strikeRate: 168.16 }
      },
      'Ravichandran Ashwin': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 68, y: 38 },
        stats: { runs: 454, wickets: 72, economy: 6.79 }
      }
    }
  },
  'SRH': {
    fullName: 'Sunrisers Hyderabad',
    logo: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    colors: {
      primary: '#FF822A',
      secondary: '#000000',
      accent: '#FFFFFF'
    },
    captain: 'Aiden Markram',
    homeGround: 'Rajiv Gandhi Stadium',
    players: {
      'Aiden Markram': {
        role: 'Batsman',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 25, y: 35 },
        stats: { runs: 1654, average: 31.80, strikeRate: 145.61 }
      },
      'Heinrich Klaasen': {
        role: 'Wicket Keeper',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 50, y: 72 },
        stats: { runs: 1429, average: 51.04, strikeRate: 171.37 }
      },
      'Rashid Khan': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 45, y: 35 },
        stats: { runs: 1069, wickets: 93, economy: 6.33 }
      },
      'Bhuvneshwar Kumar': {
        role: 'Bowler',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 50, y: 8 },
        stats: { wickets: 181, economy: 7.30, average: 23.21 }
      },
      'Abdul Samad': {
        role: 'All Rounder',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        position: { x: 70, y: 50 },
        stats: { runs: 573, wickets: 2, strikeRate: 147.56 }
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
      {/* Match Header */}
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
function MatchMomentum({ liveMatchData, battingTeam, bowlingTeam }) {
  const momentumPercentage = liveMatchData.momentum === battingTeam ? 65 : 35;
  
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
          <span className="text-white font-medium">{battingTeam}</span>
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
          <span className="text-white font-medium">{bowlingTeam}</span>
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
export default function CricketFieldVisualization({ 
  initialBattingTeam = 'CSK', 
  initialBowlingTeam = 'MI',
  teamData: externalTeamData
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

  // Update live data when teams change
  useEffect(() => {
    setLiveMatchData(generateLiveMatchData(battingTeam, bowlingTeam));
  }, [battingTeam, bowlingTeam]);

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
          Interactive 2D field with real player positions and live statistics for all IPL teams
        </p>
      </motion.div>

      {/* Team Selection and Controls */}
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

        {/* Match Info */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={completeTeamData[battingTeam].logo} alt={battingTeam} className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-white">{completeTeamData[battingTeam].fullName}</h2>
              <p className="text-blue-300">Captain: {completeTeamData[battingTeam].captain}</p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">VS</div>
            <div className="text-yellow-400 text-sm">IPL 2024</div>
            <div className="text-blue-300 text-xs mt-1">
              {completeTeamData[battingTeam].homeGround}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <h2 className="text-2xl font-bold text-white">{completeTeamData[bowlingTeam].fullName}</h2>
              <p className="text-red-300">Captain: {completeTeamData[bowlingTeam].captain}</p>
            </div>
            <img src={completeTeamData[bowlingTeam].logo} alt={bowlingTeam} className="w-16 h-16 rounded-full" />
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
              liveMatchData={liveMatchData}
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
              👆 Click on players to view detailed statistics • ⭐ Current batsmen and bowler are highlighted • 🔄 Use controls to change teams
            </p>
          </motion.div>
        </div>

        {/* Live Scoreboard */}
        <div>
          <LiveScoreboard 
            battingTeam={battingTeam} 
            bowlingTeam={bowlingTeam} 
            liveMatchData={liveMatchData}
          />
        </div>
      </div>

      {/* Player Stats and Momentum */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PlayerStatsPanel 
          selectedPlayer={selectedPlayer} 
          teamColors={selectedPlayer?.teamColors || completeTeamData[battingTeam].colors}
        />
        <MatchMomentum 
          liveMatchData={liveMatchData}
          battingTeam={battingTeam}
          bowlingTeam={bowlingTeam}
        />
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
              {completeTeamData[battingTeam].homeGround}
            </div>
            <div className="text-white/70">Venue</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}