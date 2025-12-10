const GalleryWallBackground = () => {
  return (
    <div 
      className="fixed inset-0 z-0"
      style={{ 
        background: `
          linear-gradient(180deg, 
            #ffffff 0%, 
            #fafafa 30%,
            #f5f5f5 60%, 
            #ededed 100%
          )
        `
      }}
    >
      {/* Subtle vignette overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.03) 100%)'
        }}
      />
      
      {/* Soft light from top */}
      <div 
        className="absolute inset-x-0 top-0 h-1/3"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, transparent 100%)'
        }}
      />
    </div>
  );
};

export default GalleryWallBackground;
