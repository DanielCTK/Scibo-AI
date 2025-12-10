import React from 'react';

interface ResultCardProps {
  text: string;
  error?: string | null;
}

const ResultCard: React.FC<ResultCardProps> = ({ text, error }) => {
  
  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      alert('Text copied to clipboard!');
    }
  };

  const handleDownload = () => {
    if (!text) return;
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "scribble_scan_result.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-card p-6 rounded-[15px] shadow-custom flex flex-col flex-1 min-h-[400px]">
      <h3 className="text-primary text-2xl font-bold mb-4 border-b-2 border-secondary pb-2">
        📜 Recognized Text
      </h3>
      
      <div className="flex-grow flex flex-col">
        <textarea 
          id="recognized-text" 
          className={`w-full flex-grow p-4 border border-gray-200 rounded-lg text-base resize-none mb-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${error ? 'text-red-500 italic' : 'text-text'}`}
          placeholder="Recognized text will appear here..." 
          readOnly
          value={error ? error : text}
        ></textarea>
        
        <div className="flex gap-3 justify-end">
          <button 
            onClick={handleCopy}
            disabled={!text || !!error}
            className={`flex items-center gap-2 font-bold py-2 px-4 rounded-lg text-white transition-all
              ${!text || !!error ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#4CAF50] hover:bg-[#45a049] hover:shadow-md'}`}
          >
            <i className="fas fa-copy"></i> Copy
          </button>
          
          <button 
            onClick={handleDownload}
            disabled={!text || !!error}
            className={`flex items-center gap-2 font-bold py-2 px-4 rounded-lg text-white transition-all
              ${!text || !!error ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#4CAF50] hover:bg-[#45a049] hover:shadow-md'}`}
          >
            <i className="fas fa-download"></i> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;