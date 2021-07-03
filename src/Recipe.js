import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './App.css'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 325,
      margin: 20,
    },
    media: {
      height: 50,
      width: 300,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));
  



const Recipe = ({title, img, ingredients}) => { 
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    return (
        <div className='wrapper'>
            <Card className={classes.root}>
      <CardHeader
        title={title}
      />
      <CardMedia
        className={classes.media}
        image={img}
        title={title}
      />
      <CardActions disableSpacing>
          <div>Ingredients</div>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {ingredients.map((ingredient) => ( 
                  <Typography>{ingredient.text}</Typography>
               ))};
        </CardContent>
      </Collapse>
    </Card>
        </div>
    )
}

export default Recipe;