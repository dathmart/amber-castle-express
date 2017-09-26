'use strict';
var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes'),
    tarotRoutes = require('./routes/tarots');


app.use(mainRoutes);
app.use('/tarots', tarotRoutes);

app.use((req, res, next) => {
    const err = new Error('Transmission error');
    err.status = 500;
    next();
});

app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next();
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(500);
    res.render('error');
});

let port = process.env.PORT || 3003;

app.listen(port, () => {
    console.log("Express server is listening on port", port);
});