import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar } from 'recharts';
import { BarChart3, TrendingUp, PieChart as PieChartIcon, Activity, Award, Target, Crown } from 'lucide-react';

export default function MatchVisualization() {
  const [selectedMatch, setSelectedMatch] = useState('recent');

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

  const overByOverData = [
    { over: 1, runs: 8, wickets: 0, runRate: 8.0, cumulative: 8 },
    { over: 2, runs: 12, wickets: 0, runRate: 10.0, cumulative: 20 },
    { over: 3, runs: 6, wickets: 1, runRate: 8.67, cumulative: 26 },
    { over: 4, runs: 14, wickets: 0, runRate: 10.0, cumulative: 40 },
    { over: 5, runs: 9, wickets: 0, runRate: 9.8, cumulative: 49 },
    { over: 6, runs: 16, wickets: 0, runRate: 10.83, cumulative: 65 },
    { over: 7, runs: 7, wickets: 1, runRate: 10.29, cumulative: 72 },
    { over: 8, runs: 11, wickets: 0, runRate: 10.38, cumulative: 83 },
    { over: 9, runs: 8, wickets: 0, runRate: 10.11, cumulative: 91 },
    { over: 10, runs: 13, wickets: 1, runRate: 10.4, cumulative: 104 },
    { over: 11, runs: 9, wickets: 0, runRate: 10.27, cumulative: 113 },
    { over: 12, runs: 15, wickets: 0, runRate: 10.5, cumulative: 128 },
    { over: 13, runs: 6, wickets: 2, runRate: 10.15, cumulative: 134 },
    { over: 14, runs: 12, wickets: 0, runRate: 10.21, cumulative: 146 },
    { over: 15, runs: 18, wickets: 0, runRate: 10.53, cumulative: 164 },
    { over: 16, runs: 8, wickets: 1, runRate: 10.31, cumulative: 172 },
    { over: 17, runs: 14, wickets: 0, runRate: 10.41, cumulative: 186 },
    { over: 18, runs: 11, wickets: 1, runRate: 10.33, cumulative: 197 },
    { over: 19, runs: 16, wickets: 0, runRate: 10.47, cumulative: 213 },
    { over: 20, runs: 12, wickets: 2, runRate: 10.45, cumulative: 225 }
  ];

  const wagonWheelData = [
    { name: 'Leg Side', value: 45, color: '#3b82f6' },
    { name: 'Off Side', value: 35, color: '#ef4444' },
    { name: 'Straight', value: 20, color: '#10b981' }
  ];

  const playerContribution = [
    { name: 'Rohit Sharma', runs: 65, balls: 42, sr: 154.76, contribution: 35 },
    { name: 'Ishan Kishan', runs: 48, balls: 35, sr: 137.14, contribution: 26 },
    { name: 'Suryakumar Yadav', runs: 32, balls: 18, sr: 177.78, contribution: 17 },
    { name: 'Hardik Pandya', runs: 28, balls: 16, sr: 175.00, contribution: 15 },
    { name: 'Kieron Pollard', runs: 12, balls: 9, sr: 133.33, contribution: 7 }
  ];

  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

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
          <button
            onClick={() => setSelectedMatch('recent')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              selectedMatch === 'recent'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
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

      {/* Top Performers with 3D Effect */}
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
              className="bg-gradient-to-br from-white/20 to-white/10 rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20, rotateY: -10 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
              }}
              style={{ transformStyle: 'preserve-3d' }}
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

      {/* Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Over-by-Over Analysis */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="text-green-400" size={28} />
            Run Rate Analysis
          </h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overByOverData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="over" stroke="#ffffff80" />
                <YAxis stroke="#ffffff80" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cumulative"
                  stroke="#3b82f6"
                  fill="url(#colorCumulative)"
                  strokeWidth={3}
                />
                <defs>
                  <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Player Contribution Chart */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="text-yellow-400" size={28} />
            Player Contributions
          </h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={playerContribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff80" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="#ffffff80" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="runs" fill="#fbbf24" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Wagon Wheel */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <PieChartIcon className="text-yellow-400" size={28} />
            Shot Distribution
          </h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wagonWheelData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {wagonWheelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Strike Rate Comparison */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="text-red-400" size={28} />
            Strike Rate Analysis
          </h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={playerContribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis 
                  dataKey="name" 
                  stroke="#ffffff80" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="#ffffff80" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey="sr" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Key Moments */}
      <motion.div 
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6">Key Moments</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-green-500/20 rounded-xl border border-green-400/30">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">6</span>
            </div>
            <div>
              <div className="text-white font-bold">Over 6.4 - Rohit Sharma hits a massive six!</div>
              <div className="text-green-300 text-sm">95m six over deep mid-wicket</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-red-500/20 rounded-xl border border-red-400/30">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <div>
              <div className="text-white font-bold">Over 13.2 - Jadeja strikes twice!</div>
              <div className="text-red-300 text-sm">Two wickets in consecutive balls</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-blue-500/20 rounded-xl border border-blue-400/30">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">4</span>
            </div>
            <div>
              <div className="text-white font-bold">Over 19.5 - Hardik finds the gap!</div>
              <div className="text-blue-300 text-sm">Crucial boundary in the death overs</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}