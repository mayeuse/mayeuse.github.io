import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Group, MeshStandardMaterial } from 'three';

const FlowerModel = () => {
  const groupRef = useRef<Group>(null);
  const obj = useLoader(OBJLoader, '/models/smallLeaves.obj');

  const clonedScene = useMemo(() => {
    const clone = obj.clone();
    // Apply a nice sage green material to all meshes
    clone.traverse((child) => {
      if ((child as any).isMesh) {
        (child as any).material = new MeshStandardMaterial({
          color: '#8aaf8a',
          roughness: 0.4,
          metalness: 0.1,
        });
      }
    });
    return clone;
  }, [obj]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={clonedScene} scale={2} />
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
