const Model3D = () => {
  return (
    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
      <video
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
