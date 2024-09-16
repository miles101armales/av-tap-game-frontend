import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Game from './pages/Game/Game.tsx'
import Menu from './components/Menu/Menu.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Leaderboard from './pages/Leaderboard/Leaderboard.tsx'
import Referal from './pages/Referal/Referal.tsx'
import Auth from './pages/Auth/Auth.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/av-tap-game-frontend">
      <Menu />
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/referrals" element={<Referal />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)