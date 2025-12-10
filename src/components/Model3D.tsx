import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

const RotatingModel = () => {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/smallLeaves.glb');

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={2} />
    </group>
  );
};

const Model3D = () => {
  return (
    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        style={{ background: 'transparent' }}
      >
        <directionalLight position={[1, 1, 0]} intensity={3} />
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          <RotatingModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Model3D;
