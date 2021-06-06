import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { IRestaurant } from "../reducer/hotel";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

interface IHotelProps {
    cuisines: string;
    featured_image: string;
    name: string;
}

export default function Hotel(props: IHotelProps) {
  const classes = useStyles();
  if(props.cuisines && props.featured_image && props.name) {
    return (
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={props.featured_image}
              title={props.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.cuisines}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
  }  
  return null;
}
