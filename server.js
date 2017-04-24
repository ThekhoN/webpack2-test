const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'dist/app.html'));
});

app.listen(3066, function (err) {
  if(err){
    console.log('error in express server');
  }
  else {
    console.log('app listening on port 3066');
  }
});
