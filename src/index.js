const express = require('express');
const morgan = require('morgan');
const handlebars = require("express-handlebars");
const methodOverride = require('method-override')
const path = require("path");
const route = require('./routes');
const db = require('./config/db');

db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(methodOverride('_method'))

app.engine("hbs", handlebars.engine({
  extname:".hbs",
  helpers: {
    sum: (a, b) => a + b,
}
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'))

app.use(morgan('combined'));

//route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});