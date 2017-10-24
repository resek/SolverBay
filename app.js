express = require('express');
app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render("index.ejs");
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// node module neurejeni files