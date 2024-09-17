import React, { useEffect, useState, useRef } from 'react';
import './Game.css';
import { nanoid } from 'nanoid';
import sticker from '../../assets/sticker.webp';
import { useUser } from '../Auth/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Leaf {
  id: string;
  rotate: string;
  translateX: string;
  duration: string;
  size: string;
  left: string;
}

const SYNC_INTERVAL = 10000; // Интервал синхронизации в миллисекундах

const Game: React.FC = () => {
  
  const { user } = useUser();
  const [score, setScore] = useState<number>(0); // Локальный счёт
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const scoreRef = useRef<number>(score); // Ссылка на актуальное значение счёта
  const isSyncingRef = useRef<boolean>(false); // Флаг синхронизации
  // Функция для сохранения счёта в localStorage
  const saveScoreToLocalStorage = (newScore: number) => {
    localStorage.setItem('score', newScore.toString());
  };

  // Инициализация Telegram WebApp при монтировании компонента
  useEffect(() => {

    const fetchScoreFromServer = async () => {
      try {
        // Запрос на получение текущего счёта пользователя с сервера
        const response = await fetch(`https://api.finance-av.ru:3001/game-bot/users/${user?.id}/score`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        let serverScore = 0;
        if (response.ok) {
          const data = await response.json();
          serverScore = data.score; // Данные с сервера
        } else {
          toast.error(`Ошибка загрузки счёта: ${response.status}`);
        }

        // Получаем локальный счёт из localStorage
        const localScore = localStorage.getItem('score');
        let parsedLocalScore = localScore ? parseInt(localScore, 10) : 0;

        // Сравнение данных с сервера и локальных данных
        const finalScore = Math.max(serverScore, parsedLocalScore);
        setScore(finalScore);
        scoreRef.current = finalScore;
      } catch (error) {
        toast.error(`Ошибка при загрузке счёта с сервера: ${error}`);
      }
    };

    if (user) {
      fetchScoreFromServer();
    }

    // Периодическая синхронизация
    setInterval(() => {
      if (!isSyncingRef.current) {
        isSyncingRef.current = true;
        saveScoreToBackend(scoreRef.current).finally(() => {
          isSyncingRef.current = false;
        });
      }
    }, SYNC_INTERVAL);
  }, [user]);

  // Функция для сохранения счёта на сервере
  const saveScoreToBackend = async (currentScore: number) => {
    try {
      const response = await fetch(`https://api.finance-av.ru:3001/game-bot/users/${user?.id}/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: currentScore }),
      });

      if (response.ok) {
        console.log('Счёт успешно синхронизирован с сервером');
      } else {
        toast.error(`Ошибка синхронизации: ${response.status}`);
      }
    } catch (error) {
      toast.error(`Ошибка при синхронизации данных с сервером: ${error}`);
    }
  };

  const handleClick = () => {
    const newScore = score + 1;
    setScore(newScore);
    scoreRef.current = newScore;

    const id = nanoid();
    const rotate = `${Math.random() * 720 - 360}deg`;
    const translateX = `${Math.random() * 200 - 100}px`;
    const duration = `${Math.random() * 2 + 2}s`; // От 2s до 4s
    const size = `${Math.random() * 30 + 20}px`; // От 20px до 50px
    const left = `${Math.random() * 100}%`; // Случайная горизонтальная позиция

    const newLeaf = { id, rotate, translateX, duration, size, left };

    setLeaves((prevLeaves) => [...prevLeaves, newLeaf]);

    // Сохраняем счёт в localStorage при каждом обновлении
    saveScoreToLocalStorage(newScore);

    saveScoreToBackend(newScore);
  };

  return (
    <div className="game-container" onClick={handleClick}>
      <ToastContainer />
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
      <div className="overlay-text">Счёт: {score}</div>
      <div className="clickable-area">
        <div className="clickable-object">
          <img
            src={sticker}
            alt="Clickable Object"
          />
          <div className="click-text">НАЖМИ НА МЕНЯ</div>
        </div>
      </div>
    </div>
  );
};

export default Game;