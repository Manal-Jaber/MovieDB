const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose');
  try {
    mongoose.connect('mongodb+srv://Manal-Jaber:1234@cluster0.trk7h.mongodb.net/moviesdb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
      console.log('Connected to DB')
    })
  } catch (error) {
    console.log(error.message)
  }
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

let schema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    year:{
      type: Number,
      min: 1000,
      max: 9999
    },
    rating:{
      type: Number,
      min: 0,
      max: 10,
      default: 4
    }
  }
)
const Movie = mongoose.model('Movie', schema);
Movie.create({ title: 'Jaws', year: 1975, rating: 8 }, function (err, small) {
  if (err) return handleError(err);
});
Movie.create( { title: 'Avatar', year: 2009, rating: 7.8 }, function (err, small) {
  if (err) return handleError(err);
});
Movie.create( { title: 'Brazil', year: 1985, rating: 8 }, function (err, small) {
  if (err) return handleError(err);
});
Movie.create( { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }, function (err, small) {
  if (err) return handleError(err);
});

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

app.post('/movies/add', (req, res) => {
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
    //step12
    Movie.create( movies[movies.length-1], function (err, small) {
      if (err) return handleError(err);
    });
  }else{
  movies.push();
  movies[movies.length-1].title = req.query.title;
  movies[movies.length-1].year = req.query.year;
  movies[movies.length-1].rating = req.query.rating;
  res.send(movies);
  data = movies;
  //step12
  Movie.create( movies[movies.length-1], function (err, small) {
    if (err) return handleError(err);
  });
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

app.put('/movies/update/:id', (req, res) => {
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
    //step12
    Movie.updateOne( movies[req.params.id], function (err, small) {
      if (err) return handleError(err);
    });
  }else{
    res.status(404).send(`the movie ${req.params.id} does not exist`);
    error= true;
    console.error(`error: ${error}`);
  }
});

app.delete('/movies/delete/:id', (req, res) => {
  if(req.params.id < movies.length){
    movies.splice(req.params.id,1);
    res.send(movies);
    data = movies;
    //step12
    Movie.deleteOne( movies[req.params.id], function (err, small) {
      if (err) return handleError(err);
    });
  }else{
    res.status(404).send(`the movie ${req.params.id} does not exist`);
    error= true;
    console.error(`error: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});

