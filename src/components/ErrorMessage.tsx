import {
    CircularProgress,
    createStyles,
    makeStyles,
    Theme,
    Typography,
  } from "@material-ui/core";
  import React from "react";
import { IMessage } from "../models/Status";
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      message: {
        color: "red"
      },
    })
  );

  interface IErrorMessageProps {
      message: string
  }
  
  export default function ErrorMessage(props: IErrorMessageProps) {
    const classes = useStyles();
    return (
        <Typography variant="h5" className={classes.message}>{props.message}</Typography>
    );
  }
  