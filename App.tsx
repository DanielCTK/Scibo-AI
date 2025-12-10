import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScanBot from './components/ScanBot';
import UploadCard from './components/UploadCard';
import ResultCard from './components/ResultCard';
import { recognizeHandwriting } from './services/geminiService';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = (file: File) => {
    setSelectedFile(file);
    // Reset previous results when new image selected
    setRecognizedText('');
    setError(null);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the Data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64Data = result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleScan = async () => {
    if (!selectedFile) return;

    setIsScanning(true);
    setError(null);
    setRecognizedText('');

    try {
      const base64Data = await convertFileToBase64(selectedFile);
      const text = await recognizeHandwriting(base64Data, selectedFile.type);
      setRecognizedText(text);
    } catch (err) {
      setError("Oops! Scribo had trouble reading that. Please check your internet connection or try a clearer image.");
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-text bg-background">
      <Header />
      
      <main className="container mx-auto px-5 py-10 flex flex-col lg:flex-row gap-8 max-w-[1200px] flex-grow">
        
        <section className="flex flex-col md:flex-row gap-8 flex-grow">
          <UploadCard 
            onImageSelected={handleImageSelected}
            onScan={handleScan}
            isScanning={isScanning}
            selectedFile={selectedFile}
          />
          
          <ResultCard 
            text={recognizedText}
            error={error}
          />
        </section>

        <ScanBot />
        
      </main>

      <Footer />
    </div>
  );
};

export default App;