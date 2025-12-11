import { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';
import { RotateCcw } from 'lucide-react';

interface ModelProps {
  url: string;
  scale: number;
  extraRotation?: [number, number, number];
  isInteracting: boolean;
}

const Model = ({ url, scale, extraRotation = [0, 0, 0], isInteracting }: ModelProps) => {
  const geometry = useLoader(STLLoader, url);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current && !isInteracting) {
      meshRef.current.rotation.x += delta * 0.5;
    }
  });

  geometry.center();

  return (
    <group rotation={[0, 0, -Math.PI / 2]}>
      <group rotation={extraRotation}>
        <mesh ref={meshRef} geometry={geometry} scale={scale}>
          <meshStandardMaterial color="#888888" metalness={0.3} roughness={0.6} vertexColors={false} />
        </mesh>
      </group>
    </group>
  );
};

interface STLModelProps {
  url: string;
  position?: [number, number, number];
  scale?: number;
  extraRotation?: [number, number, number];
  label?: string;
}

const STLModel = ({ url, position = [0, 0, 0], scale = 0.02, extraRotation, label }: STLModelProps) => {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="w-36 h-36 cursor-grab active:cursor-grabbing relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Model url={url} scale={scale} extraRotation={extraRotation} isInteracting={isInteracting} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            onStart={() => setIsInteracting(true)}
            onEnd={() => setIsInteracting(false)}
          />
        </Canvas>
        <div className="absolute bottom-1 right-1 text-foreground/40">
          <RotateCcw size={14} />
        </div>
      </div>
      {label && (
        <span className="font-body text-xs text-foreground/70 text-center mt-1">{label}</span>
      )}
    </div>
  );
};

export default STLModel;
