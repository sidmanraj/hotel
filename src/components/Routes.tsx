import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../hooks/UserProvider";
import Food from "../pages/Food";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";

export default function Routes() {
  const user = useContext(UserContext);
  const signInRedirect = () => {
    if (user) {
      return <Redirect to="/" />;
    }
    return;
  };
  const profileRedirect = () => {
    if (!user) {
      return <Redirect to="/" />;
    }
    return;
  };
  return (
    <switch>
      <Route path="/signup" render={() => signInRedirect() ?? <SignUp />} />
      <Route path="/login" render={() => signInRedirect() ?? <Login />} />
      <Route
        path="/profile/:profileId"
        render={() => profileRedirect() ?? <Profile />}
      />
      <Route path="/home" component={Food} />
      <Route exact path="/" render={() => <Redirect to="/home" />} />
    </switch>
  );
}
