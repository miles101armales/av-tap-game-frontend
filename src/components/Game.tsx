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
	<>
		<div className="game-container">
		<div className="score-display">Счет: {score}</div>
		<div className="circle-container">
			<div className="circle" onClick={handleTap}>
			<span className="circle-text">Тап!</span>
			</div>
		</div>
		</div>
	</>
    
  );
};

export default Game;