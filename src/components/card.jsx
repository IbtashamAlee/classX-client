import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 194,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  let class_id = props.classId;

  return (
      <Card className={classes.root} variant="outlined">
        <Link to={
          {
            pathname: `/class-details/${class_id}`,
            state: class_id
          }
        }>
          <CardActionArea>
            <CardMedia
                className={classes.media}
                image={props.image}
                title={props.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.classname}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.classdetails}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
  );
}
