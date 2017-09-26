const express = require('express'),
    router = express.Router(),
    { data } = require('../data/tarotCardData.json'),
    { tarots } = data;

router.get('/', (req, res) => {
    const wildCard = Math.floor(Math.random() * tarots.length);
    return res.redirect(`/tarots/${wildCard}`);
});

router.get('/:id', (req, res) => {
    const { side } = req.query,
        { id } = req.params,
        text = tarots[id][side],
        { hint } = tarots[id],
        name = req.cookies.username;

    if (!side) {
        res.redirect(`/tarots/${id}?side=question`);
    }

    const templateData = { id, text, name };

    if (side === 'question') {
        templateData.hint = hint;
        templateData.sideShown = 'answer';
        templateData.showSide = 'Answer';
    } else if (side === 'answer') {
        templateData.sideShown = 'question';
        templateData.showSide = 'Question';
    }

    res.render('tarot', templateData);
});

module.exports = router;