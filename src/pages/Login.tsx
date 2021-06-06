import {
  Button,
  ButtonGroup,
  Fab,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { errorMessage, logIn } from "../common/auth";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { IMessage, Status } from "../models/Status";
import "./Login.css";

interface IUser {
  email: string;
  password: string;
}

export default function Login() {
  const { handleSubmit, reset, register, formState: { errors } } = useForm<IUser>();
  const history = useHistory();
  const [message, setMessage] = useState<IMessage>({status: Status.NonStarted, message: ""});
  const onSubmitClick = async (data: IUser) => {
    setMessage({status: Status.Loading, message: ""});
    const message = await logIn(data.email, data.password);
    setMessage(message);
    if(message.status === Status.Success) {
        reset();
        history.push("/");
    }
  };
  return (
    <div className="root">
         {message.status === Status.Loading && <LoadingSpinner />}
        <Typography variant="h4">Welcome to the login page</Typography>
      <form onSubmit={handleSubmit(onSubmitClick)} className="form">
        <div>
          <TextField
            {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
            className={"textField"}
            required
            id="outlined-required"
            label="Email address"
            name="email"
            variant="outlined"
            type="email"
            error={errors.email ? true : false}
            helperText={errorMessage(errors.password?.type)}
          />
        </div>
        <div>
          <TextField
            {...register("password", {required: true, minLength: 6, maxLength: 80})}
            error={errors.password ? true : false}
            helperText={errorMessage(errors.password?.type)}
            className={"textField"}
            required
            id="filled-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
          />
        </div>
        {message.status === Status.Failed && message.message && <ErrorMessage message={message.message}/>}
        <div className={"buttons"}>
          <Fab color="primary" type="submit" variant="extended">
            Login
          </Fab>
          <Fab
            color="secondary"
            variant="extended"
            onClick={() => history.push("/signup")}
          >
            Signup
          </Fab>
          <Fab
            color="default"
            variant="extended"
            onClick={() => history.push("/home")}
          >
            Home
          </Fab>
        </div>
      </form>
    </div>
  );
}
