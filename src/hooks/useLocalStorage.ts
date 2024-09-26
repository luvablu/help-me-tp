import { useState } from "react";

export interface UserSession {
  hastaghs?: string;
  keywords?: string;
  accounts?: string;
  category?: string;
  type?: "multiple" | "boolean" | "";
  sessionToken?: string;
}

const useLocalStorage = () => {
  const key = "userSession";
  const [userSession, setUserSession] = useState<UserSession>();

  const retrieveUserSession = async () => {
    const value = localStorage.getItem(key);
    if (value) {
      const data: UserSession = JSON.parse(value);
      setUserSession(data);
    }
  };

  const saveUserSession = async (userData?: UserSession) => {
    localStorage.setItem(key, JSON.stringify(userData));
  };

  return {
    userSession,
    saveUserSession,
    retrieveUserSession,
  };
};

export default useLocalStorage;
