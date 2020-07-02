var passport = require('passport')
var User = require('../models/user')
var localStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'passwd',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return done(err)
        }
        if (user) {
            return done(null, false, { message: 'Email ALready Exists!' })
        }
        var newUser = new User()
        newUser.email = email
        newUser.firstName = req.body.firstname
        newUser.lastName = req.body.lastname
        newUser.phone = req.body.phone
        newUser.invitEmail = req.body.imail
        newUser.password = newUser.encryptPassword(password)
        console.log(newUser);

        newUser.save((err, result) => {
            if (err) {
                return done(err)
            }
            return done(null, result)
        })
    })
}))


passport.use('local.signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return done(err)
        } else {
            if (user) {
                var valid = user.comparePassword(password, user.password)
                if (valid) {
                    return done(null, user)
                } else {
                    return done(null, false, { message: 'Password is Wrong' })
                }
            } else {
                return done(null, false, { message: 'Email is not Registered!!!' })
            }
        }
    })
}))