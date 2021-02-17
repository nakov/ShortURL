const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.use(require('body-parser').urlencoded({extended:true}));
app.use(express.static('public'))

const urlsController = require("./controllers/controller");

let urls = require("./data/urls");

urlsController.setup(app, urls);

app.listen(8080)
.on('error', function(err) {
  if (err.errno === 'EADDRINUSE')
     console.error("Port 8080 busy (server already started).");
  else 
    throw err;
});
