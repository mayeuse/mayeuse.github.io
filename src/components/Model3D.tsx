import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import { Group } from 'three';

const FlowerModel = () => {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF('/models/smallLeaves.glb');

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene.clone()} scale={1.5} />
      </Center>
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
