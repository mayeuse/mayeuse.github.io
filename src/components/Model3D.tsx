const Model3D = () => {
  return (
    <div className="w-[480px] h-[480px] md:w-[640px] md:h-[640px]">
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
