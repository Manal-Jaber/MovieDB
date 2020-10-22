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

app.get('/movies/create', (req, res) => {
  res.status().send();
  data = req.params;
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

app.get('/movies/update', (req, res) => {
  res.status().send();
  data = req.params;
});

app.get('/movies/delete', (req, res) => {
  res.status().send();
  data = req.params;
});

app.listen(port)
