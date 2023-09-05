const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
// Always require and configure near the top
require('dotenv').config();
// Connect to the database
require('./config/database');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

const port = process.env.PORT || 3001;

// Put API routes here, before the "catch all" route
app.use(require('./config/checkToken'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/journal', require('./routes/api/journal'));



// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX/API requests

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.connect(process.env.DATABASE_URL).then(
  () => {
    app.listen(port, function () {
      console.log(`Express app running on port ${port}`);
    });
  }
)


