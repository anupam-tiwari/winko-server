const express = require('express')
const app = express();
const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;


app.get('/', function (req, res) {
  res.send('hello world')
})

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});
app.listen(3000)