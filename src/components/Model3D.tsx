import { useEffect, useRef } from 'react';

const Model3D = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="w-[280px] h-[280px] md:w-[530px] md:h-[530px] lg:w-[700px] lg:h-[700px] flex-shrink-0">
      <video
        ref={videoRef}
        src="/videos/flower.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-contain"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default Model3D;
