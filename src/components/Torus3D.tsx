import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const RotatingTorus = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[1, 0.4, 16, 60]} />
      <meshToonMaterial color="#ffeded" />
    </mesh>
  );
};

const Torus3D = () => {
  return (
    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        style={{ background: 'transparent' }}
      >
        <directionalLight position={[1, 1, 0]} intensity={3} />
        <ambientLight intensity={0.4} />
        <RotatingTorus />
      </Canvas>
    </div>
  );
};

export default Torus3D;
