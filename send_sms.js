// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = "AC5cda2dfbfd1bda4ca2ce3f09134a6ce8";
const authToken ="731cc3b4f062e9a5120ec1c5d352bce8";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'lol?',
     from: '+12722043385',
     to: '+18573409610'
   })
  .then(message => console.log(message));
