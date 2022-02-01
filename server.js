// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const subscribersRouter = require('./routes/subscribers')
require('dotenv').config();
const cors = require('cors')
const DBURL = process.env.DBURL

const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true 
}

mongoose.connect(DBURL, connectionParams)
  .then(() => {
    console.log("connected to db")
  }).catch((err) => {
    console.log(`${err}`)
  })

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

app.use('/subscribers', subscribersRouter)

app.post('/Number', (req, res) => {
    resbody = req.body.Body.split(',')
    console.log('Got body:', req.body.Body);
    res.sendStatus(200);
    console.log(resbody)
});

app.use('/Test', (req, res) => {
  res.send({
      token: 'Server online'
  });
});

app.listen(process.env.PORT || 4000, () => console.log(`Started server`));