// UserContext.tsx
import { createContext, useState, useContext, ReactNode } from 'react';
import { ITgUser } from '../../types/types';

interface UserContextType {
  user: ITgUser | undefined;
  setUser: (user: ITgUser | undefined) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<ITgUser | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};