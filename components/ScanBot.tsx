import React from 'react';

const ScanBot: React.FC = () => {
  return (
    <div className="w-full text-center p-5 rounded-[15px] bg-secondary shadow-custom flex flex-col items-center justify-center h-fit">
      <div className="text-[8rem] mb-4 animate-bounce select-none">
        <span role="img" aria-label="Friendly Robot">🤖</span>
      </div>
      <p className="font-bold text-text bg-white p-3 rounded-lg shadow-sm w-full">
        Hello! I'm Scribo, ready to transform your handwriting!
      </p>
    </div>
  );
};

export default ScanBot;