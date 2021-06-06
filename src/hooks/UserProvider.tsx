import React, { useState, useEffect, createContext } from "react";
import firebase from "firebase/app";
import LoadingSpinner from "../components/LoadingSpinner";
  
interface IUserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<firebase.User | null>(null);

export default function UserProvider(props: IUserProviderProps) {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user: firebase.User | null) => {
        setUser(user);
        setIsLoading(false)
      });
    //useEffect should return unsubscribe function
    return unsubscribe;
  }, []);
  return (
    <UserContext.Provider value={user}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && props.children}
    </UserContext.Provider>
  );
}
