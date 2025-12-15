import { useRef, useState, memo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { Move3d } from 'lucide-react';

interface ModelProps {
  url: string;
  scale: number;
  isInteracting: boolean;
}

const Model = memo(({ url, scale, isInteracting }: ModelProps) => {
  const gltf = useLoader(GLTFLoader, url);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && !isInteracting) {
      groupRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <group rotation={[0, 0, -Math.PI / 2]}>
      <group ref={groupRef} scale={scale}>
        <primitive object={gltf.scene.clone()} />
      </group>
    </group>
  );
});

Model.displayName = 'Model';

interface STLModelProps {
  url: string;
  position?: [number, number, number];
  scale?: number;
  label?: string;
  className?: string;
}

const STLModel = memo(({ url, scale = 0.02, label, className }: STLModelProps) => {
  const [isInteracting, setIsInteracting] = useState(false);

  // Convert STL URL to GLB URL if needed
  const glbUrl = url.replace('.stl', '.glb');

  return (
    <div className="flex flex-col items-center h-full">
      <div className={`cursor-grab active:cursor-grabbing relative ${className || 'w-36 h-36'}`}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Model url={glbUrl} scale={scale} isInteracting={isInteracting} />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            onStart={() => setIsInteracting(true)}
            onEnd={() => setIsInteracting(false)}
          />
        </Canvas>
        <div className="absolute bottom-1 right-1 text-foreground/40">
          <Move3d size={14} />
        </div>
      </div>
      {label && (
        <span className="font-body text-xs text-foreground/70 text-center mt-1">{label}</span>
      )}
    </div>
  );
});

STLModel.displayName = 'STLModel';

export default STLModel;
