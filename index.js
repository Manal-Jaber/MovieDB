const express = require('express')
const app = express()
const port = 3000
let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let time = hours + ":" + minutes;
app.get('/', (req, res) => res.send('ok'))

app.get('/test', (req, res) => res.status(200).send('ok'))

app.get('/time', (req, res) => res.status(200).send(`${time}`))

app.listen(port)
