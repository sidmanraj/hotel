import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Routes from "./components/Routes";
import "./config/firebaseConfig";
import UserProvider from "./hooks/UserProvider";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </UserProvider>
  );
}
