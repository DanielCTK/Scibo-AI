import React, { useRef, useState } from 'react';

interface UploadCardProps {
  onImageSelected: (file: File) => void;
  onScan: () => void;
  isScanning: boolean;
  selectedFile: File | null;
}

const UploadCard: React.FC<UploadCardProps> = ({ onImageSelected, onScan, isScanning, selectedFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelected(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-card p-6 rounded-[15px] shadow-custom flex flex-col flex-1 min-h-[400px]">
      <h3 className="text-primary text-2xl font-bold mb-4 border-b-2 border-secondary pb-2">
        🖼️ Upload Image
      </h3>
      
      <div className="flex-grow flex flex-col">
        <div className="flex flex-col items-center justify-center flex-grow border-[3px] border-dashed border-primary rounded-lg mb-5 p-4 bg-blue-50/30 overflow-hidden relative">
          
          {previewUrl ? (
             <div className="w-full h-full flex items-center justify-center relative group">
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-h-[200px] object-contain rounded-md" 
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md cursor-pointer" onClick={triggerFileInput}>
                   <span className="text-white font-bold bg-black/50 px-3 py-1 rounded-full">Change Image</span>
                </div>
             </div>
          ) : (
            <>
              <i className="fas fa-camera text-6xl text-primary mb-4"></i>
              <p className="text-gray-500 mb-2 text-center">No image selected</p>
            </>
          )}

          <input 
            type="file" 
            id="handwriting-image" 
            accept="image/*" 
            hidden 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          {!previewUrl && (
            <button 
              onClick={triggerFileInput}
              className="bg-secondary text-text font-bold py-2 px-5 rounded-lg hover:bg-[#FFADD9] hover:-translate-y-0.5 transition-all mt-2"
            >
              Select or Take Photo
            </button>
          )}
          
          <p className="text-sm text-gray-400 mt-3 text-center">Clear handwriting yields the best results!</p>
        </div>

        <button 
          onClick={onScan}
          disabled={!selectedFile || isScanning}
          className={`w-full font-bold py-3 px-6 rounded-lg transition-all text-white shadow-md
            ${!selectedFile || isScanning 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-primary hover:bg-[#4A89FF] hover:-translate-y-0.5'}`}
        >
          {isScanning ? (
            <span className="flex items-center justify-center gap-2">
              <i className="fas fa-circle-notch fa-spin"></i> Processing...
            </span>
          ) : 'Scan & Recognize'}
        </button>
      </div>
    </div>
  );
};

export default UploadCard;