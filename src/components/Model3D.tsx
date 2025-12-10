import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';

// Beautiful procedural flower made with Three.js geometry
const FlowerModel = () => {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center of flower */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#f5e6a3" roughness={0.6} />
      </mesh>
      
      {/* Petals - arranged in a circle */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 0.5;
        const z = Math.sin(angle) * 0.5;
        return (
          <mesh 
            key={i} 
            position={[x, 0, z]}
            rotation={[0, -angle + Math.PI / 2, Math.PI / 6]}
          >
            <capsuleGeometry args={[0.15, 0.6, 8, 16]} />
            <meshStandardMaterial 
              color="#e8b4b8" 
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>
        );
      })}
      
      {/* Inner petals */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2 + 0.3;
        const x = Math.cos(angle) * 0.35;
        const z = Math.sin(angle) * 0.35;
        return (
          <mesh 
            key={`inner-${i}`} 
            position={[x, 0.1, z]}
            rotation={[0, -angle + Math.PI / 2, Math.PI / 5]}
          >
            <capsuleGeometry args={[0.12, 0.4, 8, 16]} />
            <meshStandardMaterial 
              color="#f0c8cc" 
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
        );
      })}

      {/* Leaves */}
      <mesh position={[-0.6, -0.3, 0.3]} rotation={[0.2, 0.5, -0.3]}>
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshStandardMaterial color="#7a9f7a" roughness={0.5} />
      </mesh>
      <mesh position={[0.5, -0.35, -0.2]} rotation={[-0.1, -0.4, 0.2]}>
        <capsuleGeometry args={[0.07, 0.45, 8, 16]} />
        <meshStandardMaterial color="#8aaf8a" roughness={0.5} />
      </mesh>
    </group>
  );
};

const Model3D = () => {
  return (
    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
      <Canvas
        camera={{ position: [0, 1, 4], fov: 40 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <directionalLight position={[3, 4, 2]} intensity={2} />
        <directionalLight position={[-2, 2, -1]} intensity={0.8} color="#ffe4e6" />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <FlowerModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Model3D;
