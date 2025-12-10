import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-5 mt-10 border-t border-gray-200 text-gray-500 text-sm">
      <p>&copy; {new Date().getFullYear()} ScribbleScan | Handwriting OCR Service</p>
    </footer>
  );
};

export default Footer;