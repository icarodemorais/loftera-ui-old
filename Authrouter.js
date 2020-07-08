var express = require('express');
var Authrouter = express.Router();
var RegisterController = require('./controllers/RegisterController');
var AuthController = require('./controllers/AuthController');
var ReplyController = require('./controllers/ReplyController');
var multer = require('multer');
var multerConfig = require('./config/multer');
var passport = require('passport');
var flash = require('connect-flash');
var { ensureAuthenticated, forwardAuthenticated } = require('./controllers/AuthController')

//Authentications all TABs.
Authrouter.get('/pages-login', function (req, res) {
      const error_msg = req.flash('error');
      res.locals = { title: 'Login', error_msg };
      res.render('Auth/login');
});

Authrouter.get('/pages-register', function (req, res) {
      res.locals = { title: 'Register' };
      res.render('Auth/register');
});

Authrouter.post('/register', RegisterController.store);

Authrouter.post('/auth', (req, res, next) => {

      const handler = passport.authenticate('local', {
            successRedirect: '/realestate',
            failureRedirect: '/pages-login',
            failureFlash: true
      });
      handler(req, res, next);
});

Authrouter.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/pages-login');
});

Authrouter.post('/Replies', ReplyController.store);

Authrouter.get('/Replies/Candidate', ReplyController.findAllByCandidateId)

Authrouter.get('/pages-lock-screen', function (req, res) {
      res.locals = { title: 'Lock Screen' };
      res.render('Auth/pages_lock_screen');
});
Authrouter.get('/pages-recoverpw', function (req, res) {
      res.locals = { title: 'Password Recovery' };
      res.render('Auth/pages_recoverpw');
});
Authrouter.get('/pages-404', function (req, res) {
      res.locals = { title: '404 Page Error' };
      res.render('Auth/pages_404');
});
Authrouter.get('/pages-500', function (req, res) {
      res.locals = { title: '500 Page Error' };
      res.render('Auth/pages_500');
});

module.exports = Authrouter;