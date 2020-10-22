const express = require('express')
const app = express()
const port = 3000

let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let time = hours + ":" + minutes;
let data, error;

const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]

app.get('/', (req, res) => res.send('ok'))

app.get('/test', (req, res) => res.status(200).send('ok'))

app.get('/time', (req, res) => res.status(200).send(`${time}`))

app.get('/hello/:id', (req, res) => res.status(200).send('Hello,'+ " "+ req.params.id))

app.get('/search', (req, res) => {
if(req.query.s != null){
res.status(200).send("ok data: " + req.query.s);
data = req.query.s;
}else{
  res.status(500).send("you have to provide a search").end();
  error= true;
  console.error(`error: ${error}`);
}
});

app.get('/movies/add', (req, res) => {
  if(req.query.title == null || req.query.year == null || req.query.year/1000 <1 ||isNaN(req.query.year)){
    res.status(403).send("you cannot create a movie without providing a title and a year").end();
    error= true;
    console.error(`error: ${error}`);
  }else if(req.query.rating == null || req.query.rating == ""){
    movies.push();
    movies[movies.length-1].title = req.query.title;
    movies[movies.length-1].year = req.query.year;
    movies[movies.length-1].rating = 4;
    res.send(movies);
    data = movies;
  }else{
  movies.push();
  movies[movies.length-1].title = req.query.title;
  movies[movies.length-1].year = req.query.year;
  movies[movies.length-1].rating = req.query.rating;
  res.send(movies);
  data = movies;
  }
  });

app.get('/movies/read', (req, res) => {
  res.status(200).send(movies);
  data = movies;
});

app.get('/movies/read/by-date', (req, res) => {
  res.status(200).send(movies.sort((a, b) => b.year - a.year));
  data = movies.sort((a, b) => b.year - a.year);
});

app.get('/movies/read/by-rating', (req, res) => {
  res.status(200).send(movies.sort((a, b) => b.rating - a.rating));
  data = movies.sort((a, b) => b.rating - a.rating);
});

app.get('/movies/read/by-title', (req, res) => {
  res.status(200).send(movies.sort((a, b) => a.title.localeCompare(b.title)));
  data = movies.sort((a, b) => a.title.localeCompare(b.title));
});

app.get('/movies/read/id/:id', (req, res) => {
  if(req.params.id < movies.length){
  res.status(200).send(movies[req.params.id]);
  data = movies;
  }else{
    res.status(404).send(`the movie ${req.params.id} does not exist`);
    error= true;
    console.error(`error: ${error}`);
  }
});

app.get('/movies/update/:id', (req, res) => {
  if(req.params.id < movies.length){
    if(req.query.title!=null){
      movies[req.params.id].title = req.query.title;
    }
    if(req.query.rating!=null){
      movies[req.params.id].rating = req.query.rating;
    }
    if(req.query.year!=null){
      movies[req.params.id].year = req.query.year;
    }
    res.send(movies);
    data = movies;
  }else{
    res.status(404).send(`the movie ${req.params.id} does not exist`);
    error= true;
    console.error(`error: ${error}`);
  }
});

app.get('/movies/delete/:id', (req, res) => {
  if(req.params.id < movies.length){
    movies.splice(req.params.id,1);
    res.send(movies);
    data = movies;
  }else{
    res.status(404).send(`the movie ${req.params.id} does not exist`);
    error= true;
    console.error(`error: ${error}`);
  }
});

app.listen(port)
