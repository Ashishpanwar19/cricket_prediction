import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Crown, Award } from 'lucide-react';

export default function MatchVisualization() {
  const [selectedMatch] = useState('recent');

  const matchData = {
    recent: {
      team1: 'Mumbai Indians',
      team2: 'Chennai Super Kings',
      score1: 185,
      score2: 170,
      winner: 'Mumbai Indians',
      manOfTheMatch: {
        name: 'Rohit Sharma',
        image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
        performance: '65* (42 balls, 6x4s, 2x6s)',
        team: 'Mumbai Indians'
      },
      topPerformers: [
        {
          name: 'Rohit Sharma',
          image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          runs: 65,
          balls: 42,
          team: 'Mumbai Indians',
          type: 'batsman'
        },
        {
          name: 'Jasprit Bumrah',
          image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          wickets: 3,
          runs: 28,
          team: 'Mumbai Indians',
          type: 'bowler'
        },
        {
          name: 'MS Dhoni',
          image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          runs: 45,
          balls: 32,
          team: 'Chennai Super Kings',
          type: 'batsman'
        }
      ]
    }
  };

  return (
    <div className="space-y-8">
      {/* Match Selection */}
      <motion.div 
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="text-purple-400" size={32} />
          <h2 className="text-3xl font-bold text-white">Match Analysis & Player Highlights</h2>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white">
            Recent Match: MI vs CSK
          </button>
        </div>
      </motion.div>

      {/* Man of the Match Highlight */}
      <motion.div 
        className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-8 border border-yellow-400/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Crown className="text-yellow-400" size={32} />
          <h3 className="text-2xl font-bold text-white">Man of the Match</h3>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={matchData[selectedMatch].manOfTheMatch.image}
              alt={matchData[selectedMatch].manOfTheMatch.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Crown size={16} className="text-gray-900" />
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-bold text-white">{matchData[selectedMatch].manOfTheMatch.name}</h4>
            <p className="text-yellow-300">{matchData[selectedMatch].manOfTheMatch.team}</p>
            <p className="text-white/80 mt-2">{matchData[selectedMatch].manOfTheMatch.performance}</p>
          </div>
        </div>
      </motion.div>

      {/* Top Performers */}
      <motion.div 
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Award className="text-blue-400" size={32} />
          <h3 className="text-2xl font-bold text-white">Top Performers</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matchData[selectedMatch].topPerformers.map((player, index) => (
            <motion.div
              key={player.name}
              className="bg-gradient-to-br from-white/20 to-white/10 rounded-2xl p-6 border border-white/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <div className="relative mb-4">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-3 border-blue-400"
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">#{index + 1}</span>
                  </div>
                </div>
                
                <h4 className="text-lg font-bold text-white mb-2">{player.name}</h4>
                <p className="text-blue-300 text-sm mb-4">{player.team}</p>
                
                <div className="space-y-2">
                  {player.type === 'batsman' ? (
                    <>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-2xl font-bold text-yellow-400">{player.runs}</div>
                        <div className="text-white/70 text-sm">Runs</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-lg font-bold text-green-400">{player.balls}</div>
                        <div className="text-white/70 text-sm">Balls</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-2xl font-bold text-red-400">{player.wickets}</div>
                        <div className="text-white/70 text-sm">Wickets</div>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <div className="text-lg font-bold text-blue-400">{player.runs}</div>
                        <div className="text-white/70 text-sm">Runs Given</div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Match Summary */}
      <motion.div 
        className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-8 border border-blue-400/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Match Result</h3>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">185/6</div>
              <div className="text-white">Mumbai Indians</div>
            </div>
            <div className="text-white text-xl">vs</div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400">170/8</div>
              <div className="text-white">Chennai Super Kings</div>
            </div>
          </div>
          <div className="mt-4 text-green-400 font-bold text-lg">
            Mumbai Indians won by 15 runs
          </div>
        </div>
      </motion.div>
    </div>
  );
}