var express = require('express');
var router = express.Router();
var csrf = require('csurf');
const passport = require('passport');


var csrfProtection = csrf()
router.use(csrfProtection)


router.get('/signup', (req, res, next) => {
    var messages = req.flash('error')
    res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });

})

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}))

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}))

router.get('/signin', (req, res, next) => {
    var messages = req.flash('error')
    res.render('user/signin', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });

})

router.get('/profile', (req, res, next) => {
    res.render('user/profile', { sessions: req.sessionID });

})

router.get('/logout', (req, res, next) => {
    req.logOut()
    res.redirect('/')
})

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/')
    }
}