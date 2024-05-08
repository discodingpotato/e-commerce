const express = require('express');
const router = express();

router.set('views', './src/views/admin');

router.get('/', (req, res) => {
    res.redirect(req.baseUrl + '/login');
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.get('/sample', (req, res) => {
    res.render('sample');
})

router.put('/sample', (req, res) => {
    console.log(req.body);
    res.status(204).json({message: "Sample put method"});
})
module.exports = router