import { Button, Fab, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import { signOut } from "../common/auth";
import { UserContext } from "../hooks/UserProvider";
import "./Login.css";

export default function Profile() {
  const user = useContext(UserContext);
  const history = useHistory();
  const onSignOutClick = async () => {
    await signOut();
    history.push("/");
  };
  if (user) {
    return (
      <div className="root">
        <Typography variant="h4">welcome to the profile page</Typography>
        <Typography variant="h6">{user.displayName}</Typography>
        <Typography variant="h6">{user.email}</Typography>
        <Typography variant="h6">{user.uid}</Typography>
        <div className="buttons">
          <Fab
            color="primary"
            type="submit"
            variant="extended"
            onClick={signOut}
          >
            sign out
          </Fab>
          <Fab
            color="secondary"
            variant="extended"
            onClick={() => history.goBack()}
          >
            Back
          </Fab>
          <Fab
            color="default"
            variant="extended"
            onClick={() => history.push("/home")}
          >
            Home
          </Fab>
        </div>
      </div>
    );
  }
  return <div>user not yet logged in</div>;
}
