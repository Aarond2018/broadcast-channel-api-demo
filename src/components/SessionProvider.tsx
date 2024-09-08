"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Props = {
  children: ReactNode;
};

type ContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const SessionContext = createContext<ContextType | undefined>(undefined);

export const useSession = (): ContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};

export const SessionProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('auth') === 'logged_in';
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("auth", "logged_in");
    broadCastMsg('login');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
    broadCastMsg("logout");
  };

  const broadCastMsg = (message: string) => {
    const channel = new BroadcastChannel("session");
    channel.postMessage({ action: message });
    channel.close();
  };

  useEffect(() => {
    const channel = new BroadcastChannel("session");
    channel.onmessage = (event: MessageEvent) => {
      if (event.data.action === "logout") {
        setIsAuthenticated(false);
        localStorage.removeItem("auth");
      } else if (event.data.action === 'login') {
        setIsAuthenticated(true);
        localStorage.setItem('auth', 'logged_in');
      }
    };

    return () => channel.close();
  }, []);

  return (
    <SessionContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
