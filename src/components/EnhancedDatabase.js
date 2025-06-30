import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Users, Trophy, BarChart3, Search, RefreshCw } from 'lucide-react';
import axios from 'axios';

export default function EnhancedDatabase() {
  const [activeTab, setActiveTab] = useState('teams');
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [error, setError] = useState('');

  // API base URL - use relative path since we have proxy configured
  const API_BASE = '/api';

  // Fetch data from API
  const fetchTeams = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_BASE}/teams`);
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
      setError('Failed to fetch teams data');
      // Fallback to mock data
      setTeams([
        { id: 1, name: 'Mumbai Indians', short_name: 'MI', wins: 140, losses: 80, titles: 5, captain: 'Rohit Sharma', home_ground: 'Wankhede Stadium', founded_year: 2008, matches_played: 220 },
        { id: 2, name: 'Chennai Super Kings', short_name: 'CSK', wins: 130, losses: 80, titles: 4, captain: 'MS Dhoni', home_ground: 'MA Chidambaram Stadium', founded_year: 2008, matches_played: 210 },
        { id: 3, name: 'Royal Challengers Bangalore', short_name: 'RCB', wins: 110, losses: 120, titles: 0, captain: 'Virat Kohli', home_ground: 'M. Chinnaswamy Stadium', founded_year: 2008, matches_played: 230 },
        { id: 4, name: 'Kolkata Knight Riders', short_name: 'KKR', wins: 100, losses: 100, titles: 2, captain: 'Shreyas Iyer', home_ground: 'Eden Gardens', founded_year: 2008, matches_played: 200 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_BASE}/players`);
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
      setError('Failed to fetch players data');
      // Fallback to mock data
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
        },
        { 
          id: 3, 
          name: 'Jasprit Bumrah', 
          team_name: 'Mumbai Indians', 
          role: 'Bowler', 
          wickets_taken: 145, 
          bowling_average: 24.54,
          economy_rate: 7.39,
          age: 30,
          nationality: 'India',
          price_crores: 12.0,
          image_url: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`${API_BASE}/matches`);
      setMatches(response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setError('Failed to fetch matches data');
      // Fallback to mock data
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
        },
        { 
          id: 2, 
          team1_name: 'Royal Challengers Bangalore', 
          team2_name: 'Kolkata Knight Riders', 
          team1_score: 195, 
          team2_score: 180, 
          winner_name: 'Royal Challengers Bangalore',
          venue: 'M. Chinnaswamy Stadium',
          match_date: '2024-01-16',
          man_of_match_name: 'Virat Kohli'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'teams') fetchTeams();
    else if (activeTab === 'players') fetchPlayers();
    else if (activeTab === 'matches') fetchMatches();
  }, [activeTab]);

  // Filter functions
  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.team_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || player.role === filterRole;
    const matchesTeam = !selectedTeam || player.team_name === selectedTeam;
    return matchesSearch && matchesRole && matchesTeam;
  });

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
        {error && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
            <p className="text-red-400">⚠️ {error} - Using fallback data</p>
          </div>
        )}
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

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

          {activeTab === 'players' && (
            <>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-blue-400"
              >
                <option value="" className="text-gray-900">All Roles</option>
                <option value="Batsman" className="text-gray-900">Batsman</option>
                <option value="Bowler" className="text-gray-900">Bowler</option>
                <option value="All Rounder" className="text-gray-900">All Rounder</option>
                <option value="Wicket Keeper" className="text-gray-900">Wicket Keeper</option>
              </select>

              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-2 focus:ring-blue-400"
              >
                <option value="" className="text-gray-900">All Teams</option>
                {teams.map(team => (
                  <option key={team.id} value={team.name} className="text-gray-900">{team.name}</option>
                ))}
              </select>
            </>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => {
                if (activeTab === 'teams') fetchTeams();
                else if (activeTab === 'players') fetchPlayers();
                else if (activeTab === 'matches') fetchMatches();
              }}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-white/80">Loading data...</p>
          </div>
        ) : (
          <>
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
                {filteredPlayers.map((player, index) => (
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
                      {player.role === 'Batsman' || player.role === 'All Rounder' || player.role === 'Wicket Keeper' ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between">
                            <span className="text-white/70">Wickets:</span>
                            <span className="text-red-400 font-bold">{player.wickets_taken || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Average:</span>
                            <span className="text-green-400 font-bold">{player.bowling_average?.toFixed(2) || '0.00'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Economy:</span>
                            <span className="text-blue-400 font-bold">{player.economy_rate?.toFixed(2) || '0.00'}</span>
                          </div>
                        </>
                      )}
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
          </>
        )}
      </motion.div>
    </div>
  );
}