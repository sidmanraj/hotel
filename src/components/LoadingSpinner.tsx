import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingSpinner: {
      display: "flex",
      alignItems: "center",
      height: "100%",
      justifyContent: "center",
      position: "fixed",
      left: "0",
      top: "0",
      width: "100%",
      zIndex: 9999,
    },
  })
);

export default function LoadingSpinner() {
  const classes = useStyles();
  return (
    <div className={classes.loadingSpinner}>
      <CircularProgress />
    </div>
  );
}
