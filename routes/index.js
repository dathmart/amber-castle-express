const express = require('express'),
    router = express.Router();


router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (!name) {
        res.redirect('/hello');
    }
    res.render('index', { name });
});

router.get('/hello', (req, res) => {
    if (req.cookies.username) {
        res.redirect('/');
    }
    res.render('hello');
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
})

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
})

router.get('/royalty', (req, res) => {
    res.render('royals', { princes, princesses });
});

module.exports = router;