import { useEffect, useState } from 'react'
import './Auth.css'

const Auth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Получение данных пользователя из контекста Telegram Web App
    const tg = window.Telegram.WebApp;
    tg.ready();
    
    // Получаем данные о пользователе
    setUser(tg.initDataUnsafe?.user);

    // Вызываем функцию при закрытии Web App
    return () => {
      tg.close();
    };
  }, [user]);

  const sendDataToServer = async () => {
    const response = await fetch('https://45.131.96.9:3000/game-bot/telegram/webapp-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: 'Some data from Web App' }),
    });
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