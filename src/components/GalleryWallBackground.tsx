import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, PlaneGeometry, MeshStandardMaterial, TextureLoader, Vector3 } from 'three';
import { useState, useEffect } from 'react';

// Placeholder images - replace with actual slideshow images
const slideshowImages = [
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=600&fit=crop',
];

const ProjectedImage = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<Mesh>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
        setOpacity(1);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[6, 4]} />
      <meshBasicMaterial 
        color="#f5f0eb"
        transparent
        opacity={0.15 * opacity}
      />
    </mesh>
  );
};

const GalleryWall = () => {
  const wallRef = useRef<Mesh>(null);

  return (
    <group>
      {/* Main wall */}
      <mesh position={[0, 0, -5]} receiveShadow>
        <planeGeometry args={[50, 30]} />
        <meshStandardMaterial 
          color="#faf8f5"
          roughness={0.9}
          metalness={0}
        />
      </mesh>
      
      {/* Subtle wall texture/grain */}
      <mesh position={[0, 0, -4.99]}>
        <planeGeometry args={[50, 30]} />
        <meshStandardMaterial 
          color="#f0ebe5"
          roughness={1}
          metalness={0}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Projected slideshow area */}
      <ProjectedImage position={[8, 0, -4.9]} />
    </group>
  );
};

const GalleryWallBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ background: '#faf8f5' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={0.3} />
        <GalleryWall />
      </Canvas>
    </div>
  );
};

export default GalleryWallBackground;
