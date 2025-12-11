import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface STLModelProps {
  url: string;
  position?: [number, number, number];
  scale?: number;
}

const Model = ({ url, scale = 0.02 }: { url: string; scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useLoader(STLLoader, url);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // Center the geometry
  geometry.center();

  return (
    <mesh ref={meshRef} geometry={geometry} scale={scale}>
      <meshStandardMaterial color="#8B9B8B" metalness={0.3} roughness={0.6} />
    </mesh>
  );
};

const STLModel = ({ url, position = [0, 0, 0], scale = 0.02 }: STLModelProps) => {
  return (
    <div className="w-20 h-20">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <group position={position}>
          <Model url={url} scale={scale} />
        </group>
      </Canvas>
    </div>
  );
};

export default STLModel;
