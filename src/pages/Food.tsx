import {
  AppBar,
  colors,
  createStyles,
  fade,
  Grid,
  InputBase,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { UserContext } from "../hooks/UserProvider";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { IHotelAction, IRoot, IStatusizedHotels } from "../reducer/hotel";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { getHotelsAction } from "../data/hotels";
import { AppState } from "../data/AppState";
import Hotel from "./Hotel";
import "./Login.css";
import LoadingSpinner from "../components/LoadingSpinner";
import { Status } from "../models/Status";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    hotels: {
        margin: "20px",
    },
    button: {
      color: "white",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    search: {
      flexGrow: 1,
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    inputRoot: {
      color: "inherit",
      width: "100%"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  })
);

export default function Food() {
  const classes = useStyles();
  const user = useContext(UserContext);
  const history = useHistory();
  const hotels: IStatusizedHotels = useSelector((state: AppState) => state.hotels);
  const [filteredHotels, setFilteredHotels] = useState<IRoot[]>(hotels.hotels);
  const dispatch: Dispatch<IHotelAction> = useDispatch();
  useEffect(() => {
    getHotelsAction(dispatch);
  }, []);
  useEffect(() => {
    setFilteredHotels(hotels.hotels);
  }, [hotels.status]);
  const filterHotels = (text: string) => {
    text = text.toLowerCase();
    const foundHotels = hotels.hotels.filter(x => x.restaurant.name.toLowerCase().includes(text));
    setFilteredHotels(foundHotels);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange= {(event) =>  filterHotels(event.target.value)}
            />
          </div>
          {user && (
            <Button
              className={classes.button}
              onClick={() => history.push("/profile/" + user.uid)}
            >
              Profile
            </Button>
          )}
          {!user && (
            <Button
              className={classes.button}
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </Button>
          )}
          {!user && (
            <Button
              className={classes.button}
              onClick={() => history.push("/login")}
            >
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {hotels.status !== Status.Success && <LoadingSpinner />}
      {hotels.status === Status.Success && renderHotels(filteredHotels, classes.hotels)}
    </div>
  );
}

function renderHotels(hotels: IRoot[], className: string) {
  if (hotels && hotels.length) {
    return (
      <Grid container justify="center" spacing={6} className={className} alignItems="stretch">
        {hotels.map((x) => renderHotel(x))}
      </Grid>
    );
  }
  return;
}

function renderHotel(hotel: IRoot) {
  return (
    <Grid key={hotel.restaurant.id} item xs={3}>
      <Hotel {...hotel.restaurant} />
    </Grid>
  );
}
