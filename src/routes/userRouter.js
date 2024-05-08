const express = require('express');
const router = express();

// router.set('view engine', 'ejs')
router.set('views', './src/views/user');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/signin', (req, res) => {
    res.render('signin')
})

module.exports = router