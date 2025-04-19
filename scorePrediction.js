import React, { useState } from 'react';
import axios from 'axios';

export default function ScorePrediction() {
  const [formData, setFormData] = useState({
    team1: 'Mumbai Indians',
    team2: 'Chennai Super Kings',
    venue: 'Wankhede Stadium',
    toss_winner: 'Mumbai Indians',
    toss_decision: 'bat',
    pitch_type: 'flat',
    weather: 'sunny'
  });

  const [prediction, setPrediction] = useState(null);
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
    'MA Chidambaram Stadium', 'Narendra Modi Stadium'
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
      // Replace with your actual API endpoint
      const res = await axios.post('http://localhost:5000/predict_score', formData);
      setPrediction(res.data.prediction);
    } catch (err) {
      console.error("Prediction error:", err);
      alert("Error getting prediction. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-cricket-blue">Score Prediction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Team 1 Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team 1</label>
            <select
              name="team1"
              value={formData.team1}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>

          {/* Team 2 Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team 2</label>
            <select
              name="team2"
              value={formData.team2}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              {teams.filter(t => t !== formData.team1).map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>

          {/* Venue Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
            <select
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              {venues.map(venue => (
                <option key={venue} value={venue}>{venue}</option>
              ))}
            </select>
          </div>

          {/* Toss Winner */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Toss Winner</label>
            <select
              name="toss_winner"
              value={formData.toss_winner}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value={formData.team1}>{formData.team1}</option>
              <option value={formData.team2}>{formData.team2}</option>
            </select>
          </div>

          {/* Toss Decision */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Toss Decision</label>
            <select
              name="toss_decision"
              value={formData.toss_decision}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="bat">Bat First</option>
              <option value="field">Field First</option>
            </select>
          </div>

          {/* Pitch Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pitch Type</label>
            <select
              name="pitch_type"
              value={formData.pitch_type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="flat">Flat Track</option>
              <option value="spin-friendly">Spin Friendly</option>
              <option value="pace-friendly">Pace Friendly</option>
              <option value="balanced">Balanced</option>
            </select>
          </div>

          {/* Weather */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weather</label>
            <select
              name="weather"
              value={formData.weather}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="sunny">Sunny</option>
              <option value="overcast">Overcast</option>
              <option value="humid">Humid</option>
              <option value="rainy">Rainy</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-gray-400' : 'bg-cricket-blue hover:bg-blue-900'}`}
        >
          {isLoading ? 'Predicting...' : 'Predict Score'}
        </button>
      </form>

      {prediction && (
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800">Prediction Result</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {Math.round(prediction)} runs
          </p>
          <p className="text-gray-600 mt-2">
            {formData.team1} vs {formData.team2} at {formData.venue}
          </p>
        </div>
      )}
    </div>
  );
}