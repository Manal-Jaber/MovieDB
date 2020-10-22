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
  console.error(`error: ${error}`)
}
});

app.get('/movies/add', (req, res) => {
  res.status().send();
  data = req.params;
  });

app.get('/movies/get', (req, res) => {
  res.status(200).send(movies);
  data = movies;
});

app.get('/movies/edit', (req, res) => {
  res.status().send();
  data = req.params;
});

app.get('/movies/delete', (req, res) => {
  res.status().send();
  data = req.params;
});

app.listen(port)
