import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios'
import Recipe from './Recipe';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Grid } from '@material-ui/core';
import logo from './logo.png';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    margin: '20px auto',
    marginTop: '20px',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));




function App() {
  const classes = useStyles();
  const Api_Id = '806f3315';
  const Api_Key = 'd6670e6b984624daa77d00279f106154';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('milk');

  useEffect(() => {
    getRecipe();
  },[query]);
  

  const getRecipe = async () => {
    const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${Api_Id}&app_key=${Api_Key}`);
    setRecipes(response.data.hits);
  }
  
  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search);
  }
  return (
    <div>
     <div className='title'>
          <img src={logo} alt='logo'></img>
        <p>The best Recipes</p>
      </div>
        <Paper  
           onSubmit={updateQuery} 
           component="form" className={classes.root}>
      <InputBase 
        type='text' value={search} onChange={updateSearch}
        className={classes.input}
        placeholder="Search for Recipe"
        inputProps={{ 'aria-label': 'search for recipe' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
      <div style={{margin:'20px'}}> 
      <Grid container > 
      {recipes.map((recipe) => ( 
        <Grid  item xs={12} sm={4} md={3} style={
        {textAlign: 'center'}}> 
        
        <Recipe 
        key={recipe.recipe.label}
        title = {recipe.recipe.label}
        img = {recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}
        />
        </Grid>
        ))}
      </Grid>
      </div>
    </div>
  );
}

export default App;
