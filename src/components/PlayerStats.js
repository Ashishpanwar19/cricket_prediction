import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Trophy, Target, Award, Star, TrendingUp } from 'lucide-react';

// 3D Player Card Component with Image Texture
function Player3DCard({ player, position, isSelected, onClick }) {
  const meshRef = useRef();
  const cardRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
    
    if (cardRef.current && isSelected) {
      cardRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group 
      ref={meshRef} 
      position={position}
      onClick={onClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
    >
      {/* Main Card Base */}
      <Box 
        ref={cardRef}
        args={[2.5, 3.5, 0.15]} 
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          color={isSelected ? "#3b82f6" : "#1e3a8a"} 
          metalness={0.3}
          roughness={0.4}
        />
      </Box>
      
      {/* Player Image Container */}
      <Box args={[2, 2, 0.05]} position={[0, 0.5, 0.1]}>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      
      {/* Player Image as HTML overlay for better image rendering */}
      <Html
        position={[0, 0.5, 0.15]}
        transform
        occlude
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '3px solid #3b82f6',
          background: '#ffffff'
        }}
      >
        <img
          src={player.image}
          alt={player.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
          }}
        />
      </Html>
      
      {/* Stats Background */}
      <Box args={[2.3, 1.2, 0.05]} position={[0, -1, 0.1]}>
        <meshStandardMaterial color="#0f172a" opacity={0.9} transparent />
      </Box>
      
      {/* Player Name */}
      <Text
        position={[0, -0.5, 0.15]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        maxWidth={2}
      >
        {player.name}
      </Text>
      
      {/* Team Name */}
      <Text
        position={[0, -0.7, 0.15]}
        fontSize={0.1}
        color="#60a5fa"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
      >
        {player.team}
      </Text>
      
      {/* Primary Stat */}
      <Text
        position={[0, -0.9, 0.15]}
        fontSize={0.12}
        color="#fbbf24"
        anchorX="center"
        anchorY="middle"
      >
        {player.runs ? `${player.runs} Runs` : `${player.wickets} Wickets`}
      </Text>
      
      {/* Secondary Stat */}
      <Text
        position={[0, -1.1, 0.15]}
        fontSize={0.1}
        color="#34d399"
        anchorX="center"
        anchorY="middle"
      >
        {player.average ? `Avg: ${player.average}` : `Eco: ${player.economy}`}
      </Text>
      
      {/* Floating Stats Indicators */}
      {isSelected && (
        <>
          <Sphere args={[0.1]} position={[-0.8, 0.8, 0.3]}>
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.3} />
          </Sphere>
          <Sphere args={[0.1]} position={[0.8, 0.8, 0.3]}>
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.3} />
          </Sphere>
        </>
      )}
    </group>
  );
}

// Loading component for 3D scene
function LoadingFallback() {
  return (
    <Html center>
      <div className="text-white text-lg">Loading 3D Players...</div>
    </Html>
  );
}

export default function PlayerStats() {
  const [selectedCategory, setSelectedCategory] = useState('batsmen');
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const playerData = {
    batsmen: [
      {
        id: 1,
        name: "Virat Kohli",
        team: "Royal Challengers Bangalore",
        runs: 973,
        average: 81.08,
        strikeRate: 131.97,
        centuries: 5,
        fifties: 7,
        highestScore: 113,
        image: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        recentForm: [45, 67, 12, 89, 34],
        position: "Top Order",
        battingStyle: "Right-hand bat"
      },
      {
        id: 2,
        name: "Rohit Sharma",
        team: "Mumbai Indians",
        runs: 890,
        average: 74.17,
        strikeRate: 129.34,
        centuries: 4,
        fifties: 6,
        highestScore: 105,
        image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        recentForm: [67, 23, 78, 45, 91],
        position: "Opener",
        battingStyle: "Right-hand bat"
      },
      {
        id: 3,
        name: "KL Rahul",
        team: "Punjab Kings",
        runs: 856,
        average: 71.33,
        strikeRate: 135.67,
        centuries: 3,
        fifties: 8,
        highestScore: 132,
        image: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        recentForm: [89, 45, 67, 23, 78],
        position: "Opener",
        battingStyle: "Right-hand bat"
      }
    ],
    bowlers: [
      {
        id: 4,
        name: "Jasprit Bumrah",
        team: "Mumbai Indians",
        wickets: 27,
        average: 18.65,
        economy: 6.73,
        strikeRate: 16.6,
        bestFigures: "4/17",
        image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        recentForm: [2, 1, 3, 0, 2],
        bowlingStyle: "Right-arm fast"
      },
      {
        id: 5,
        name: "Rashid Khan",
        team: "Sunrisers Hyderabad",
        wickets: 25,
        average: 20.12,
        economy: 6.14,
        strikeRate: 18.2,
        bestFigures: "3/12",
        image: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        recentForm: [1, 3, 2, 1, 2],
        bowlingStyle: "Right-arm leg-spin"
      },
      {
        id: 6,
        name: "Yuzvendra Chahal",
        team: "Rajasthan Royals",
        wickets: 23,
        average: 22.45,
        economy: 7.89,
        strikeRate: 17.1,
        bestFigures: "4/25",
        image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        recentForm: [2, 0, 3, 1, 2],
        bowlingStyle: "Right-arm leg-spin"
      }
    ],
    allRounders: [
      {
        id: 7,
        name: "Hardik Pandya",
        team: "Mumbai Indians",
        runs: 487,
        wickets: 17,
        average: 40.58,
        strikeRate: 142.85,
        economy: 8.24,
        image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        recentForm: [34, 2, 45, 1, 67],
        battingStyle: "Right-hand bat",
        bowlingStyle: "Right-arm fast-medium"
      },
      {
        id: 8,
        name: "Ravindra Jadeja",
        team: "Chennai Super Kings",
        runs: 345,
        wickets: 20,
        average: 34.50,
        strikeRate: 128.45,
        economy: 7.45,
        image: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
        recentForm: [23, 3, 34, 2, 45],
        battingStyle: "Left-hand bat",
        bowlingStyle: "Slow left-arm orthodox"
      }
    ]
  };

  const categories = [
    { id: 'batsmen', label: 'Top Batsmen', icon: Target, color: 'from-yellow-500 to-orange-500' },
    { id: 'bowlers', label: 'Top Bowlers', icon: Trophy, color: 'from-red-500 to-pink-500' },
    { id: 'allRounders', label: 'All-Rounders', icon: Award, color: 'from-purple-500 to-indigo-500' }
  ];

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(selectedPlayer?.id === player.id ? null : player);
  };

  return (
    <div className="space-y-8">
      {/* Category Selection */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedPlayer(null);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
                  : 'bg-white/10 text-white hover:bg-white/20 hover:scale-102'
              }`}
            >
              <Icon size={20} />
              {category.label}
            </button>
          );
        })}
      </motion.div>

      {/* 3D Player Showcase */}
      <motion.div 
        className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="text-yellow-400" size={32} />
          <h2 className="text-3xl font-bold text-white">3D Player Showcase</h2>
          <div className="ml-auto text-sm text-white/70">
            Click on players to view details
          </div>
        </div>

        {/* 3D Canvas */}
        <div className="h-[500px] mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/50 to-purple-900/50 relative">
          <Canvas 
            camera={{ position: [0, 0, 10], fov: 50 }}
            shadows
          >
            <Suspense fallback={<LoadingFallback />}>
              {/* Lighting Setup */}
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={0.5} />
              <pointLight position={[0, 10, 5]} color="#fbbf24" intensity={0.3} />
              
              {/* 3D Player Cards */}
              {playerData[selectedCategory].slice(0, 3).map((player, index) => (
                <Player3DCard 
                  key={player.id} 
                  player={player} 
                  position={[(index - 1) * 4, 0, 0]}
                  isSelected={selectedPlayer?.id === player.id}
                  onClick={() => handlePlayerSelect(player)}
                />
              ))}
              
              <OrbitControls 
                enableZoom={true} 
                enablePan={false}
                maxDistance={15}
                minDistance={5}
                maxPolarAngle={Math.PI / 2}
              />
            </Suspense>
          </Canvas>
          
          {/* 3D Controls Info */}
          <div className="absolute bottom-4 left-4 text-white/70 text-sm">
            🖱️ Drag to rotate • 🔍 Scroll to zoom • 👆 Click players for details
          </div>
        </div>

        {/* Selected Player Details */}
        {selectedPlayer && (
          <motion.div
            className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedPlayer.image}
                alt={selectedPlayer.name}
                className="w-20 h-20 rounded-full object-cover border-3 border-yellow-400"
              />
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedPlayer.name}</h3>
                <p className="text-blue-300">{selectedPlayer.team}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="text-yellow-400" size={16} />
                  <span className="text-yellow-400 text-sm">Featured Player</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedCategory === 'batsmen' && (
                <>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{selectedPlayer.runs}</div>
                    <div className="text-white/70 text-sm">Runs</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{selectedPlayer.average}</div>
                    <div className="text-white/70 text-sm">Average</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{selectedPlayer.strikeRate}</div>
                    <div className="text-white/70 text-sm">Strike Rate</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{selectedPlayer.centuries}</div>
                    <div className="text-white/70 text-sm">Centuries</div>
                  </div>
                </>
              )}

              {selectedCategory === 'bowlers' && (
                <>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-red-400">{selectedPlayer.wickets}</div>
                    <div className="text-white/70 text-sm">Wickets</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{selectedPlayer.average}</div>
                    <div className="text-white/70 text-sm">Average</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{selectedPlayer.economy}</div>
                    <div className="text-white/70 text-sm">Economy</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{selectedPlayer.bestFigures}</div>
                    <div className="text-white/70 text-sm">Best Figures</div>
                  </div>
                </>
              )}

              {selectedCategory === 'allRounders' && (
                <>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{selectedPlayer.runs}</div>
                    <div className="text-white/70 text-sm">Runs</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-red-400">{selectedPlayer.wickets}</div>
                    <div className="text-white/70 text-sm">Wickets</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">{selectedPlayer.average}</div>
                    <div className="text-white/70 text-sm">Batting Avg</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{selectedPlayer.strikeRate}</div>
                    <div className="text-white/70 text-sm">Strike Rate</div>
                  </div>
                </>
              )}
            </div>

            {/* Recent Form */}
            <div className="mt-6">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <TrendingUp size={16} />
                Recent Form (Last 5 matches)
              </h4>
              <div className="flex gap-2">
                {selectedPlayer.recentForm.map((score, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold ${
                      score > 50 || score > 2 ? 'bg-green-500' : score > 25 || score > 1 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  >
                    {score}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Player Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {playerData[selectedCategory].map((player, index) => (
            <motion.div
              key={player.id}
              className={`bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                selectedPlayer?.id === player.id 
                  ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' 
                  : 'border-white/30 hover:border-white/50'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              onClick={() => handlePlayerSelect(player)}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                    onError={(e) => {
                      e.target.src = 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop';
                    }}
                  />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-900">#{index + 1}</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{player.name}</h3>
                  <p className="text-blue-300 text-sm">{player.team}</p>
                </div>
              </div>

              <div className="space-y-3">
                {selectedCategory === 'batsmen' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-white/70">Runs:</span>
                      <span className="text-yellow-400 font-bold">{player.runs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Average:</span>
                      <span className="text-green-400 font-bold">{player.average}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Strike Rate:</span>
                      <span className="text-blue-400 font-bold">{player.strikeRate}</span>
                    </div>
                  </>
                )}

                {selectedCategory === 'bowlers' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-white/70">Wickets:</span>
                      <span className="text-red-400 font-bold">{player.wickets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Average:</span>
                      <span className="text-green-400 font-bold">{player.average}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Economy:</span>
                      <span className="text-blue-400 font-bold">{player.economy}</span>
                    </div>
                  </>
                )}

                {selectedCategory === 'allRounders' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-white/70">Runs:</span>
                      <span className="text-yellow-400 font-bold">{player.runs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Wickets:</span>
                      <span className="text-red-400 font-bold">{player.wickets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Strike Rate:</span>
                      <span className="text-blue-400 font-bold">{player.strikeRate}</span>
                    </div>
                  </>
                )}
              </div>

              <motion.div 
                className="mt-4 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-center text-white/80 text-sm font-medium">
                  {selectedCategory === 'batsmen' && '🏏 Batting Powerhouse'}
                  {selectedCategory === 'bowlers' && '⚡ Bowling Maestro'}
                  {selectedCategory === 'allRounders' && '🌟 Complete Player'}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}