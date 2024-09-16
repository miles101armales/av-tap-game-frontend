import { useEffect, useState } from 'react'
import './Auth.css'

const Auth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Проверяем, доступен ли Telegram WebApp API
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();

      // Получаем данные о пользователе, если они доступны
      setUser(tg.initDataUnsafe?.user);

      // Возвращаем функцию для закрытия Web App при завершении
      return () => {
        tg.close();
      };
    } else {
      console.log('Telegram Web App не найден, приложение работает вне Telegram.');
    }
  }, []);

  const sendDataToServer = async () => {
    const response = await fetch('https://45.131.96.9:3000/game-bot/telegram/webapp-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: 'Some data from Web App' }),
    });
    console.log(user)
    const result = await response.json();
    console.log('Ответ сервера:', result);
  };
  
  return (
	<div className='auth-container'>
    <h1>Авторизация</h1>
    <button onClick={sendDataToServer}>Вперед!</button>
  </div>
  )
}

export default Auth