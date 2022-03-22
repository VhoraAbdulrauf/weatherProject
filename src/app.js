const express = require('express');
// @@@@@ express work on top To bottom approach
const path = require('path');
const hbs = require('hbs');
const app = express(); // function call
const port = process.env.PORT || 3000;
// const port = 3000;

const static_path = path.join(__dirname, '../public');
const templates_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs'); //indicate which view engine have been used
app.set('views', templates_path); // set view folder as default
hbs.registerPartials(partials_path);
app.use(express.static(static_path));
// routing
app.get('', (req, res) => {
  // if we use node use res.end()
  res.render('index'); // when use express put res.send()
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/weather', (req, res) => {
  res.render('weather');
});
app.get('*', (req, res) => {
  res.render('404error', {
    errorMsg: 'Oops! Page Not Found',
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
