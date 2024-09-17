import React, { useEffect, useState } from 'react';
import './Leaderboard.css';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  score: number;
  telegramLink: string;
}

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Функция для получения данных с сервера
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('https://api.finance-av.ru:3001/game-bot/users/leaderboard');
        if (!response.ok) {
          throw new Error(`Ошибка загрузки данных: ${response.status}`);
        }

        const data = await response.json();

        // Преобразуем данные в необходимый формат
        const users: User[] = data.map((user: any) => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          score: user.score,
          telegramLink: `https://t.me/${user.username}`, // Формируем ссылку на Telegram
        }));

        setLeaderboardData(users);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setLoading(false);
      }
    };

    // Вызов функции для получения данных
    fetchLeaderboardData();
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Таблица лидеров</h1>
      <div className="leaderboard-list">
        {leaderboardData.map((user, index) => (
          <div key={user.id} className="leaderboard-card">
            <h2 className="user-rank">#{index + 1}</h2>
            <p className="user-name">
              {user.first_name} {user.last_name}
            </p>
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