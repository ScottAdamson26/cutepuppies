import React, { useState } from 'react';
import './App.css';

function App() {
  const [imageIndex, setImageIndex] = useState(0);
  const [buttonText, setButtonText] = useState('Press for Surprise'); // Corrected initial text

  const images = [
    'dogs1.jpg', 'dogs2.jpg', 'dogs3.jpg', 'dogs4.jpg', 'dogs5.jpg',
    'dogs6.jpg'
  ];

  const handleClick = () => {
    if (buttonText === 'Press for Surprise') { // Make sure this matches exactly the initial state
      setButtonText('Next Pup');
    }
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <div className="flex flex-col items-center"> {/* Ensures images and button are aligned vertically */}
        {buttonText !== 'Press for Surprise' && (
          <img src={images[imageIndex]} alt="Cute dog" className="mb-4 max-w-md rounded-lg shadow-lg" /> // Adjusted max width and added rounded edges
        )}
        <button className="bg-gradient-to-r from-violet-200 to-pink-200 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105" onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default App;
