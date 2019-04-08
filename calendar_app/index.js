var routes = require('./src/routes/calendarRoute');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/employees');
mongoose.connect('mongodb://localhost:27017/employees', { useNewUrlParser: true }, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) => {
  res.send(`node and express server running on port ${port}`);
  console.log(`node and express server running on port ${port}`);
});

app.listen(port, () => {
  console.log(`application is running on port ${port}`);
});
