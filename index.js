const express = require('express')
const app = express()
const port = 3000

let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let time = hours + ":" + minutes;
let data, error;

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
app.listen(port)
