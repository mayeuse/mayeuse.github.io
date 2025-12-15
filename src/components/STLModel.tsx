import { useRef, useState, memo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF } from '@react-three/drei';
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

  useEffect(() => {
    if (groupRef.current) {
      // Compute bounding box to auto-fit the model
      const box = new THREE.Box3().setFromObject(groupRef.current);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      
      // Adjust camera distance based on model size
      const fitDistance = isProbeHead ? maxDim * 2 : maxDim * 1.5;
      camera.position.set(0, 0, fitDistance);
      camera.updateProjectionMatrix();
    }
  }, [scene, camera, isProbeHead]);

  useFrame((_, delta) => {
    if (groupRef.current && !isInteracting) {
      groupRef.current.rotation.x += delta * 0.5;
    }
  });

  return (
    <Center>
      <group rotation={[0, 0, -Math.PI / 2]}>
        <group ref={groupRef}>
          <primitive object={scene.clone()} />
        </group>
      </group>
    </Center>
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
