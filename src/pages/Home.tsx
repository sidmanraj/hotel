import { ButtonGroup, Fab, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import { useHistory } from "react-router";
import "./Login.css";

export default function Home() {
  const history = useHistory();
  return (
    <div className="root">
      <Typography variant="h4">Welcome to the Home page</Typography>
      <div className={"buttons"}>
        <Fab
          color="primary"
          type="submit" 
          variant="extended"
          onClick={() => history.push("/login")}
        >
          Login
        </Fab>
        <Fab
          color="secondary"
          variant="extended"
          onClick={() => history.push("/signup")}
        >
          Signup
        </Fab>
      </div>
    </div>
  );
}
