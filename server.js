// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const subscribersRouter = require('./routes/subscribers')
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


app.use('/subscribers', subscribersRouter)

app.post('/Number', (req, res) => {
    console.log('Got body:', req.body.Body);
    res.sendStatus(200);
});

app.use('/Test', (req, res) => {
  res.send({
      token: 'Server online'
  });
});

app.listen(process.env.PORT || 3000, () => console.log(`Started server at http://localhost:8080!`));