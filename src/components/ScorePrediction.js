import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, MapPin } from 'lucide-react';

const teamLogos = {
  'Mumbai Indians': 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  'Chennai Super Kings': 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  'Royal Challengers Bangalore': 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  'Kolkata Knight Riders': 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  'Delhi Capitals': 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  'Punjab Kings': 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  'Rajasthan Royals': 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
  'Sunrisers Hyderabad': 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
};

export default function ScorePrediction() {
  const [formData, setFormData] = useState({
    team1: 'Mumbai Indians',
    team2: 'Chennai Super Kings',
    venue: 'Wankhede Stadium',
    toss_winner: 'Mumbai Indians',
    toss_decision: 'bat',
    pitch_type: 'flat',
    weather: 'sunny',
    overs: 20,
    powerplay_overs: 6
  });

  const [prediction, setPrediction] = useState(null);
  const [winProbability, setWinProbability] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const teams = [
    'Mumbai Indians', 'Chennai Super Kings', 
    'Royal Challengers Bangalore', 'Kolkata Knight Riders',
    'Delhi Capitals', 'Punjab Kings',
    'Rajasthan Royals', 'Sunrisers Hyderabad'
  ];

  const venues = [
    'Wankhede Stadium', 'M. Chinnaswamy Stadium',
    'Eden Gardens', 'Arun Jaitley Stadium',
    'MA Chidambaram Stadium', 'Narendra Modi Stadium',
    'PCA Stadium', 'Rajiv Gandhi Stadium'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API calls with mock data for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockScore = Math.floor(Math.random() * (200 - 120) + 120);
      const mockWinProb = Math.floor(Math.random() * (80 - 45) + 45);
      
      setPrediction({
        score: mockScore,
        range: [mockScore - 15, mockScore + 15],
        confidence: 85
      });
      
      setWinProbability({
        team1: mockWinProb,
        team2: 100 - mockWinProb
      });
    } catch (err) {
      console.error("Prediction error:", err);
      alert("Error getting prediction. Using demo data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Prediction Form */}
      <motion.div 
        className="lg:col-span-2 bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="text-blue-400" size={32} />
          <h2 className="text-3xl font-bold text-white">Score Prediction</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Team Selection with Logos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              className="space-y-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-medium text-blue-200">Team 1</label>
              <div className="relative">
                <select
                  name="team1"
                  value={formData.team1}
                  onChange={handleChange}
                  className="w-full p-4 pl-16 bg-white/20 border border-white/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                >
                  {teams.map(team => (
                    <option key={team} value={team} className="text-gray-900">{team}</option>
                  ))}
                </select>
                <img 
                  src={teamLogos[formData.team1]} 
                  alt={formData.team1}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div 
              className="space-y-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <label className="block text-sm font-medium text-blue-200">Team 2</label>
              <div className="relative">
                <select
                  name="team2"
                  value={formData.team2}
                  onChange={handleChange}
                  className="w-full p-4 pl-16 bg-white/20 border border-white/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                >
                  {teams.filter(t => t !== formData.team1).map(team => (
                    <option key={team} value={team} className="text-gray-900">{team}</option>
                  ))}
                </select>
                <img 
                  src={teamLogos[formData.team2]} 
                  alt={formData.team2}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Match Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-blue-200 flex items-center gap-2">
                <MapPin size={16} />
                Venue
              </label>
              <select
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400"
                required
              >
                {venues.map(venue => (
                  <option key={venue} value={venue} className="text-gray-900">{venue}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-blue-200">Toss Winner</label>
              <select
                name="toss_winner"
                value={formData.toss_winner}
                onChange={handleChange}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value={formData.team1} className="text-gray-900">{formData.team1}</option>
                <option value={formData.team2} className="text-gray-900">{formData.team2}</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-blue-200">Toss Decision</label>
              <select
                name="toss_decision"
                value={formData.toss_decision}
                onChange={handleChange}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="bat" className="text-gray-900">Bat First</option>
                <option value="field" className="text-gray-900">Field First</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-blue-200">Pitch Type</label>
              <select
                name="pitch_type"
                value={formData.pitch_type}
                onChange={handleChange}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="flat" className="text-gray-900">Flat Track</option>
                <option value="spin-friendly" className="text-gray-900">Spin Friendly</option>
                <option value="pace-friendly" className="text-gray-900">Pace Friendly</option>
                <option value="balanced" className="text-gray-900">Balanced</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-blue-200">Weather</label>
              <select
                name="weather"
                value={formData.weather}
                onChange={handleChange}
                className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="sunny" className="text-gray-900">Sunny</option>
                <option value="overcast" className="text-gray-900">Overcast</option>
                <option value="humid" className="text-gray-900">Humid</option>
                <option value="rainy" className="text-gray-900">Rainy</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-blue-200 flex items-center gap-2">
                Overs
              </label>
              <input
                type="number"
                name="overs"
                value={formData.overs}
                onChange={handleChange}
                min="5"
                max="50"
                className="w-full p-3 bg-white/20 border border-white/30 rounded-xl text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all duration-300 ${
              isLoading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
            }`}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                Analyzing Match Data...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <Target size={24} />
                Predict Score
              </div>
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Results Panel */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {prediction && (
          <motion.div 
            className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg p-6 rounded-3xl border border-green-400/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="text-green-400" size={24} />
              Score Prediction
            </h3>
            <div className="text-center">
              <motion.div 
                className="text-5xl font-bold text-green-400 mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              >
                {prediction.score}
              </motion.div>
              <p className="text-white/80">Predicted Score</p>
              <div className="mt-4 p-3 bg-white/10 rounded-xl">
                <p className="text-sm text-white/70">Range: {prediction.range[0]} - {prediction.range[1]}</p>
                <p className="text-sm text-white/70">Confidence: {prediction.confidence}%</p>
              </div>
            </div>
          </motion.div>
        )}

        {winProbability && (
          <motion.div 
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg p-6 rounded-3xl border border-purple-400/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Win Probability</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{formData.team1}</span>
                  <span className="text-purple-400 font-bold">{winProbability.team1}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${winProbability.team1}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  ></motion.div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{formData.team2}</span>
                  <span className="text-pink-400 font-bold">{winProbability.team2}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <motion.div 
                    className="bg-gradient-to-r from-pink-400 to-red-400 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${winProbability.team2}%` }}
                    transition={{ duration: 1, delay: 0.7 }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Match Info Card */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-bold text-white mb-4">Match Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-white/70">Venue:</span>
              <span className="text-white">{formData.venue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Pitch:</span>
              <span className="text-white capitalize">{formData.pitch_type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Weather:</span>
              <span className="text-white capitalize">{formData.weather}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/70">Overs:</span>
              <span className="text-white">{formData.overs}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}