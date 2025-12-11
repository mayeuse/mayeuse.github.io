import { useEffect, useRef } from 'react';

const Model3D = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="w-[530px] h-[530px] md:w-[700px] md:h-[700px] flex-shrink-0">
      <video
        ref={videoRef}
        src="/videos/flower.webm"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-contain"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default Model3D;
