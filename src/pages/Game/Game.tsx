import React, { useState } from 'react';
import './Game.css';

const Game: React.FC = () => {
  const [score, setScore] = useState(0);
  const [moneyFall, setMoneyFall] = useState<boolean>(false);

  const handleClick = () => {
    setScore(score + 1);
    setMoneyFall(true);

    // Останавливаем анимацию после ее завершения
    setTimeout(() => {
      setMoneyFall(false);
    }, 1000); // Длительность анимации в миллисекундах

    // Отправка нового счета на сервер
    // axios.put('/api/score', { score: score + 1 });
  };

  return (
    <div className="game-container">
      <div className="score">Счет: {score}</div>
      <div className="clickable-area" onClick={handleClick}>
        <div className={`clickable-object ${moneyFall ? 'clicked' : ''}`}>
          <img src={'https://raw.githubusercontent.com/miles101armales/av-tap-game-frontend/main/public/sticker.webp'} alt="Clickable Object" />
          <div className="overlay-text">Нажми на меня</div>
        </div>
        {moneyFall && <div className="money-animation"></div>}
      </div>
    </div>
  );
};

export default Game;