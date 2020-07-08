const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');

module.exports = (passport) => {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        done(null, id);
    });

    passport.use(
        new LocalStrategy({
            usernameField: 'login'
        }, (email, password, done) => {
            axios({
                method: 'post',
                url: `${process.env.API_URL}/User/auth`,
                headers: {
                    email: email,
                    password: password
                }
            })
                .then((retorno) => {
                    return done(null, retorno.data.user)
                })
                .catch((retorno) => {
                    return done(null, false, { message: 'Invalid credentials' })
                })
        })
    )
}