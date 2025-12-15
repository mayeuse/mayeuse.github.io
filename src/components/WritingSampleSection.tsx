const WritingSampleSection = () => {
  return (
    <section id="writing" className="h-[calc(100vh-200px)] flex items-start pt-4 pl-[5%] pr-[15%] relative z-10">
      <div className="w-full h-full shadow-2xl rounded-lg overflow-hidden bg-white">
        <iframe
          src="/documents/ANTH_2017_FINAL_PAPER.pdf#toolbar=0&navpanes=0&view=FitH&scrollbar=0"
          className="w-full h-full"
          title="Writing Sample"
        />
      </div>
    </section>
  );
};

export default WritingSampleSection;
