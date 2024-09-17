// App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Game from './pages/Game/Game';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Referal from './pages/Referal/Referal';
import Menu from './components/Menu/Menu';
import { UserProvider } from './pages/Auth/UserContext';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Menu />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/referrals" element={<Referal />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;