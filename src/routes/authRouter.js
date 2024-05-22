const express = require('express');
const passport = require('passport');
const router = express.Router();

require('../auth/google')
require('../auth/discord')
module.exports = router;
router.use(passport.session())
// router.use(passport.initialize())

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/mew', successRedirect: '/' }))

router.get('/discord', passport.authenticate('discord'));
router.get('/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/mew',
    successRedirect: '/'
}))