import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu: React.FC = () => {
  return (
    <div className="menu">
      <Link to="/">Главная</Link>
      <Link to="/leaderboard">Лидеры</Link>
      <Link to="/referrals">Рефералы</Link>
    </div>
  );
};

export default Menu;