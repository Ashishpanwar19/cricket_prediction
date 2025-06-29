const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cron = require('node-cron');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Database initialization
const db = new sqlite3.Database('./cricket_database.db');

// Initialize database tables
db.serialize(() => {
  // Teams table
  db.run(`CREATE TABLE IF NOT EXISTS teams (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    short_name TEXT NOT NULL,
    logo_url TEXT,
    home_ground TEXT,
    captain TEXT,
    coach TEXT,
    founded_year INTEGER,
    titles INTEGER DEFAULT 0,
    matches_played INTEGER DEFAULT 0,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Players table
  db.run(`CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    team_id INTEGER,
    role TEXT NOT NULL,
    batting_style TEXT,
    bowling_style TEXT,
    image_url TEXT,
    nationality TEXT,
    age INTEGER,
    matches_played INTEGER DEFAULT 0,
    runs_scored INTEGER DEFAULT 0,
    wickets_taken INTEGER DEFAULT 0,
    batting_average REAL DEFAULT 0,
    bowling_average REAL DEFAULT 0,
    strike_rate REAL DEFAULT 0,
    economy_rate REAL DEFAULT 0,
    centuries INTEGER DEFAULT 0,
    fifties INTEGER DEFAULT 0,
    highest_score INTEGER DEFAULT 0,
    best_bowling TEXT,
    price_crores REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams (id)
  )`);

  // Matches table
  db.run(`CREATE TABLE IF NOT EXISTS matches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team1_id INTEGER,
    team2_id INTEGER,
    venue TEXT,
    match_date DATE,
    toss_winner_id INTEGER,
    toss_decision TEXT,
    team1_score INTEGER,
    team2_score INTEGER,
    team1_wickets INTEGER,
    team2_wickets INTEGER,
    winner_id INTEGER,
    man_of_match_id INTEGER,
    pitch_type TEXT,
    weather TEXT,
    overs INTEGER DEFAULT 20,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team1_id) REFERENCES teams (id),
    FOREIGN KEY (team2_id) REFERENCES teams (id),
    FOREIGN KEY (winner_id) REFERENCES teams (id),
    FOREIGN KEY (man_of_match_id) REFERENCES players (id)
  )`);

  // Player performances table
  db.run(`CREATE TABLE IF NOT EXISTS player_performances (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    match_id INTEGER,
    player_id INTEGER,
    runs_scored INTEGER DEFAULT 0,
    balls_faced INTEGER DEFAULT 0,
    fours INTEGER DEFAULT 0,
    sixes INTEGER DEFAULT 0,
    wickets_taken INTEGER DEFAULT 0,
    runs_conceded INTEGER DEFAULT 0,
    overs_bowled REAL DEFAULT 0,
    catches INTEGER DEFAULT 0,
    stumpings INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES matches (id),
    FOREIGN KEY (player_id) REFERENCES players (id)
  )`);

  // Predictions table
  db.run(`CREATE TABLE IF NOT EXISTS predictions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    team1_id INTEGER,
    team2_id INTEGER,
    venue TEXT,
    predicted_score INTEGER,
    confidence_level REAL,
    win_probability_team1 REAL,
    win_probability_team2 REAL,
    actual_score INTEGER,
    actual_winner_id INTEGER,
    prediction_accuracy REAL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team1_id) REFERENCES teams (id),
    FOREIGN KEY (team2_id) REFERENCES teams (id),
    FOREIGN KEY (actual_winner_id) REFERENCES teams (id)
  )`);
});

// Insert sample data
const insertSampleData = () => {
  // Insert teams
  const teams = [
    ['Mumbai Indians', 'MI', 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'Wankhede Stadium', 'Rohit Sharma', 'Mark Boucher', 2008, 5, 220, 140, 80],
    ['Chennai Super Kings', 'CSK', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'MA Chidambaram Stadium', 'MS Dhoni', 'Stephen Fleming', 2008, 4, 210, 130, 80],
    ['Royal Challengers Bangalore', 'RCB', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'M. Chinnaswamy Stadium', 'Virat Kohli', 'Mike Hesson', 2008, 0, 230, 110, 120],
    ['Kolkata Knight Riders', 'KKR', 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'Eden Gardens', 'Shreyas Iyer', 'Brendon McCullum', 2008, 2, 200, 100, 100],
    ['Delhi Capitals', 'DC', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'Arun Jaitley Stadium', 'Rishabh Pant', 'Ricky Ponting', 2008, 0, 180, 85, 95],
    ['Punjab Kings', 'PBKS', 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'PCA Stadium', 'Shikhar Dhawan', 'Anil Kumble', 2008, 0, 190, 90, 100],
    ['Rajasthan Royals', 'RR', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'Sawai Mansingh Stadium', 'Sanju Samson', 'Kumar Sangakkara', 2008, 1, 170, 80, 90],
    ['Sunrisers Hyderabad', 'SRH', 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', 'Rajiv Gandhi Stadium', 'Aiden Markram', 'Brian Lara', 2013, 1, 160, 75, 85]
  ];

  teams.forEach(team => {
    db.run(`INSERT OR IGNORE INTO teams (name, short_name, logo_url, home_ground, captain, coach, founded_year, titles, matches_played, wins, losses) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, team);
  });

  // Insert players with real cricket player data
  const players = [
    // Mumbai Indians
    ['Rohit Sharma', 1, 'Batsman', 'Right-hand bat', 'Right-arm off-break', 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'India', 36, 243, 6211, 0, 30.35, 0, 130.61, 0, 1, 40, 109, null, 16.0],
    ['Jasprit Bumrah', 1, 'Bowler', 'Right-hand bat', 'Right-arm fast', 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'India', 30, 120, 400, 145, 15.5, 24.54, 120.5, 7.39, 0, 0, 28, '4/14', 12.0],
    ['Hardik Pandya', 1, 'All Rounder', 'Right-hand bat', 'Right-arm fast-medium', 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'India', 30, 104, 2915, 42, 28.89, 28.67, 143.89, 8.24, 0, 16, 91, '3/17', 15.0],
    ['Ishan Kishan', 1, 'Wicket Keeper', 'Left-hand bat', null, 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'India', 25, 105, 2644, 0, 29.93, 0, 135.04, 0, 0, 15, 99, null, 15.25],
    ['Suryakumar Yadav', 1, 'Batsman', 'Right-hand bat', 'Right-arm off-break', 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'India', 33, 115, 3389, 0, 31.12, 0, 145.73, 0, 1, 22, 103, null, 8.0],
    
    // Chennai Super Kings
    ['MS Dhoni', 2, 'Wicket Keeper', 'Right-hand bat', 'Right-arm medium', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'India', 42, 264, 5082, 0, 38.09, 0, 135.92, 0, 0, 24, 84, null, 12.0],
    ['Ravindra Jadeja', 2, 'All Rounder', 'Left-hand bat', 'Slow left-arm orthodox', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'India', 35, 240, 2756, 157, 29.95, 29.85, 127.3, 7.68, 0, 13, 62, '5/16', 16.0],
    ['Ruturaj Gaikwad', 2, 'Batsman', 'Right-hand bat', 'Right-arm off-break', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'India', 27, 68, 2380, 0, 32.43, 0, 129.18, 0, 1, 15, 101, null, 6.0],
    ['Deepak Chahar', 2, 'Bowler', 'Right-hand bat', 'Right-arm fast-medium', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'India', 31, 76, 154, 59, 12.83, 27.81, 116.54, 7.28, 0, 0, 39, '6/7', 14.0],
    ['Moeen Ali', 2, 'All Rounder', 'Left-hand bat', 'Right-arm off-break', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'England', 36, 92, 1162, 25, 23.24, 32.12, 157.59, 7.65, 0, 5, 93, '3/7', 7.0],
    
    // Royal Challengers Bangalore
    ['Virat Kohli', 3, 'Batsman', 'Right-hand bat', 'Right-arm medium', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'India', 35, 237, 7263, 4, 37.25, 52.5, 131.97, 7.39, 5, 50, 113, '4/13', 17.0],
    ['Glenn Maxwell', 3, 'All Rounder', 'Right-hand bat', 'Right-arm off-break', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'Australia', 35, 120, 2771, 32, 26.44, 28.84, 154.67, 7.45, 0, 16, 95, '4/3', 11.0],
    ['Mohammed Siraj', 3, 'Bowler', 'Right-hand bat', 'Right-arm fast', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'India', 30, 93, 89, 93, 8.9, 26.77, 120.43, 8.32, 0, 0, 22, '4/21', 7.0],
    ['Faf du Plessis', 3, 'Batsman', 'Right-hand bat', 'Right-arm medium', 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'South Africa', 39, 100, 2935, 0, 34.94, 0, 131.09, 0, 2, 22, 120, null, 7.0],
    
    // Kolkata Knight Riders
    ['Shreyas Iyer', 4, 'Batsman', 'Right-hand bat', 'Right-arm leg-break', 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'India', 29, 115, 3127, 0, 31.27, 0, 123.89, 0, 2, 23, 96, null, 12.25],
    ['Andre Russell', 4, 'All Rounder', 'Right-hand bat', 'Right-arm fast', 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'West Indies', 36, 140, 2556, 73, 29.49, 24.89, 179.33, 8.76, 0, 11, 88, '4/20', 12.0],
    ['Sunil Narine', 4, 'All Rounder', 'Left-hand bat', 'Right-arm off-break', 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop', 'West Indies', 35, 162, 1025, 180, 15.54, 24.63, 168.3, 6.67, 0, 4, 75, '4/21', 6.0]
  ];

  players.forEach(player => {
    db.run(`INSERT OR IGNORE INTO players (name, team_id, role, batting_style, bowling_style, image_url, nationality, age, matches_played, runs_scored, wickets_taken, batting_average, bowling_average, strike_rate, economy_rate, centuries, fifties, highest_score, best_bowling, price_crores) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, player);
  });
};

// Insert sample data on startup
setTimeout(insertSampleData, 1000);

// API Routes

// Get all teams
app.get('/api/teams', (req, res) => {
  db.all('SELECT * FROM teams ORDER BY name', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get team by ID
app.get('/api/teams/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM teams WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Get all players
app.get('/api/players', (req, res) => {
  const { team_id, role } = req.query;
  let query = `
    SELECT p.*, t.name as team_name, t.short_name as team_short_name 
    FROM players p 
    LEFT JOIN teams t ON p.team_id = t.id
  `;
  const params = [];

  if (team_id || role) {
    query += ' WHERE ';
    const conditions = [];
    if (team_id) {
      conditions.push('p.team_id = ?');
      params.push(team_id);
    }
    if (role) {
      conditions.push('p.role = ?');
      params.push(role);
    }
    query += conditions.join(' AND ');
  }

  query += ' ORDER BY p.runs_scored DESC, p.wickets_taken DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Get player by ID
app.get('/api/players/:id', (req, res) => {
  const { id } = req.params;
  db.get(`
    SELECT p.*, t.name as team_name, t.short_name as team_short_name 
    FROM players p 
    LEFT JOIN teams t ON p.team_id = t.id 
    WHERE p.id = ?
  `, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Get matches
app.get('/api/matches', (req, res) => {
  db.all(`
    SELECT m.*, 
           t1.name as team1_name, t1.short_name as team1_short,
           t2.name as team2_name, t2.short_name as team2_short,
           tw.name as toss_winner_name,
           w.name as winner_name,
           p.name as man_of_match_name
    FROM matches m
    LEFT JOIN teams t1 ON m.team1_id = t1.id
    LEFT JOIN teams t2 ON m.team2_id = t2.id
    LEFT JOIN teams tw ON m.toss_winner_id = tw.id
    LEFT JOIN teams w ON m.winner_id = w.id
    LEFT JOIN players p ON m.man_of_match_id = p.id
    ORDER BY m.match_date DESC
    LIMIT 50
  `, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Predict score
app.post('/api/predict_score', (req, res) => {
  const { team1_id, team2_id, venue, pitch_type, weather, overs } = req.body;

  // Enhanced prediction algorithm
  db.get('SELECT * FROM teams WHERE id = ?', [team1_id], (err, team1) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    db.get('SELECT * FROM teams WHERE id = ?', [team2_id], (err, team2) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      // Calculate base score
      let baseScore = 160;
      
      // Team strength factor
      const team1Strength = (team1.wins / Math.max(team1.matches_played, 1)) * 100;
      const team2Strength = (team2.wins / Math.max(team2.matches_played, 1)) * 100;
      
      // Venue factor
      const venueBonus = team1.home_ground === venue ? 15 : 0;
      
      // Pitch factor
      const pitchFactors = {
        'flat': 25,
        'balanced': 10,
        'spin-friendly': -5,
        'pace-friendly': 5
      };
      
      // Weather factor
      const weatherFactors = {
        'sunny': 10,
        'overcast': 5,
        'humid': -5,
        'rainy': -15
      };
      
      // Overs factor
      const oversMultiplier = overs / 20;
      
      const predictedScore = Math.round(
        (baseScore + 
         (team1Strength - team2Strength) * 0.5 + 
         venueBonus + 
         (pitchFactors[pitch_type] || 0) + 
         (weatherFactors[weather] || 0)) * oversMultiplier
      );

      const confidence = Math.min(95, Math.max(70, 85 + Math.random() * 10));
      const margin = Math.round(predictedScore * 0.08);

      // Save prediction to database
      db.run(`
        INSERT INTO predictions (team1_id, team2_id, venue, predicted_score, confidence_level, win_probability_team1, win_probability_team2)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [team1_id, team2_id, venue, predictedScore, confidence, team1Strength, team2Strength]);

      res.json({
        predicted_score: Math.max(100, Math.min(300, predictedScore)),
        confidence_interval: [
          Math.max(80, predictedScore - margin),
          Math.min(250, predictedScore + margin)
        ],
        confidence: Math.round(confidence),
        factors: {
          team_strength: Math.round(team1Strength - team2Strength),
          venue_advantage: venueBonus,
          pitch_factor: pitchFactors[pitch_type] || 0,
          weather_impact: weatherFactors[weather] || 0
        }
      });
    });
  });
});

// Predict win probability
app.post('/api/predict_win', (req, res) => {
  const { team1_id, team2_id, venue, toss_winner } = req.body;

  db.get('SELECT * FROM teams WHERE id = ?', [team1_id], (err, team1) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    db.get('SELECT * FROM teams WHERE id = ?', [team2_id], (err, team2) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      // Calculate win probabilities
      const team1WinRate = (team1.wins / Math.max(team1.matches_played, 1)) * 100;
      const team2WinRate = (team2.wins / Math.max(team2.matches_played, 1)) * 100;
      
      // Toss advantage
      const tossAdvantage = toss_winner == team1_id ? 5 : -5;
      
      // Home advantage
      const homeAdvantage = team1.home_ground === venue ? 8 : 0;
      
      const adjustedTeam1Rate = team1WinRate + tossAdvantage + homeAdvantage;
      const total = adjustedTeam1Rate + team2WinRate;
      
      const team1Prob = Math.round((adjustedTeam1Rate / total) * 100);
      const team2Prob = 100 - team1Prob;

      res.json({
        team1_win_probability: Math.max(20, Math.min(80, team1Prob)),
        team2_win_probability: Math.max(20, Math.min(80, team2Prob)),
        factors: {
          head_to_head: 'Based on historical performance',
          recent_form: `${team1.name}: ${team1.wins}W-${team1.losses}L, ${team2.name}: ${team2.wins}W-${team2.losses}L`,
          venue_advantage: team1.home_ground === venue ? team1.name : 'Neutral',
          toss_impact: toss_winner == team1_id ? team1.name : team2.name
        }
      });
    });
  });
});

// Get team statistics
app.get('/api/team-stats/:id', (req, res) => {
  const { id } = req.params;
  
  db.get(`
    SELECT t.*,
           COUNT(DISTINCT p.id) as total_players,
           AVG(p.batting_average) as avg_batting_avg,
           AVG(p.bowling_average) as avg_bowling_avg,
           SUM(p.runs_scored) as total_runs,
           SUM(p.wickets_taken) as total_wickets
    FROM teams t
    LEFT JOIN players p ON t.id = p.team_id
    WHERE t.id = ?
    GROUP BY t.id
  `, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

// Get live scores (mock data for demo)
app.get('/api/live-scores', (req, res) => {
  const liveMatches = [
    {
      match_id: 1,
      team1: 'Mumbai Indians',
      team2: 'Chennai Super Kings',
      status: 'Live',
      current_score: '145/4 (16.2 overs)',
      target: '186',
      required: '41 runs from 22 balls',
      current_rr: '8.75',
      required_rr: '11.18',
      last_updated: new Date().toISOString()
    }
  ];
  
  res.json(liveMatches);
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    database: 'connected',
    version: '2.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🏏 Cricket Prediction Server running on port ${PORT}`);
  console.log(`📊 Database: SQLite`);
  console.log(`🚀 API Endpoints available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('📊 Database connection closed.');
    }
    process.exit(0);
  });
});