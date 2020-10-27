const express = require('express')
const app = express()
const port = 3000

let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let time = hours + ":" + minutes;
let data, error;
//Pre-step12
/*
const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]*/

//Step12 stuff
/***************************************************************************************/
//Calling mongoose
const mongoose = require('mongoose');
///////////////////////////////////////
//Schema of movies
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
//////////////////////////////////////////////////
//connecting to database
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
/***************************************************************************************/
//step13
const users = [
  { username: 'Manal1', password: 1234 },
  { username: 'Manal2', password: 2341 },
  { username: 'Manal3', password: 3412 },
  { username: 'Manal4', password: 4123 },
]
/***************************************************************************************/
//General Stuff
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

/***************************************************************************************/
//Users Stuff
//Create
app.post('/users/add', (req, res) => {
  if(req.query.username == null || req.query.password == null || req.query.password/1000 <1){
    res.status(403).send("you cannot create a user without providing a username and a minimum 4 character password").end();
    error= true;
    console.error(`error: ${error}`);
  }else{
  users.push();
  users[users.length-1].username = req.query.username;
  users[users.length-1].password = req.query.password;
  res.send(users); 
  }
  });
////////////////////////////////////////////////////////
//Read
app.get('/users/read', (req, res) => {
  res.status(200).send(users);
});
///////////////////////////////////////////////////////
//Update
app.put('/users/update/:id', (req, res) => {
  if(req.params.id < users.length){
    if(req.query.username!=null){
      users[req.params.id].username = req.query.username;
    }
    if(req.query.password!=null){
      users[req.params.id].password = req.query.password;
    }
    res.send(users);
    }
    else{
      res.status(404).send(`the user ${req.params.id} does not exist`);
      error= true;
      console.error(`error: ${error}`);
    }
});
/////////////////////////////////////////////////////////////////
//Delete
app.delete('/users/delete/:id', (req, res) => {
  if(req.params.id < users.length){
    users.splice(req.params.id,1);
    res.send(users);
  }else{
      res.status(404).send(`the user ${req.params.id} does not exist`);
      error= true;
      console.error(`error: ${error}`);
    }
});  
/***************************************************************************************/
//Movies stuff

//Create
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
///////////////////////////////////////////////////////////
//Read
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
//Read by date
app.get('/movies/read/by-date', (req, res) => {
/*  res.status(200).send(movies.sort((a, b) => b.year - a.year));
  data = movies.sort((a, b) => b.year - a.year);*/
  //step12
  Movie.find().sort({ year: 'asc' }).exec(function(err, result) { 
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(result);
    }
   });
});
//Read by rating
app.get('/movies/read/by-rating', (req, res) => {
 /* res.status(200).send(movies.sort((a, b) => b.rating - a.rating));
  data = movies.sort((a, b) => b.rating - a.rating);*/
  //step12
  Movie.find().sort({ rating: 'asc' }).exec(function(err, result) { 
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(result);
    }
   });
});
//Read by title
app.get('/movies/read/by-title', (req, res) => {
/*  res.status(200).send(movies.sort((a, b) => a.title.localeCompare(b.title)));
  data = movies.sort((a, b) => a.title.localeCompare(b.title));*/
  //step12
  Movie.find().sort({ title: 'asc' }).exec(function(err, result) { 
    if (err) {
      res.send(err);
    } else {
      res.status(200).send(result);
    }
   });
});
//Read by id
app.get('/movies/read/id/:id', (req, res) => {
/*  if(req.params.id < movies.length){
  res.status(200).send(movies[req.params.id]);
  data = movies;
  }else{
    res.status(404).send(`the movie ${req.params.id} does not exist`);
    error= true;
    console.error(`error: ${error}`);
  }*/
  //step12
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
////////////////////////////////////////////////////////////
//Update
app.put('/movies/update/:id', (req, res) => {
  /*  if(req.params.id < movies.length){*/
  Movie.exists({ _id: req.params.id },(error,result)=>{
    if (error){
      res.status(404).send(`the movie ${req.params.id} does not exist`);
      /*error= true;
      console.error(`error: ${error}`);*/
      //step13-authentication
    }else if(req.query.username== null || req.query.username == "" || req.query.password== null || req.query.password == "" ){
      res.status(404).send(`please provide a username and password`);
    }else if(users.some(user => 
      (user.username == req.query.username && user.password == req.query.password))== false){
      res.status(404).send(`please provide correct credentials`);
    }else{
      if(req.query.title!=null){
        /*movies[req.params.id].title = req.query.title;*/
        //step12
        Movie.findOneAndUpdate({_id: req.params.id}, {title: req.query.title},(error,result)=>{
          if (error){
            res.status(404).send(error);
        }
      });
      }
      if(req.query.rating!=null){
        /*movies[req.params.id].rating = req.query.rating;*/
        //step12
        Movie.findOneAndUpdate({_id: req.params.id}, {rating: req.query.rating}, {title: req.query.title},(error,result)=>{
          if (error){
            res.status(404).send(error);
        }
      });
      }
      if(req.query.year!=null){
        /*movies[req.params.id].year = req.query.year;*/
        //step12
        Movie.findOneAndUpdate({_id: req.params.id}, {year: req.query.year}, {title: req.query.title},(error,result)=>{
          if (error){
            res.status(404).send(error);
        }
      });
      }
      /*res.send(movies);
      data = movies;*/
      //step12
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
//////////////////////////////////////////////////////////
//Delete
app.delete('/movies/delete/:id', (req, res) => {
/*  if(req.params.id < movies.length){
    movies.splice(req.params.id,1);
    res.send(movies);
    data = movies;*/
    //step12
    Movie.exists({ _id: req.params.id },(error,result)=>{
    if (error){
      res.status(404).send(`the movie ${req.params.id} does not exist`);
      /*error= true;
      console.error(`error: ${error}`);*/
    }
    else{
      //step12
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
/***************************************************************************************/
//Connecting to port
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});