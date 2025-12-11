const GalleryWallBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Main white wall */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `
            linear-gradient(180deg, 
              #fefefe 0%, 
              #fafafa 40%,
              #f5f5f5 70%, 
              #efefef 100%
            )
          `
        }}
      />
      
      {/* Studio curve/cove at bottom - the sweep where wall meets floor */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[35%]"
        style={{
          background: `
            radial-gradient(ellipse 180% 100% at 50% 0%, 
              transparent 0%, 
              transparent 60%,
              rgba(0,0,0,0.02) 80%,
              rgba(0,0,0,0.05) 100%
            )
          `
        }}
      />
      
      {/* Soft curved shadow suggesting the cove */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[25%]"
        style={{
          background: `
            radial-gradient(ellipse 150% 80% at 50% 100%, 
              rgba(0,0,0,0.04) 0%, 
              transparent 70%
            )
          `
        }}
      />
      
      {/* Key light from top-right */}
      <div 
        className="absolute top-0 right-0 w-2/3 h-2/3"
        style={{
          background: 'radial-gradient(ellipse at 80% 10%, rgba(255,255,255,0.9) 0%, transparent 60%)'
        }}
      />
      
      {/* Fill light from left */}
      <div 
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{
          background: 'radial-gradient(ellipse at 10% 30%, rgba(255,255,255,0.4) 0%, transparent 50%)'
        }}
      />
      
      {/* Subtle vignette for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.03) 100%)'
        }}
      />
    </div>
  );
};

export default GalleryWallBackground;
