import React from 'react';
import './Leaderboard.css';

interface User {
  id: number;
  name: string;
  score: number;
  telegramLink: string;
}

const testData: User[] = [
  { id: 1, name: 'Иван Иванов', score: 1500, telegramLink: 'https://t.me/ivan_ivanov' },
  { id: 2, name: 'Петр Петров', score: 1200, telegramLink: 'https://t.me/petr_petrov' },
  { id: 3, name: 'Сергей Сергеев', score: 900, telegramLink: 'https://t.me/sergey_sergeev' },
  // Добавьте больше тестовых пользователей при необходимости
];

const Leaderboard: React.FC = () => {
  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Таблица лидеров</h1>
      <div className="leaderboard-list">
        {testData.map((user, index) => (
          <div key={user.id} className="leaderboard-card">
            <h2 className="user-rank">#{index + 1}</h2>
            <p className="user-name">{user.name}</p>
            <p className="user-score">Очки: {user.score}</p>
            <a
              href={user.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="telegram-link"
            >
              Telegram
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;