from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
import os
from datetime import datetime
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

# Enhanced team data with images and stats
TEAM_DATA = {
    'Mumbai Indians': {
        'logo': 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        'colors': ['#004BA0', '#D1AB3E'],
        'home_ground': 'Wankhede Stadium',
        'captain': 'Rohit Sharma',
        'coach': 'Mark Boucher',
        'titles': 5,
        'founded': 2008
    },
    'Chennai Super Kings': {
        'logo': 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        'colors': ['#FFFF3C', '#F99D1C'],
        'home_ground': 'MA Chidambaram Stadium',
        'captain': 'MS Dhoni',
        'coach': 'Stephen Fleming',
        'titles': 4,
        'founded': 2008
    },
    'Royal Challengers Bangalore': {
        'logo': 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        'colors': ['#EC1C24', '#FFD700'],
        'home_ground': 'M. Chinnaswamy Stadium',
        'captain': 'Virat Kohli',
        'coach': 'Mike Hesson',
        'titles': 0,
        'founded': 2008
    },
    'Kolkata Knight Riders': {
        'logo': 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
        'colors': ['#3A225D', '#B3A123'],
        'home_ground': 'Eden Gardens',
        'captain': 'Shreyas Iyer',
        'coach': 'Brendon McCullum',
        'titles': 2,
        'founded': 2008
    }
}

# Enhanced player database with images and detailed stats
PLAYER_DATABASE = {
    'batsmen': [
        {
            'id': 1,
            'name': 'Virat Kohli',
            'team': 'Royal Challengers Bangalore',
            'image': 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
            'runs': 973,
            'matches': 12,
            'average': 81.08,
            'strike_rate': 131.97,
            'centuries': 5,
            'fifties': 7,
            'highest_score': 113,
            'position': 'Top Order',
            'batting_style': 'Right-hand bat',
            'recent_form': [45, 67, 12, 89, 34],
            'stats_2023': {
                'runs': 639,
                'average': 53.25,
                'strike_rate': 144.2,
                'boundaries': 58,
                'sixes': 12
            }
        },
        {
            'id': 2,
            'name': 'Rohit Sharma',
            'team': 'Mumbai Indians',
            'image': 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
            'runs': 890,
            'matches': 14,
            'average': 74.17,
            'strike_rate': 129.34,
            'centuries': 4,
            'fifties': 6,
            'highest_score': 105,
            'position': 'Opener',
            'batting_style': 'Right-hand bat',
            'recent_form': [67, 23, 78, 45, 91],
            'stats_2023': {
                'runs': 567,
                'average': 45.6,
                'strike_rate': 138.9,
                'boundaries': 52,
                'sixes': 18
            }
        }
    ],
    'bowlers': [
        {
            'id': 3,
            'name': 'Jasprit Bumrah',
            'team': 'Mumbai Indians',
            'image': 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
            'wickets': 27,
            'matches': 14,
            'average': 18.65,
            'economy': 6.73,
            'strike_rate': 16.6,
            'best_figures': '4/17',
            'bowling_style': 'Right-arm fast',
            'recent_form': [2, 1, 3, 0, 2],
            'stats_2023': {
                'wickets': 20,
                'economy': 7.13,
                'dot_balls': 156,
                'maidens': 0
            }
        }
    ]
}

# Mock ML models (replace with actual trained models)
class MockScoreModel:
    def predict(self, features):
        # Enhanced prediction logic based on multiple factors
        base_score = 160
        
        # Team strength adjustments
        team_factors = {
            'Mumbai Indians': 15,
            'Chennai Super Kings': 10,
            'Royal Challengers Bangalore': 12,
            'Kolkata Knight Riders': 8
        }
        
        # Venue adjustments
        venue_factors = {
            'Wankhede Stadium': 20,
            'M. Chinnaswamy Stadium': 25,
            'Eden Gardens': 5,
            'MA Chidambaram Stadium': 0
        }
        
        # Weather and pitch adjustments
        weather_factors = {
            'sunny': 10,
            'overcast': 5,
            'humid': -5,
            'rainy': -15
        }
        
        pitch_factors = {
            'flat': 20,
            'balanced': 10,
            'spin-friendly': -5,
            'pace-friendly': 5
        }
        
        # Calculate prediction
        team1 = features.get('team1', 'Mumbai Indians')
        venue = features.get('venue', 'Wankhede Stadium')
        weather = features.get('weather', 'sunny')
        pitch = features.get('pitch_type', 'flat')
        
        predicted_score = (base_score + 
                         team_factors.get(team1, 0) +
                         venue_factors.get(venue, 0) +
                         weather_factors.get(weather, 0) +
                         pitch_factors.get(pitch, 0) +
                         np.random.randint(-15, 15))
        
        return max(120, min(250, predicted_score))

class MockWinModel:
    def predict_proba(self, features):
        # Enhanced win probability calculation
        team1 = features.get('team1', 'Mumbai Indians')
        team2 = features.get('team2', 'Chennai Super Kings')
        
        # Team strength ratings (out of 100)
        team_ratings = {
            'Mumbai Indians': 85,
            'Chennai Super Kings': 82,
            'Royal Challengers Bangalore': 78,
            'Kolkata Knight Riders': 75
        }
        
        rating1 = team_ratings.get(team1, 70)
        rating2 = team_ratings.get(team2, 70)
        
        # Toss advantage
        toss_winner = features.get('toss_winner', team1)
        toss_advantage = 5 if toss_winner == team1 else -5
        
        # Home advantage
        venue = features.get('venue', 'Wankhede Stadium')
        home_teams = {
            'Wankhede Stadium': 'Mumbai Indians',
            'MA Chidambaram Stadium': 'Chennai Super Kings',
            'M. Chinnaswamy Stadium': 'Royal Challengers Bangalore',
            'Eden Gardens': 'Kolkata Knight Riders'
        }
        
        home_advantage = 8 if home_teams.get(venue) == team1 else 0
        
        # Calculate win probability
        adjusted_rating1 = rating1 + toss_advantage + home_advantage
        total_rating = adjusted_rating1 + rating2
        
        win_prob1 = adjusted_rating1 / total_rating
        win_prob2 = 1 - win_prob1
        
        return [[win_prob2, win_prob1]]

# Initialize models
score_model = MockScoreModel()
win_model = MockWinModel()

@app.route('/api/teams', methods=['GET'])
def get_teams():
    """Get all team information"""
    return jsonify(TEAM_DATA)

@app.route('/api/players/<category>', methods=['GET'])
def get_players(category):
    """Get players by category (batsmen, bowlers, all-rounders)"""
    if category in PLAYER_DATABASE:
        return jsonify(PLAYER_DATABASE[category])
    return jsonify([])

@app.route('/api/predict_score', methods=['POST'])
def predict_score():
    """Enhanced score prediction with confidence intervals"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['team1', 'team2', 'venue', 'pitch_type', 'weather']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Get prediction
        predicted_score = score_model.predict(data)
        
        # Calculate confidence interval
        confidence = np.random.uniform(0.75, 0.95)
        margin = int(predicted_score * 0.1)
        
        response = {
            'predicted_score': int(predicted_score),
            'confidence_interval': [
                max(100, int(predicted_score - margin)),
                min(300, int(predicted_score + margin))
            ],
            'confidence': round(confidence * 100, 1),
            'factors': {
                'team_strength': TEAM_DATA.get(data['team1'], {}).get('titles', 0) * 5,
                'venue_advantage': 10 if data.get('venue') == TEAM_DATA.get(data['team1'], {}).get('home_ground') else 0,
                'weather_impact': {'sunny': 5, 'overcast': 0, 'humid': -3, 'rainy': -8}.get(data['weather'], 0),
                'pitch_factor': {'flat': 8, 'balanced': 3, 'spin-friendly': -2, 'pace-friendly': 2}.get(data['pitch_type'], 0)
            }
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/predict_win', methods=['POST'])
def predict_win():
    """Enhanced win probability prediction"""
    try:
        data = request.get_json()
        
        # Get win probabilities
        probabilities = win_model.predict_proba(data)[0]
        
        response = {
            'team1_win_probability': round(probabilities[1] * 100, 1),
            'team2_win_probability': round(probabilities[0] * 100, 1),
            'factors': {
                'head_to_head': 'Even',
                'recent_form': 'Team1 Advantage',
                'key_players': 'Available',
                'conditions': 'Favorable'
            },
            'recommendation': f"{data['team1']} has a slight advantage" if probabilities[1] > 0.5 else f"{data['team2']} has a slight advantage"
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/match_analysis', methods=['POST'])
def match_analysis():
    """Comprehensive match analysis"""
    try:
        data = request.get_json()
        
        # Generate mock analysis data
        analysis = {
            'pitch_report': {
                'type': data.get('pitch_type', 'balanced'),
                'expected_score': '160-180',
                'bowling_advantage': 'Spinners' if data.get('pitch_type') == 'spin-friendly' else 'Pacers',
                'batting_difficulty': 'Medium'
            },
            'weather_impact': {
                'condition': data.get('weather', 'sunny'),
                'temperature': '28°C',
                'humidity': '65%',
                'wind_speed': '12 km/h',
                'impact_on_play': 'Minimal'
            },
            'key_battles': [
                {
                    'batsman': 'Virat Kohli',
                    'bowler': 'Jasprit Bumrah',
                    'advantage': 'Even',
                    'stats': 'Kohli: 45 runs in 6 balls, Bumrah: 1 wicket'
                }
            ],
            'team_news': {
                data['team1']: {
                    'probable_xi': ['Player1', 'Player2', 'Player3'],
                    'injury_updates': 'All players fit',
                    'recent_changes': 'No changes expected'
                },
                data['team2']: {
                    'probable_xi': ['Player4', 'Player5', 'Player6'],
                    'injury_updates': 'All players fit',
                    'recent_changes': 'No changes expected'
                }
            }
        }
        
        return jsonify(analysis)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/live_scores', methods=['GET'])
def get_live_scores():
    """Get live cricket scores (mock data)"""
    live_matches = [
        {
            'match_id': 1,
            'team1': 'Mumbai Indians',
            'team2': 'Chennai Super Kings',
            'status': 'Live',
            'current_score': '145/4 (16.2 overs)',
            'target': '186',
            'required': '41 runs from 22 balls',
            'current_rr': '8.75',
            'required_rr': '11.18'
        }
    ]
    
    return jsonify(live_matches)

@app.route('/api/player_stats/<int:player_id>', methods=['GET'])
def get_player_stats(player_id):
    """Get detailed player statistics"""
    # Find player in database
    for category in PLAYER_DATABASE.values():
        for player in category:
            if player['id'] == player_id:
                # Add more detailed stats
                detailed_stats = player.copy()
                detailed_stats['career_stats'] = {
                    'total_matches': 150,
                    'total_runs': 5000,
                    'career_average': 42.5,
                    'career_sr': 135.6
                }
                return jsonify(detailed_stats)
    
    return jsonify({'error': 'Player not found'}), 404

@app.route('/api/team_comparison', methods=['POST'])
def team_comparison():
    """Compare two teams comprehensively"""
    try:
        data = request.get_json()
        team1 = data.get('team1')
        team2 = data.get('team2')
        
        if not team1 or not team2:
            return jsonify({'error': 'Both teams required'}), 400
        
        comparison = {
            'head_to_head': {
                'total_matches': 30,
                'team1_wins': 16,
                'team2_wins': 14,
                'last_5_meetings': [team1, team2, team1, team1, team2]
            },
            'current_season': {
                team1: {
                    'matches': 14,
                    'wins': 9,
                    'losses': 5,
                    'points': 18,
                    'nrr': '+0.45'
                },
                team2: {
                    'matches': 14,
                    'wins': 8,
                    'losses': 6,
                    'points': 16,
                    'nrr': '+0.23'
                }
            },
            'strengths': {
                team1: ['Strong batting lineup', 'Experienced captain', 'Home advantage'],
                team2: ['Balanced squad', 'Good death bowling', 'Consistent performance']
            },
            'weaknesses': {
                team1: ['Middle order concerns', 'Bowling depth'],
                team2: ['Opening partnership', 'Spin bowling']
            }
        }
        
        return jsonify(comparison)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '2.0.0'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)