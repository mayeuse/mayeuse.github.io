import { useRef, useState, memo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Move3d } from 'lucide-react';

interface ModelProps {
  url: string;
  isInteracting: boolean;
  isProbeHead: boolean;
}

const Model = memo(({ url, isInteracting, isProbeHead }: ModelProps) => {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [offset, setOffset] = useState<THREE.Vector3>(new THREE.Vector3());

  useEffect(() => {
    // Clone the scene and compute its bounding box to find the center offset
    const clonedScene = scene.clone();
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Store the offset to translate the model so its center is at origin
    setOffset(center.negate());
    
    // Adjust camera distance based on model size
    const fitDistance = isProbeHead ? maxDim * 2.5 : maxDim * 1.5;
    camera.position.set(0, 0, fitDistance);
    camera.updateProjectionMatrix();
  }, [scene, camera, isProbeHead]);

  useFrame((_, delta) => {
    if (groupRef.current && !isInteracting) {
      groupRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <group rotation={[0, 0, -Math.PI / 2]}>
      <group ref={groupRef}>
        <group position={[offset.x, offset.y, offset.z]}>
          <primitive object={scene.clone()} />
        </group>
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

const STLModel = memo(({ url, label, className }: STLModelProps) => {
  const [isInteracting, setIsInteracting] = useState(false);
  const isProbeHead = url.includes('Probe_Head_Attachment');

  // Convert STL URL to GLB URL if needed
  const glbUrl = url.replace('.stl', '.glb');

  return (
    <div className="flex flex-col items-center h-full">
      <div className={`cursor-grab active:cursor-grabbing relative ${className || 'w-36 h-36'}`}>
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }} gl={{ antialias: true }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Model url={glbUrl} isInteracting={isInteracting} isProbeHead={isProbeHead} />
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
