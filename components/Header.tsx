import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white py-5 text-center shadow-custom">
      <h1 className="text-4xl font-bold mb-1">✍️ ScribbleScan</h1>
      <p className="text-lg opacity-90">Convert your handwriting to digital text in a flash!</p>
    </header>
  );
};

export default Header;