import React, { useState, useEffect } from 'react';
import './Game.css';

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [lastTap, setLastTap] = useState(0);

  useEffect(() => {
    if (lastTap > 0) {
      console.log(`Круг был нажат! Текущий счет: ${score}`);
      // Здесь вы можете добавить любую дополнительную логику,
      // которая должна выполняться при каждом нажатии
    }
  }, [lastTap, score]);

  const handleTap = () => {
    setScore(prevScore => prevScore + 1);
    setLastTap(Date.now());
  };

  return (
    <div className="circle-container">
    <img 
      src={'https://raw.githubusercontent.com/miles101armales/av-tap-game-frontend/main/public/sticker.webp'} 
      alt="Tap!" 
      onClick={handleTap}
      className="tap-image"
    />
    <span className="tap-text">Тап!</span>
  </div>
    
  );
};

export default Game;