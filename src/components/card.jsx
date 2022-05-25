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
    width: 300,
    minWidth: 256,
    marginTop: 10
  },
  media: {
    height: 194,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  let class_id = props.classId;

  return (
      <Card className={classes.root} variant="outlined shadow rounded-lg" >
        {
        <Link
            to={
              { pathname: props.pathname ?? `/class-details/${class_id}` }
            }
            state ={{data: props.state, role: props.role}}
        >
          <CardActionArea>
            <CardMedia
                className={classes.media}
                image={props.image}
                title={props.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                {props.classname}
              </Typography>
              <Typography gutterBottom variant="subtitle2" component="p">
                {props.classdetails}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>}
      </Card>
  );
}
