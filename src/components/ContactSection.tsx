import { useState, useRef, useEffect } from 'react';

const ContactSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setColor] = useState('#000000');
  const [name, setName] = useState('');
  const [isSending, setIsSending] = useState(false);

  const colors = ['#000000', '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#10ac84', '#ee5253'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = 'transparent';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSend = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !name.trim()) return;

    setIsSending(true);
    
    // Convert canvas to PNG blob
    canvas.toBlob(async (blob) => {
      if (!blob) {
        setIsSending(false);
        return;
      }

      // Create mailto link with subject
      const subject = encodeURIComponent(`A Flower for Your Bouquet From ${name}`);
      window.location.href = `mailto:maya.3lizabeth@gmail.com?subject=${subject}`;
      
      setIsSending(false);
    }, 'image/png');
  };

  return (
    <section id="contact" className="h-screen flex items-center pl-[5%] pr-[5%] relative z-20">
      {/* Left third - Flower video */}
      <div className="w-1/3 h-full flex items-center justify-center relative z-20">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-[80%] h-auto object-contain"
        >
          <source src="/videos/flower.webm" type="video/webm" />
        </video>
      </div>

      {/* Right two thirds - Content */}
      <div className="w-2/3 flex flex-col justify-center h-full py-8 relative z-20">
        <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
          Thank You for being part of my life and work
        </h2>
        
        <p className="font-body text-foreground/80 text-sm mb-4 max-w-xl">
          I have only been able to do what I do with support from the people around me. As a tradition, I've started sending virtual thank you bouquets that represent not only me but the people who have helped me along the way. If you'd like to add a flower to my bouquet, use the boxes below to submit your drawing and name.
        </p>

        {/* Color picker */}
        <div className="flex gap-2 mb-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setColor(color)}
              className={`w-6 h-6 rounded-full transition-transform ${brushColor === color ? 'scale-125 ring-2 ring-foreground' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Drawing canvas */}
        <div className="border border-foreground/20 rounded-lg bg-white/50 mb-3" style={{ width: '300px', height: '200px' }}>
          <canvas
            ref={canvasRef}
            width={300}
            height={200}
            className="cursor-crosshair rounded-lg"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {!isDrawing && (
            <div className="absolute pointer-events-none text-foreground/30 text-sm" style={{ marginTop: '-110px', marginLeft: '90px' }}>
              Draw Your Flower!
            </div>
          )}
        </div>

        {/* Name field */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-[300px] px-3 py-2 border border-foreground/20 rounded-lg bg-white/50 font-body text-foreground placeholder:text-foreground/40 mb-3"
        />

        {/* Send button */}
        <div className="w-[300px] flex justify-end mb-6">
          <button
            onClick={handleSend}
            disabled={isSending || !name.trim()}
            className="px-6 py-2 bg-foreground text-background font-nav text-sm rounded transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>

        {/* Email contact */}
        <p className="font-body text-foreground/80 text-sm">
          You can also email me at
        </p>
        <a 
          href="mailto:maya.3lizabeth@gmail.com" 
          className="font-body text-foreground hover:text-primary hover:underline transition-colors text-sm"
        >
          maya.3lizabeth@gmail.com
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
