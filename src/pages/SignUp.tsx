import {
  CircularProgress,
  Fab,
  TextField,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React, { useContext, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import { errorMessage, signup } from "../common/auth";
import LoadingSpinner from "../components/LoadingSpinner";
import { UserContext } from "../hooks/UserProvider";
import { IMessage, Status } from "../models/Status";
import ErrorMessage from "../components/ErrorMessage";
import "./Login.css";

interface ISignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<ISignUpForm>();
  const [message, setMessage] = useState<IMessage>({status: Status.NonStarted, message: ""});
  const history = useHistory();
  const onSubmit = async (data: ISignUpForm) => {
    setMessage({status: Status.Loading, message: ""});
    const message = await signup(data.firstName, data.lastName, data.email, data.password);
    setMessage(message);
    if(message.status === Status.Success) {
        reset();
        history.push("/");
    }
  };
  return (
    <>
      <div className="root">
        {message.status === Status.Loading && <LoadingSpinner />}
        <Typography variant="h4">Welcome to the Sign up page</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="signUpForm form">
          <TextField
            error={errors.firstName ? true : false}
            helperText={errorMessage(errors.firstName?.type)}
            className={"textField"}
            required
            id="outlined-required"
            label="First name"
            variant="outlined"
            {...register("firstName", {
              required: true,
              minLength: 4,
              maxLength: 80,
            })}
          />
          <TextField
            error={errors.lastName ? true : false}
            helperText={errorMessage(errors.lastName?.type)}
            className={"textField"}
            required
            id="outlined-required"
            label="Last name"
            variant="outlined"
            {...register("lastName", {
              required: true,
              minLength: 4,
              maxLength: 80,
            })}
          />
          <TextField
            error={errors.email ? true : false}
            helperText={errorMessage(errors.email?.type)}
            className={"textField"}
            required
            id="outlined-required"
            label="Email address"
            variant="outlined"
            type="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          <TextField
            error={errors.password ? true : false}
            helperText={errorMessage(errors.password?.type)}
            className={"textField"}
            required
            id="outlined-required"
            label="Password"
            variant="outlined"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 80,
            })}
            type="password"
          />
          {message.status === Status.Failed && message.message && <ErrorMessage message={message.message}/>}
          <div className={"buttons"}>
            <Fab color="primary" type="submit" variant="extended">
              SignUp
            </Fab>
            <Fab
              color="secondary"
              variant="extended"
              onClick={() => history.push("/login")}
            >
              Login
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
    </>
  );
}