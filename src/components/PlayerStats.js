import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Award } from 'lucide-react';

// 3D Player Card Component
function Player3D({ player, position }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Player Card Base */}
      <Box args={[2, 2.8, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1e3a8a" />
      </Box>
      
      {/* Player Image Placeholder */}
      <Sphere args={[0.6]} position={[0, 0.8, 0.1]}>
        <meshStandardMaterial color="#fbbf24" />
      </Sphere>
      
      {/* Stats Display */}
      <Text
        position={[0, -0.2, 0.1]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {player.name}
      </Text>
      
      <Text
        position={[0, -0.5, 0.1]}
        fontSize={0.12}
        color="#60a5fa"
        anchorX="center"
        anchorY="middle"
      >
        {player.runs} Runs
      </Text>
      
      <Text
        position={[0, -0.7, 0.1]}
        fontSize={0.12}
        color="#34d399"
        anchorX="center"
        anchorY="middle"
      >
        Avg: {player.average}
      </Text>
    </group>
  );
}

export default function PlayerStats() {
  const [selectedCategory, setSelectedCategory] = useState('batsmen');

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
        image: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
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
        image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
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
        image: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
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
        bestFigures: "4/17",
        image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
      },
      {
        id: 5,
        name: "Rashid Khan",
        team: "Sunrisers Hyderabad",
        wickets: 25,
        average: 20.12,
        economy: 6.14,
        bestFigures: "3/12",
        image: "https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
      }
    ],
    allRounders: [
      {
        id: 6,
        name: "Hardik Pandya",
        team: "Mumbai Indians",
        runs: 487,
        wickets: 17,
        average: 40.58,
        strikeRate: 142.85,
        image: "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
      }
    ]
  };

  const categories = [
    { id: 'batsmen', label: 'Top Batsmen', icon: Target },
    { id: 'bowlers', label: 'Top Bowlers', icon: Zap },
    { id: 'allRounders', label: 'All-Rounders', icon: Award }
  ];

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
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
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
          <h2 className="text-3xl font-bold text-white">Player Statistics</h2>
        </div>

        {/* 3D Canvas */}
        <div className="h-96 mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/50 to-purple-900/50">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <pointLight position={[-10, -10, -10]} color="#blue" />
            
            {playerData[selectedCategory].slice(0, 3).map((player, index) => (
              <Player3D 
                key={player.id} 
                player={player} 
                position={[(index - 1) * 3, 0, 0]} 
              />
            ))}
            
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

        {/* Player Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playerData[selectedCategory].map((player, index) => (
            <motion.div
              key={player.id}
              className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/30 hover:border-white/50 transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
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
                    <div className="flex justify-between">
                      <span className="text-white/70">100s/50s:</span>
                      <span className="text-purple-400 font-bold">{player.centuries}/{player.fifties}</span>
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
                    <div className="flex justify-between">
                      <span className="text-white/70">Best:</span>
                      <span className="text-purple-400 font-bold">{player.bestFigures}</span>
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
                      <span className="text-white/70">Batting Avg:</span>
                      <span className="text-green-400 font-bold">{player.average}</span>
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