import React, { useRef } from 'react';

interface ModelSelectorProps {
  customModelName: string | null;
  onModelUpload: (file: File) => void;
  onReset: () => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ customModelName, onModelUpload, onReset }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onModelUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-card p-5 rounded-[15px] shadow-custom flex flex-col mt-5 lg:mt-0">
      <h3 className="text-primary text-xl font-bold mb-3 flex items-center gap-2">
        <i className="fas fa-brain"></i> AI Model
      </h3>
      
      <div className="bg-background rounded-lg p-3 mb-3 border border-gray-200">
        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Current Engine</p>
        <div className="flex items-center gap-2 text-text font-medium truncate">
            {customModelName ? (
                <>
                    <i className="fas fa-file-code text-secondary"></i>
                    <span className="truncate">{customModelName}</span>
                </>
            ) : (
                <>
                    <i className="fas fa-cloud text-primary"></i>
                    <span>Gemini 2.5 Flash</span>
                </>
            )}
        </div>
      </div>

      <input 
        type="file" 
        accept=".h5,.keras,.hdf5" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        hidden 
      />

      {customModelName ? (
        <button 
            onClick={onReset}
            className="w-full py-2 px-4 rounded-lg border-2 border-red-400 text-red-500 hover:bg-red-50 font-bold text-sm transition-all"
        >
            Reset to Default
        </button>
      ) : (
        <button 
            onClick={handleClick}
            className="w-full py-2 px-4 rounded-lg border-2 border-primary text-primary hover:bg-blue-50 font-bold text-sm transition-all border-dashed"
        >
            Upload .h5 Model
        </button>
      )}
      
      <p className="text-xs text-gray-400 mt-2 text-center">
        Supports .h5 / .keras formats
      </p>
    </div>
  );
};

export default ModelSelector;