import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Trophy, Users, TrendingUp, Target } from 'lucide-react';

const teamLogos = {
  'Mumbai Indians': 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  'Chennai Super Kings': 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  'Royal Challengers Bangalore': 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  'Kolkata Knight Riders': 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
};

export default function TeamComparison() {
  const [selectedTeams, setSelectedTeams] = useState(['Mumbai Indians', 'Chennai Super Kings']);

  const teamStats = {
    'Mumbai Indians': {
      matches: 14,
      wins: 9,
      losses: 5,
      winRate: 64.3,
      avgScore: 185,
      avgConceded: 172,
      batting: 85,
      bowling: 78,
      fielding: 82,
      experience: 90,
      form: 75,
      homeAdvantage: 88
    },
    'Chennai Super Kings': {
      matches: 14,
      wins: 8,
      losses: 6,
      winRate: 57.1,
      avgScore: 178,
      avgConceded: 175,
      batting: 82,
      bowling: 85,
      fielding: 88,
      experience: 95,
      form: 80,
      homeAdvantage: 85
    },
    'Royal Challengers Bangalore': {
      matches: 14,
      wins: 7,
      losses: 7,
      winRate: 50.0,
      avgScore: 182,
      avgConceded: 180,
      batting: 88,
      bowling: 72,
      fielding: 75,
      experience: 80,
      form: 70,
      homeAdvantage: 82
    },
    'Kolkata Knight Riders': {
      matches: 14,
      wins: 6,
      losses: 8,
      winRate: 42.9,
      avgScore: 175,
      avgConceded: 185,
      batting: 75,
      bowling: 80,
      fielding: 78,
      experience: 85,
      form: 65,
      homeAdvantage: 80
    }
  };

  const teams = Object.keys(teamStats);

  const getComparisonData = () => {
    return [
      {
        metric: 'Win Rate',
        [selectedTeams[0]]: teamStats[selectedTeams[0]].winRate,
        [selectedTeams[1]]: teamStats[selectedTeams[1]].winRate
      },
      {
        metric: 'Avg Score',
        [selectedTeams[0]]: teamStats[selectedTeams[0]].avgScore,
        [selectedTeams[1]]: teamStats[selectedTeams[1]].avgScore
      },
      {
        metric: 'Batting',
        [selectedTeams[0]]: teamStats[selectedTeams[0]].batting,
        [selectedTeams[1]]: teamStats[selectedTeams[1]].batting
      },
      {
        metric: 'Bowling',
        [selectedTeams[0]]: teamStats[selectedTeams[0]].bowling,
        [selectedTeams[1]]: teamStats[selectedTeams[1]].bowling
      },
      {
        metric: 'Fielding',
        [selectedTeams[0]]: teamStats[selectedTeams[0]].fielding,
        [selectedTeams[1]]: teamStats[selectedTeams[1]].fielding
      }
    ];
  };

  const getRadarData = (team) => {
    const stats = teamStats[team];
    return [
      { subject: 'Batting', value: stats.batting, fullMark: 100 },
      { subject: 'Bowling', value: stats.bowling, fullMark: 100 },
      { subject: 'Fielding', value: stats.fielding, fullMark: 100 },
      { subject: 'Experience', value: stats.experience, fullMark: 100 },
      { subject: 'Form', value: stats.form, fullMark: 100 },
      { subject: 'Home Advantage', value: stats.homeAdvantage, fullMark: 100 }
    ];
  };

  return (
    <div className="space-y-8">
      {/* Team Selection */}
      <motion.div 
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="text-yellow-400" size={32} />
          <h2 className="text-3xl font-bold text-white">Team Comparison</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-3">Team 1</label>
            <div className="relative">
              <select
                value={selectedTeams[0]}
                onChange={(e) => setSelectedTeams([e.target.value, selectedTeams[1]])}
                className="w-full p-4 pl-16 bg-white/20 border border-white/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400"
              >
                {teams.map(team => (
                  <option key={team} value={team} className="text-gray-900">{team}</option>
                ))}
              </select>
              <img 
                src={teamLogos[selectedTeams[0]]} 
                alt={selectedTeams[0]}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-200 mb-3">Team 2</label>
            <div className="relative">
              <select
                value={selectedTeams[1]}
                onChange={(e) => setSelectedTeams([selectedTeams[0], e.target.value])}
                className="w-full p-4 pl-16 bg-white/20 border border-white/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400"
              >
                {teams.filter(team => team !== selectedTeams[0]).map(team => (
                  <option key={team} value={team} className="text-gray-900">{team}</option>
                ))}
              </select>
              <img 
                src={teamLogos[selectedTeams[1]]} 
                alt={selectedTeams[1]}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Head-to-Head Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart className="text-blue-400" size={28} />
            Performance Comparison
          </h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getComparisonData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="metric" stroke="#ffffff80" />
                <YAxis stroke="#ffffff80" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px'
                  }}
                />
                <Bar dataKey={selectedTeams[0]} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey={selectedTeams[1]} fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="text-green-400" size={28} />
            Team Strengths
          </h3>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={getRadarData(selectedTeams[0])}>
                <PolarGrid stroke="#ffffff20" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff80', fontSize: 12 }} />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#ffffff60', fontSize: 10 }}
                />
                <Radar
                  name={selectedTeams[0]}
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name={selectedTeams[1]}
                  dataKey="value"
                  data={getRadarData(selectedTeams[1])}
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Detailed Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {selectedTeams.map((team, index) => (
          <motion.div
            key={team}
            className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/30"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src={teamLogos[team]}
                alt={team}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
              />
              <div>
                <h3 className="text-2xl font-bold text-white">{team}</h3>
                <p className="text-blue-300">Season 2023</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-400">{teamStats[team].wins}</div>
                <div className="text-white/70 text-sm">Wins</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-red-400">{teamStats[team].losses}</div>
                <div className="text-white/70 text-sm">Losses</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-blue-400">{teamStats[team].winRate}%</div>
                <div className="text-white/70 text-sm">Win Rate</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-2xl font-bold text-yellow-400">{teamStats[team].avgScore}</div>
                <div className="text-white/70 text-sm">Avg Score</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Batting Strength</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                      style={{ width: `${teamStats[team].batting}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-bold">{teamStats[team].batting}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Bowling Strength</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                      style={{ width: `${teamStats[team].bowling}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-bold">{teamStats[team].bowling}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Fielding</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-red-400 h-2 rounded-full"
                      style={{ width: `${teamStats[team].fielding}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-bold">{teamStats[team].fielding}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}