import React, { useState } from 'react';
import './Game.css';
import { nanoid } from 'nanoid';

interface Leaf {
  id: string;
  rotate: string;
  translateX: string;
  duration: string;
  size: string;
  left: string;
}

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  const handleClick = () => {
    setScore(score + 1);

    const id = nanoid();
    const rotate = `${Math.random() * 720 - 360}deg`;
    const translateX = `${Math.random() * 200 - 100}px`;
    const duration = `${Math.random() * 2 + 2}s`; // От 2s до 4s
    const size = `${Math.random() * 30 + 20}px`; // От 20px до 50px
    const left = `${Math.random() * 100}%`; // Случайная горизонтальная позиция

    const newLeaf = { id, rotate, translateX, duration, size, left };

    setLeaves((prevLeaves) => [...prevLeaves, newLeaf]);
  };

  return (
    <div className="game-container" onClick={handleClick}>
      <div className="leaf-container">
          {leaves.map((leaf) => (
            <div
              key={leaf.id}
              className="leaf animate"
              style={
                {
                  '--rotate': leaf.rotate,
                  '--translateX': leaf.translateX,
                  '--duration': leaf.duration,
                  '--size': leaf.size,
                  left: leaf.left, // Устанавливаем случайное значение left
                } as React.CSSProperties
              }
              onAnimationEnd={() => {
                setLeaves((prevLeaves) =>
                  prevLeaves.filter((l) => l.id !== leaf.id)
                );
              }}
            ></div>
          ))}
        </div>
        <div className='overlay-text'>Счет: {score}</div>
      <div className="clickable-area">
        <div className="clickable-object">
          <img
            src="https://raw.githubusercontent.com/miles101armales/av-tap-game-frontend/main/public/sticker.webp"
            alt="Clickable Object"
          />
        </div>
      </div>
    </div>
  );
};

export default Game;