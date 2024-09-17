import React from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

const Menu: React.FC = () => {
  return (
    <div className="menu">
      <NavLink to="/" end>
        Главная
      </NavLink>
      <NavLink to="/leaderboard">
        Лидеры
      </NavLink>
      <NavLink to="/referrals">
        Рефералы
      </NavLink>
    </div>
  );
};

export default Menu;