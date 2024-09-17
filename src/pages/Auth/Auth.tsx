import { useEffect } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { ITgUser } from '../../types/types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const { setUser } = useUser(); // Достаем setUser из контекста
  const navigate = useNavigate(); // Хук для перенаправления

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      const tgUser = tg.initDataUnsafe?.user;

      if (tgUser) {
        setUser(tgUser); // Сохраняем данные пользователя в глобальном состоянии через контекст
        handleSendDataToServer(tgUser);
        navigate('/'); // Перенаправляем на главную страницу
      }
    }
  }, [setUser, navigate]);

  const handleSendDataToServer = async (user: ITgUser) => {
    try {
      const response = await fetch('https://api.finance-av.ru:3001/game-bot/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: user }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
    } catch (error) {
      toast.error(`Ошибка при отправке данных на сервер: ${error}`);
    }
  };

  return (
    <div className='auth-container'>
      <ToastContainer />
      <h1>Авторизация</h1>
    </div>
  );
};

export default Auth;