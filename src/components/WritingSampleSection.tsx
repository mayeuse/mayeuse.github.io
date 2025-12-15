import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WritingSampleSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section id="writing" className="min-h-screen flex items-center justify-center px-[5%] relative z-10">
      <div className="flex items-center justify-center gap-4 w-full max-w-3xl">
        {/* Left arrow */}
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className="p-2 text-foreground hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-foreground"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Single page view */}
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="shadow-2xl rounded-lg overflow-hidden bg-white"
        >
          <iframe
            src={`/documents/ANTH_2017_FINAL_PAPER.pdf#page=${currentPage}&toolbar=0&navpanes=0&view=FitH`}
            className="w-[500px] h-[650px]"
            title={`Writing Sample Page ${currentPage}`}
          />
        </motion.div>

        {/* Right arrow */}
        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          className="p-2 text-foreground hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-foreground"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Page indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-nav text-sm text-foreground/60">
        Page {currentPage} of {totalPages}
      </div>
    </section>
  );
};

export default WritingSampleSection;
