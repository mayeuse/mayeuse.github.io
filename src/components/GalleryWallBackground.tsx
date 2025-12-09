import { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Mesh, TextureLoader } from 'three';
import { useState, useEffect } from 'react';

// Placeholder images - replace with actual slideshow images
const slideshowImages = [
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=800&fit=crop',
  'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&h=800&fit=crop',
];

const ProjectedSlideshow = () => {
  const meshRef = useRef<Mesh>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  
  const textures = useLoader(TextureLoader, slideshowImages);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % slideshowImages.length);
        setOpacity(1);
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, -4.8]}>
      <planeGeometry args={[16, 10]} />
      <meshBasicMaterial 
        map={textures[currentIndex]}
        transparent
        opacity={0.25 * opacity}
      />
    </mesh>
  );
};

const GalleryWall = () => {
  return (
    <group>
      {/* Main wall - pure white */}
      <mesh position={[0, 0, -5]} receiveShadow>
        <planeGeometry args={[60, 40]} />
        <meshStandardMaterial 
          color="#ffffff"
          roughness={0.95}
          metalness={0}
        />
      </mesh>
      
      {/* Subtle texture overlay */}
      <mesh position={[0, 0, -4.95]}>
        <planeGeometry args={[60, 40]} />
        <meshStandardMaterial 
          color="#f8f8f8"
          roughness={1}
          metalness={0}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Centered projected slideshow */}
      <ProjectedSlideshow />
    </group>
  );
};

const GalleryWallBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ background: '#ffffff' }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} />
        <GalleryWall />
      </Canvas>
    </div>
  );
};

export default GalleryWallBackground;
