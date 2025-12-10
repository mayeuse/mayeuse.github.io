import { Canvas } from '@react-three/fiber';

const StudioWall = () => {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -8, -5]} rotation={[-Math.PI / 2.5, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 60]} />
        <meshStandardMaterial 
          color="#f5f5f5"
          roughness={0.15}
          metalness={0}
        />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 5, -20]} receiveShadow>
        <planeGeometry args={[80, 50]} />
        <meshStandardMaterial 
          color="#fafafa"
          roughness={0.4}
          metalness={0}
        />
      </mesh>

      {/* Curved infinity cove (seamless floor-to-wall transition) */}
      <mesh position={[0, -3, -12]} rotation={[0.3, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 20]} />
        <meshStandardMaterial 
          color="#f8f8f8"
          roughness={0.25}
          metalness={0}
        />
      </mesh>
    </group>
  );
};

const GalleryWallBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 15], fov: 50 }}
        style={{ background: '#ffffff' }}
        shadows
      >
        {/* Key light - main studio light from upper right */}
        <directionalLight 
          position={[10, 15, 10]} 
          intensity={2} 
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        
        {/* Fill light - softer from left */}
        <directionalLight 
          position={[-8, 8, 5]} 
          intensity={0.8} 
        />
        
        {/* Rim light - from behind */}
        <directionalLight 
          position={[0, 5, -10]} 
          intensity={0.5} 
        />
        
        {/* Ambient fill */}
        <ambientLight intensity={0.6} />
        
        <StudioWall />
      </Canvas>
    </div>
  );
};

export default GalleryWallBackground;
