const express = require('express')
const app = express()
const port = 3000

let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let time = hours + ":" + minutes;
let data, error;
/*
const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]*/

//step12 stuff
const mongoose = require('mongoose');

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
  try {
    mongoose.connect('mongodb+srv://Manal-Jaber:1234@cluster0.trk7h.mongodb.net/moviesdb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, async () => {
    console.log('Connected to DB')
//One time stuff
/*
      let movie = new Movie ({ title: 'Jaws', year: 1975, rating: 8 });
      let newmovie = await movie.save();

      movie = new Movie ({ title: 'Avatar', year: 2009, rating: 7.8 });
      newmovie = await movie.save();

      movie = new Movie ({ title: 'Brazil', year: 1985, rating: 8 });
      newmovie = await movie.save();

      movie = new Movie ({ title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 });
      newmovie = await movie.save();*/
    })
  } catch (error) {
    console.log(error.message)
  }

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
    /*movies.push();
    movies[movies.length-1].title = req.query.title;
    movies[movies.length-1].year = req.query.year;
    movies[movies.length-1].rating = 4;
    res.send(movies);
    data = movies;*/
    //step12
    movie = new Movie ({ title: req.query.title, year: req.query.year, rating: 4 });
    newmovie = movie.save();
  }else{
  /*movies.push();
  movies[movies.length-1].title = req.query.title;
  movies[movies.length-1].year = req.query.year;
  movies[movies.length-1].rating = req.query.rating;
  res.send(movies);
  data = movies;*/
  //step12
  movie = new Movie ({ title: req.query.title, year: req.query.year, rating: req.query.rating });
  newmovie = movie.save();
  Movie.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(result);
    }
  });
  }
  });

app.get('/movies/read', (req, res) => {
/*  res.status(200).send(movies);
  data = movies;*/
  Movie.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/movies/read/by-date', (req, res) => {
/*  res.status(200).send(movies.sort((a, b) => b.year - a.year));
  data = movies.sort((a, b) => b.year - a.year);*/
  Movie.find().sort({ year: 'asc' }).exec(function(err, result) { 
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(result);
    }
   });
});

app.get('/movies/read/by-rating', (req, res) => {
 /* res.status(200).send(movies.sort((a, b) => b.rating - a.rating));
  data = movies.sort((a, b) => b.rating - a.rating);*/
  Movie.find().sort({ rating: 'asc' }).exec(function(err, result) { 
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(result);
    }
   });
});

app.get('/movies/read/by-title', (req, res) => {
/*  res.status(200).send(movies.sort((a, b) => a.title.localeCompare(b.title)));
  data = movies.sort((a, b) => a.title.localeCompare(b.title));*/
  Movie.find().sort({ title: 'asc' }).exec(function(err, result) { 
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(result);
    }
   });
});

app.get('/movies/read/id/:id', (req, res) => {
/*  if(req.params.id < movies.length){
  res.status(200).send(movies[req.params.id]);
  data = movies;
  }else{
    res.status(404).send(`the movie ${req.params.id} does not exist`);
    error= true;
    console.error(`error: ${error}`);
  }*/
  Movie.exists({ _id: req.params.id },(error,result)=>{
    if (error){
      res.status(404).send(`the movie ${req.params.id} does not exist`);
    }else{
      Movie.findById(req.params.id).exec(function(err, result) { 
        if (err) {
          res.send(err);
        } else {
          res.status(200).send(result);
        }
      });
    }
  });
});

app.put('/movies/update/:id', (req, res) => {
  /*  if(req.params.id < movies.length){*/
  Movie.exists({ _id: req.params.id },(error,result)=>{
    if (error){
      res.status(404).send(`the movie ${req.params.id} does not exist`);
      /*error= true;
      console.error(`error: ${error}`);*/
    }
    else{
      if(req.query.title!=null){
        /*movies[req.params.id].title = req.query.title;*/
        Movie.findOneAndUpdate({_id: req.params.id}, {title: req.query.title},(error,result)=>{
          if (error){
            res.status(404).send(error);
        }
      });
      }
      if(req.query.rating!=null){
        /*movies[req.params.id].rating = req.query.rating;*/
        Movie.findOneAndUpdate({_id: req.params.id}, {rating: req.query.rating}, {title: req.query.title},(error,result)=>{
          if (error){
            res.status(404).send(error);
        }
      });
      }
      if(req.query.year!=null){
        /*movies[req.params.id].year = req.query.year;*/
        Movie.findOneAndUpdate({_id: req.params.id}, {year: req.query.year}, {title: req.query.title},(error,result)=>{
          if (error){
            res.status(404).send(error);
        }
      });
      }
      /*res.send(movies);
      data = movies;*/
      Movie.find({}, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send(result);
        }
    });
  }
});
});
app.delete('/movies/delete/:id', (req, res) => {
/*  if(req.params.id < movies.length){
    movies.splice(req.params.id,1);
    res.send(movies);
    data = movies;*/
    Movie.exists({ _id: req.params.id },(error,result)=>{
    if (error){
      res.status(404).send(`the movie ${req.params.id} does not exist`);
      /*error= true;
      console.error(`error: ${error}`);*/
    }
    else{
      Movie.findOneAndDelete({ _id: req.params.id }, function (err, small) {
        if (err) return handleError(err);
        else{
          Movie.find({}, function(err, result) {
            if (err) {
              res.send(err);
            } else {
              res.status(200).send(result);
            }
        });
        }
      });
    }
});
});
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});