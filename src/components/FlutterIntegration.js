import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Download, Code, Database, Wifi, Bell, Star } from 'lucide-react';

export default function FlutterIntegration() {
  const [selectedFeature, setSelectedFeature] = useState('overview');

  const features = [
    {
      id: 'overview',
      title: 'Mobile App Overview',
      icon: Smartphone,
      description: 'Cross-platform cricket prediction app for iOS and Android'
    },
    {
      id: 'api',
      title: 'API Integration',
      icon: Database,
      description: 'Real-time data synchronization with backend services'
    },
    {
      id: 'offline',
      title: 'Offline Support',
      icon: Wifi,
      description: 'Cached predictions and offline data access'
    },
    {
      id: 'notifications',
      title: 'Push Notifications',
      icon: Bell,
      description: 'Live match updates and prediction alerts'
    }
  ];

  const flutterCode = {
    overview: `
// main.dart - Flutter Cricket Prediction App
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(CricketPredictionApp());
}

class CricketPredictionApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Cricket Predictor',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Team> teams = [];
  String? selectedTeam1;
  String? selectedTeam2;
  
  @override
  void initState() {
    super.initState();
    loadTeams();
  }
  
  Future<void> loadTeams() async {
    try {
      final response = await http.get(
        Uri.parse('http://localhost:5000/api/teams'),
      );
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        setState(() {
          teams = data.map((team) => Team.fromJson(team)).toList();
        });
      }
    } catch (e) {
      print('Error loading teams: \$e');
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('🏏 Cricket Predictor'),
        backgroundColor: Colors.blue[800],
      ),
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.blue[800]!, Colors.purple[800]!],
          ),
        ),
        child: SafeArea(
          child: Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(
              children: [
                // Team Selection Cards
                Card(
                  elevation: 8,
                  child: Padding(
                    padding: EdgeInsets.all(16.0),
                    child: Column(
                      children: [
                        Text(
                          'Select Teams',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 16),
                        Row(
                          children: [
                            Expanded(
                              child: TeamDropdown(
                                teams: teams,
                                selectedTeam: selectedTeam1,
                                onChanged: (value) {
                                  setState(() {
                                    selectedTeam1 = value;
                                  });
                                },
                                label: 'Team 1',
                              ),
                            ),
                            SizedBox(width: 16),
                            Text('VS', style: TextStyle(fontSize: 20)),
                            SizedBox(width: 16),
                            Expanded(
                              child: TeamDropdown(
                                teams: teams,
                                selectedTeam: selectedTeam2,
                                onChanged: (value) {
                                  setState(() {
                                    selectedTeam2 = value;
                                  });
                                },
                                label: 'Team 2',
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                
                SizedBox(height: 20),
                
                // Predict Button
                ElevatedButton(
                  onPressed: selectedTeam1 != null && selectedTeam2 != null
                      ? () => predictScore()
                      : null,
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                    child: Text(
                      'Predict Score',
                      style: TextStyle(fontSize: 18),
                    ),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.orange,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
  
  Future<void> predictScore() async {
    // Navigate to prediction screen
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => PredictionScreen(
          team1: selectedTeam1!,
          team2: selectedTeam2!,
        ),
      ),
    );
  }
}

class Team {
  final int id;
  final String name;
  final String shortName;
  final String logoUrl;
  
  Team({
    required this.id,
    required this.name,
    required this.shortName,
    required this.logoUrl,
  });
  
  factory Team.fromJson(Map<String, dynamic> json) {
    return Team(
      id: json['id'],
      name: json['name'],
      shortName: json['short_name'],
      logoUrl: json['logo_url'] ?? '',
    );
  }
}
    `,
    api: `
// services/api_service.dart
import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static const String baseUrl = 'http://localhost:5000/api';
  
  // Get all teams
  static Future<List<Team>> getTeams() async {
    try {
      final response = await http.get(
        Uri.parse('\$baseUrl/teams'),
        headers: {'Content-Type': 'application/json'},
      );
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((team) => Team.fromJson(team)).toList();
      } else {
        throw Exception('Failed to load teams');
      }
    } catch (e) {
      throw Exception('Network error: \$e');
    }
  }
  
  // Get players by team
  static Future<List<Player>> getPlayersByTeam(int teamId) async {
    try {
      final response = await http.get(
        Uri.parse('\$baseUrl/players?team_id=\$teamId'),
        headers: {'Content-Type': 'application/json'},
      );
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((player) => Player.fromJson(player)).toList();
      } else {
        throw Exception('Failed to load players');
      }
    } catch (e) {
      throw Exception('Network error: \$e');
    }
  }
  
  // Predict score
  static Future<PredictionResult> predictScore({
    required int team1Id,
    required int team2Id,
    required String venue,
    required String pitchType,
    required String weather,
    int overs = 20,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('\$baseUrl/predict_score'),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({
          'team1_id': team1Id,
          'team2_id': team2Id,
          'venue': venue,
          'pitch_type': pitchType,
          'weather': weather,
          'overs': overs,
        }),
      );
      
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        return PredictionResult.fromJson(data);
      } else {
        throw Exception('Failed to predict score');
      }
    } catch (e) {
      throw Exception('Prediction error: \$e');
    }
  }
  
  // Get live scores
  static Future<List<LiveMatch>> getLiveScores() async {
    try {
      final response = await http.get(
        Uri.parse('\$baseUrl/live-scores'),
        headers: {'Content-Type': 'application/json'},
      );
      
      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        return data.map((match) => LiveMatch.fromJson(match)).toList();
      } else {
        throw Exception('Failed to load live scores');
      }
    } catch (e) {
      throw Exception('Network error: \$e');
    }
  }
}

class PredictionResult {
  final int predictedScore;
  final List<int> confidenceInterval;
  final double confidence;
  final Map<String, dynamic> factors;
  
  PredictionResult({
    required this.predictedScore,
    required this.confidenceInterval,
    required this.confidence,
    required this.factors,
  });
  
  factory PredictionResult.fromJson(Map<String, dynamic> json) {
    return PredictionResult(
      predictedScore: json['predicted_score'],
      confidenceInterval: List<int>.from(json['confidence_interval']),
      confidence: json['confidence'].toDouble(),
      factors: json['factors'],
    );
  }
}
    `,
    offline: `
// services/offline_service.dart
import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';
import 'dart:convert';

class OfflineService {
  static Database? _database;
  
  static Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }
  
  static Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'cricket_cache.db');
    
    return await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) async {
        // Create tables for offline storage
        await db.execute('''
          CREATE TABLE teams(
            id INTEGER PRIMARY KEY,
            name TEXT,
            short_name TEXT,
            logo_url TEXT,
            data TEXT,
            last_updated INTEGER
          )
        ''');
        
        await db.execute('''
          CREATE TABLE players(
            id INTEGER PRIMARY KEY,
            team_id INTEGER,
            name TEXT,
            role TEXT,
            data TEXT,
            last_updated INTEGER
          )
        ''');
        
        await db.execute('''
          CREATE TABLE predictions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            team1_id INTEGER,
            team2_id INTEGER,
            predicted_score INTEGER,
            confidence REAL,
            created_at INTEGER
          )
        ''');
      },
    );
  }
  
  // Cache teams data
  static Future<void> cacheTeams(List<Team> teams) async {
    final db = await database;
    
    for (Team team in teams) {
      await db.insert(
        'teams',
        {
          'id': team.id,
          'name': team.name,
          'short_name': team.shortName,
          'logo_url': team.logoUrl,
          'data': json.encode(team.toJson()),
          'last_updated': DateTime.now().millisecondsSinceEpoch,
        },
        conflictAlgorithm: ConflictAlgorithm.replace,
      );
    }
  }
  
  // Get cached teams
  static Future<List<Team>> getCachedTeams() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query('teams');
    
    return List.generate(maps.length, (i) {
      final data = json.decode(maps[i]['data']);
      return Team.fromJson(data);
    });
  }
  
  // Cache prediction
  static Future<void> cachePrediction({
    required int team1Id,
    required int team2Id,
    required int predictedScore,
    required double confidence,
  }) async {
    final db = await database;
    
    await db.insert('predictions', {
      'team1_id': team1Id,
      'team2_id': team2Id,
      'predicted_score': predictedScore,
      'confidence': confidence,
      'created_at': DateTime.now().millisecondsSinceEpoch,
    });
  }
  
  // Get recent predictions
  static Future<List<Map<String, dynamic>>> getRecentPredictions() async {
    final db = await database;
    return await db.query(
      'predictions',
      orderBy: 'created_at DESC',
      limit: 10,
    );
  }
  
  // Check if data is fresh (less than 1 hour old)
  static bool isDataFresh(int lastUpdated) {
    final now = DateTime.now().millisecondsSinceEpoch;
    final oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    return (now - lastUpdated) < oneHour;
  }
}
    `,
    notifications: `
// services/notification_service.dart
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

class NotificationService {
  static final FlutterLocalNotificationsPlugin _notifications =
      FlutterLocalNotificationsPlugin();
  static final FirebaseMessaging _messaging = FirebaseMessaging.instance;
  
  static Future<void> initialize() async {
    // Request permission for notifications
    await _messaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );
    
    // Initialize local notifications
    const AndroidInitializationSettings androidSettings =
        AndroidInitializationSettings('@mipmap/ic_launcher');
    
    const DarwinInitializationSettings iosSettings =
        DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestSoundPermission: true,
    );
    
    const InitializationSettings settings = InitializationSettings(
      android: androidSettings,
      iOS: iosSettings,
    );
    
    await _notifications.initialize(settings);
    
    // Handle background messages
    FirebaseMessaging.onBackgroundMessage(_handleBackgroundMessage);
    
    // Handle foreground messages
    FirebaseMessaging.onMessage.listen(_handleForegroundMessage);
  }
  
  static Future<void> _handleBackgroundMessage(RemoteMessage message) async {
    print('Background message: \${message.messageId}');
  }
  
  static void _handleForegroundMessage(RemoteMessage message) {
    print('Foreground message: \${message.messageId}');
    
    if (message.notification != null) {
      showLocalNotification(
        title: message.notification!.title ?? 'Cricket Update',
        body: message.notification!.body ?? 'New cricket update available',
      );
    }
  }
  
  // Show local notification
  static Future<void> showLocalNotification({
    required String title,
    required String body,
    String? payload,
  }) async {
    const AndroidNotificationDetails androidDetails =
        AndroidNotificationDetails(
      'cricket_channel',
      'Cricket Predictions',
      channelDescription: 'Notifications for cricket predictions and updates',
      importance: Importance.high,
      priority: Priority.high,
      icon: '@mipmap/ic_launcher',
    );
    
    const DarwinNotificationDetails iosDetails = DarwinNotificationDetails();
    
    const NotificationDetails details = NotificationDetails(
      android: androidDetails,
      iOS: iosDetails,
    );
    
    await _notifications.show(
      DateTime.now().millisecond,
      title,
      body,
      details,
      payload: payload,
    );
  }
  
  // Schedule match reminder
  static Future<void> scheduleMatchReminder({
    required String team1,
    required String team2,
    required DateTime matchTime,
  }) async {
    final reminderTime = matchTime.subtract(Duration(minutes: 30));
    
    await _notifications.zonedSchedule(
      matchTime.millisecondsSinceEpoch,
      'Match Starting Soon!',
      '\$team1 vs \$team2 starts in 30 minutes',
      tz.TZDateTime.from(reminderTime, tz.local),
      const NotificationDetails(
        android: AndroidNotificationDetails(
          'match_reminders',
          'Match Reminders',
          channelDescription: 'Reminders for upcoming matches',
          importance: Importance.high,
          priority: Priority.high,
        ),
      ),
      uiLocalNotificationDateInterpretation:
          UILocalNotificationDateInterpretation.absoluteTime,
    );
  }
  
  // Send prediction accuracy notification
  static Future<void> notifyPredictionAccuracy({
    required String team1,
    required String team2,
    required int predictedScore,
    required int actualScore,
    required double accuracy,
  }) async {
    final title = accuracy > 90 
        ? '🎯 Excellent Prediction!' 
        : accuracy > 70 
            ? '👍 Good Prediction!' 
            : '📊 Prediction Result';
    
    final body = 'Predicted: \$predictedScore, Actual: \$actualScore\\n'
                 'Accuracy: \${accuracy.toStringAsFixed(1)}%';
    
    await showLocalNotification(
      title: title,
      body: body,
    );
  }
}
    `
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Smartphone className="text-blue-400" size={40} />
          Flutter Mobile Integration
        </h1>
        <p className="text-blue-200 text-lg">
          Cross-platform mobile app with real-time cricket predictions
        </p>
      </motion.div>

      {/* Feature Navigation */}
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className={`p-4 rounded-xl transition-all duration-300 text-left ${
                  selectedFeature === feature.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon size={24} className="mb-2" />
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm opacity-80">{feature.description}</p>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* App Features Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mobile App Preview */}
        <motion.div
          className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/30"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Smartphone className="text-blue-400" size={28} />
            Mobile App Features
          </h2>

          <div className="space-y-6">
            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">📱 Cross-Platform Support</h3>
              <ul className="text-white/80 space-y-2">
                <li>• iOS and Android compatibility</li>
                <li>• Native performance with Flutter</li>
                <li>• Responsive design for all screen sizes</li>
                <li>• Material Design and Cupertino widgets</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">🔄 Real-time Sync</h3>
              <ul className="text-white/80 space-y-2">
                <li>• Live score updates</li>
                <li>• Instant prediction results</li>
                <li>• Team and player data synchronization</li>
                <li>• WebSocket connections for live data</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">📊 Advanced Analytics</h3>
              <ul className="text-white/80 space-y-2">
                <li>• Interactive charts and graphs</li>
                <li>• Player performance tracking</li>
                <li>• Team comparison tools</li>
                <li>• Historical data analysis</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">🔔 Smart Notifications</h3>
              <ul className="text-white/80 space-y-2">
                <li>• Match start reminders</li>
                <li>• Score update alerts</li>
                <li>• Prediction accuracy notifications</li>
                <li>• Customizable notification preferences</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Code Preview */}
        <motion.div
          className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg rounded-3xl p-6 border border-white/30"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code className="text-green-400" size={24} />
              Flutter Code
            </h2>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-black/50 rounded-xl p-4 h-96 overflow-y-auto">
            <pre className="text-green-400 text-sm">
              <code>{flutterCode[selectedFeature]}</code>
            </pre>
          </div>
        </motion.div>
      </div>

      {/* Download Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-3xl p-8 border border-blue-400/30 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">Download Cricket Predictor App</h2>
        <p className="text-blue-200 mb-8">
          Get real-time cricket predictions on your mobile device
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <motion.button
            className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={24} />
            Download for Android
          </motion.button>

          <motion.button
            className="flex items-center gap-3 px-8 py-4 bg-gray-800 text-white rounded-2xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={24} />
            Download for iOS
          </motion.button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Star className="text-yellow-400 mx-auto mb-2" size={32} />
            <h3 className="text-white font-bold">4.8★ Rating</h3>
            <p className="text-white/70">10,000+ Downloads</p>
          </div>
          <div className="text-center">
            <Smartphone className="text-blue-400 mx-auto mb-2" size={32} />
            <h3 className="text-white font-bold">Cross-Platform</h3>
            <p className="text-white/70">iOS & Android</p>
          </div>
          <div className="text-center">
            <Database className="text-green-400 mx-auto mb-2" size={32} />
            <h3 className="text-white font-bold">Real-time Data</h3>
            <p className="text-white/70">Live Updates</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}