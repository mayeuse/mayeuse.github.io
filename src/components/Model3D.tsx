import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';

// Placeholder rotating box until .obj file is added
const RotatingModel = () => {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Replace this with OBJLoader when file is ready */}
      <mesh>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshToonMaterial color="#ffeded" />
      </mesh>
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
