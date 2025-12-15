const WritingSampleSection = () => {
  return (
    <section id="writing" className="flex flex-col relative z-10">
      {/* Buffer space matching handwriting image height */}
      <div className="h-[25vh]" />
      
      <div className="h-[calc(100vh-200px)] flex items-start pl-[5%] pr-[15%]">
        <div className="w-full h-full shadow-2xl rounded-lg overflow-hidden bg-white">
          <iframe
            src="/documents/ANTH_2017_FINAL_PAPER.pdf#toolbar=0&navpanes=0&view=FitH&scrollbar=0"
            className="w-full h-full"
            title="Writing Sample"
          />
        </div>
      </div>
      
      {/* Buffer space below */}
      <div className="h-[25vh]" />
    </section>
  );
};

export default WritingSampleSection;