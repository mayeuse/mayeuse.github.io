import { useRef, useState, useMemo, memo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';
import { Move3d } from 'lucide-react';

interface ModelProps {
  url: string;
  scale: number;
  isInteracting: boolean;
}

const Model = memo(({ url, scale, isInteracting }: ModelProps) => {
  const geometry = useLoader(STLLoader, url);
  const meshRef = useRef<THREE.Mesh>(null);

  // Memoize centered geometry to avoid recomputing
  const centeredGeometry = useMemo(() => {
    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
  }, [geometry]);

  useFrame((_, delta) => {
    if (meshRef.current && !isInteracting) {
      meshRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <group rotation={[0, 0, -Math.PI / 2]}>
      <mesh ref={meshRef} geometry={centeredGeometry} scale={scale}>
        <meshStandardMaterial color="#888888" metalness={0.3} roughness={0.6} vertexColors={false} />
      </mesh>
    </group>
  );
});

Model.displayName = 'Model';

interface STLModelProps {
  url: string;
  position?: [number, number, number];
  scale?: number;
  label?: string;
}

const STLModel = memo(({ url, scale = 0.02, label }: STLModelProps) => {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="w-36 h-36 cursor-grab active:cursor-grabbing relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Model url={url} scale={scale} isInteracting={isInteracting} />
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
