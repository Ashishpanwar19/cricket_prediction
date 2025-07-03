import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Users, Trophy, BarChart3, Search, RefreshCw } from 'lucide-react';

export default function EnhancedDatabase() {
  const [activeTab, setActiveTab] = useState('teams');
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demo
  useEffect(() => {
    setTeams([
      { id: 1, name: 'Mumbai Indians', short_name: 'MI', wins: 140, losses: 80, titles: 5, captain: 'Rohit Sharma', home_ground: 'Wankhede Stadium', founded_year: 2008, matches_played: 220 },
      { id: 2, name: 'Chennai Super Kings', short_name: 'CSK', wins: 130, losses: 80, titles: 4, captain: 'MS Dhoni', home_ground: 'MA Chidambaram Stadium', founded_year: 2008, matches_played: 210 },
      { id: 3, name: 'Royal Challengers Bangalore', short_name: 'RCB', wins: 110, losses: 120, titles: 0, captain: 'Virat Kohli', home_ground: 'M. Chinnaswamy Stadium', founded_year: 2008, matches_played: 230 },
      { id: 4, name: 'Kolkata Knight Riders', short_name: 'KKR', wins: 100, losses: 100, titles: 2, captain: 'Shreyas Iyer', home_ground: 'Eden Gardens', founded_year: 2008, matches_played: 200 }
    ]);

    setPlayers([
      { 
        id: 1, 
        name: 'Virat Kohli', 
        team_name: 'Royal Challengers Bangalore', 
        role: 'Batsman', 
        runs_scored: 7263, 
        batting_average: 37.25,
        strike_rate: 131.97,
        age: 35,
        nationality: 'India',
        price_crores: 17.0,
        image_url: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      { 
        id: 2, 
        name: 'Rohit Sharma', 
        team_name: 'Mumbai Indians', 
        role: 'Batsman', 
        runs_scored: 6211, 
        batting_average: 30.35,
        strike_rate: 130.61,
        age: 36,
        nationality: 'India',
        price_crores: 16.0,
        image_url: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      }
    ]);

    setMatches([
      { 
        id: 1, 
        team1_name: 'Mumbai Indians', 
        team2_name: 'Chennai Super Kings', 
        team1_score: 185, 
        team2_score: 170, 
        winner_name: 'Mumbai Indians',
        venue: 'Wankhede Stadium',
        match_date: '2024-01-15',
        man_of_match_name: 'Rohit Sharma'
      }
    ]);
  }, []);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'teams', label: 'Teams', icon: Trophy, count: teams.length },
    { id: 'players', label: 'Players', icon: Users, count: players.length },
    { id: 'matches', label: 'Matches', icon: BarChart3, count: matches.length }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Database className="text-blue-400" size={40} />
          Enhanced Cricket Database
        </h1>
        <p className="text-blue-200 text-lg">
          Comprehensive cricket data with real player statistics and team information
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">{tab.count}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeams.map((team, index) => (
              <motion.div
                key={team.id}
                className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={team.logo_url || 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                    alt={team.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{team.name}</h3>
                    <p className="text-blue-300">{team.short_name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-green-400">{team.wins || 0}</div>
                    <div className="text-white/70 text-sm">Wins</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-red-400">{team.losses || 0}</div>
                    <div className="text-white/70 text-sm">Losses</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-yellow-400">{team.titles || 0}</div>
                    <div className="text-white/70 text-sm">Titles</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 text-center">
                    <div className="text-xl font-bold text-blue-400">
                      {team.matches_played ? Math.round((team.wins / team.matches_played) * 100) : 0}%
                    </div>
                    <div className="text-white/70 text-sm">Win Rate</div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-white/70">
                  <p><strong>Captain:</strong> {team.captain}</p>
                  <p><strong>Home Ground:</strong> {team.home_ground}</p>
                  <p><strong>Founded:</strong> {team.founded_year}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Players Tab */}
        {activeTab === 'players' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player, index) => (
              <motion.div
                key={player.id}
                className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={player.image_url || 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                    alt={player.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{player.name}</h3>
                    <p className="text-blue-300">{player.team_name}</p>
                    <p className="text-yellow-400 text-sm">{player.role}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Runs:</span>
                    <span className="text-yellow-400 font-bold">{player.runs_scored || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Average:</span>
                    <span className="text-green-400 font-bold">{player.batting_average?.toFixed(2) || '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Strike Rate:</span>
                    <span className="text-blue-400 font-bold">{player.strike_rate?.toFixed(2) || '0.00'}</span>
                  </div>
                </div>

                <div className="mt-4 text-sm text-white/70">
                  <p><strong>Age:</strong> {player.age}</p>
                  <p><strong>Nationality:</strong> {player.nationality}</p>
                  <p><strong>Price:</strong> ₹{player.price_crores} Cr</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <div className="space-y-4">
            {matches.map((match, index) => (
              <motion.div
                key={match.id}
                className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white">{match.team1_name}</h3>
                      <p className="text-2xl font-bold text-blue-400">{match.team1_score || 'TBD'}</p>
                    </div>
                    <div className="text-white text-xl">vs</div>
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white">{match.team2_name}</h3>
                      <p className="text-2xl font-bold text-red-400">{match.team2_score || 'TBD'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">Winner: {match.winner_name || 'TBD'}</p>
                    <p className="text-white/70 text-sm">{match.venue}</p>
                    <p className="text-white/70 text-sm">{match.match_date}</p>
                  </div>
                </div>

                {match.man_of_match_name && (
                  <div className="mt-4 p-3 bg-yellow-500/20 rounded-xl border border-yellow-400/30">
                    <p className="text-yellow-400 font-bold">Man of the Match: {match.man_of_match_name}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}