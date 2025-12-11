const Model3D = () => {
  return (
    <div className="w-[530px] h-[530px] md:w-[700px] md:h-[700px] -ml-[200px]">
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
