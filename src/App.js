import React, { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [revealedImages, setRevealedImages] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [imagePositions, setImagePositions] = useState({});

  const images = useMemo(() => [
    'dogs1.jpg', 'dogs2.webp', 'dogs3.jpg', 'dogs4.jpg', 'dogs5.jpg', 'dogs6.jpg',
  ], []);

  const totalImages = images.length; // Total number of images to reveal
  const buttonPositions = useMemo(() => Array.from({ length: 12 }, (_, index) => index + 1), []);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Assign images to random positions at the start
  useEffect(() => {
    const shuffledPositions = shuffleArray(buttonPositions.slice());
    const positions = {};
    images.forEach((image, index) => {
      positions[shuffledPositions[index]] = image;
    });
    setImagePositions(positions);
  }, [buttonPositions, images]);

  const handleButtonClick = (pos) => {
    if (revealedImages.length < totalImages && !revealedImages.some(item => item.pos === pos) && !wrongGuesses.includes(pos)) {
      if (imagePositions[pos]) {
        setRevealedImages([...revealedImages, { pos, image: imagePositions[pos] }]);

        if (revealedImages.length + 1 === totalImages) {
          setGameOver(true);
        }
      } else {
        setWrongGuesses([...wrongGuesses, pos]);
      }
    }
  };

  const isRevealed = (pos) => revealedImages.some(item => item.pos === pos);
  const getImage = (pos) => revealedImages.find(item => item.pos === pos)?.image;

  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Find the Jellycats!</h1>
      <div className="flex flex-wrap mb-4 space-x-2">
        {revealedImages.map((_, index) => (
          <div key={index} className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 text-white flex items-center justify-center rounded-md m-1">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        ))}
        {wrongGuesses.map((_, index) => (
          <div key={index} className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 text-white flex items-center justify-center rounded-md m-1">
            <FontAwesomeIcon icon={faTimes} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {buttonPositions.map((pos) => (
          <div
            key={pos}
            className={`flex justify-center items-center w-24 h-24 border rounded-lg shadow-md transition duration-300 ${
              isRevealed(pos) ? 'bg-white' :
              wrongGuesses.includes(pos) ? 'bg-gradient-to-r from-red-300 to-red-400' :
              'bg-gradient-to-r from-violet-200 to-pink-200'
            }`}
            onClick={() => handleButtonClick(pos)}
          >
            {isRevealed(pos) ? (
              <img src={getImage(pos)} alt="Cute Jellycat" className="w-full h-full object-cover rounded-lg" />
            ) : wrongGuesses.includes(pos) ? (
              <FontAwesomeIcon icon={faTimes} className="text-white text-2xl" />
            ) : (
              <button className="w-full h-full"></button>
            )}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="mt-4 p-4 rounded-lg shadow-lg max-w-md text-center text-white bg-gradient-to-r from-sky-300 to-sky-400">
          Game Over! You found all the Jellycats!
        </div>
      )}
    </div>
  );
}

export default App;
