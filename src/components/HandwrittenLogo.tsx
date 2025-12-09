import handwrittenName from '@/assets/handwritten-name.png';

const HandwrittenLogo = () => {
  return (
    <a 
      href="#top"
      className="fixed top-6 left-[5%] z-50"
    >
      <img 
        src={handwrittenName} 
        alt="Maya Eusebio" 
        className="w-[33vw] h-auto"
      />
    </a>
  );
};

export default HandwrittenLogo;
