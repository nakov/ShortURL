const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'))
app.set('view engine', 'pug');

const data = require("./data/app-data");
data.seedSampleData();

const mvcController = require("./controllers/mvc-controller");
mvcController.setup(app, data);

const apiController = require("./controllers/api-controller");
apiController.setup(app, data);

app.listen(8080)
.on('error', function(err) {
  if (err.errno === 'EADDRINUSE')
     console.error("Port 8080 busy (server already started).");
  else 
    throw err;
});
