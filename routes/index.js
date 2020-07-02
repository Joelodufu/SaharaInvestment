var express = require('express');
var router = express.Router();


router.get('/', (req, res, next) => {
    res.render('index');
})

router.get('/profile', (req, res, next) => {
    res.render('user/profile');
})


module.exports = router;