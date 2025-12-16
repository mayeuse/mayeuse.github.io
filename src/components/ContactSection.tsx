import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import crayonCursor from '@/assets/crayon-cursor.svg';

const ContactSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setColor] = useState('#000000');
  const [name, setName] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

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
    setHasDrawn(true);
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = ('touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left) * scaleX;
    const y = ('touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top) * scaleY;
    
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
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = ('touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left) * scaleX;
    const y = ('touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top) * scaleY;
    
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
    
    try {
      const imageData = canvas.toDataURL('image/png');
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'ce5d3b9a-fe12-43c2-a35c-eaac943ddee8',
          subject: `A Flower for Your Bouquet From ${name}`,
          from_name: name,
          flower_drawing: imageData,
          message: `${name} has drawn a flower for your bouquet!`,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success("Thank you! Your flower has been sent!");
        setName('');
        setHasDrawn(false);
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error sending flower:', error);
      toast.error("Failed to send. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="h-[calc(100vh-180px)] flex items-start pt-8 pl-[5%] pr-[20%] relative z-20">
      {/* Left half - Title + Flower video + Email */}
      <div className="w-1/2 h-full flex flex-col items-center justify-center relative z-20">
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4 text-center max-w-[90%]">
          Thank You for being part of my life and work
        </h2>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-[80%] max-h-[50%] object-contain"
        >
          <source src="/videos/flower.webm" type="video/webm" />
        </video>
        <p className="font-body text-foreground/80 text-sm text-center mt-4">
          email me at
        </p>
        <a 
          href="mailto:maya.3lizabeth@gmail.com" 
          className="font-body text-foreground hover:text-primary hover:underline transition-colors text-sm"
        >
          maya.3lizabeth@gmail.com
        </a>
      </div>

      {/* Right half - Content */}
      <div className="w-1/2 flex flex-col items-center justify-center h-full py-4 relative z-20">
        <p className="font-body text-foreground/80 text-sm mb-3 text-center max-w-[320px]">
          I have only been able to do what I do with support from the people around me. As a tradition, I'll be sending virtual thank you bouquets that represent not only me but the people who have helped me along the way.
        </p>
        <p className="font-body text-foreground/80 text-sm mb-3 text-center max-w-[320px] font-bold">
          If you'd like to add a flower to my bouquet, use the boxes below to submit your drawing and name.
        </p>

        {/* Color picker */}
        <div className="flex gap-2 mb-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setColor(color)}
              className={`w-5 h-5 rounded-full transition-transform ${brushColor === color ? 'scale-125 ring-2 ring-foreground' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Drawing canvas */}
        <div className="border border-foreground/20 rounded-lg bg-white/50 mb-2 relative" style={{ width: '280px', height: '180px' }}>
          <canvas
            ref={canvasRef}
            width={280}
            height={180}
            className="rounded-lg w-full h-full"
            style={{ cursor: `url(${crayonCursor}) 2 22, crosshair` }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {!hasDrawn && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-foreground/30 text-sm">
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
          className="w-[280px] px-3 py-1.5 border border-foreground/20 rounded-lg bg-white/50 font-body text-foreground placeholder:text-foreground/40 mb-2 text-sm"
        />

        {/* Send button */}
        <div className="w-[280px] flex justify-end mb-4">
          <button
            onClick={handleSend}
            disabled={isSending || !name.trim()}
            className="px-5 py-1.5 bg-foreground text-background font-nav text-sm rounded transition-opacity hover:opacity-80 disabled:opacity-50"
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
