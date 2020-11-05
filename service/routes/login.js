const router = require('express').Router();
const passport = require('passport');

router.route('/login').get((req, res) => {
    res.send("Log In with Facebook");
});

router.route('/facebook').get(passport.authenticate('facebook'));

router.route('/return').get(
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    (req, res) => {
    res.redirect('/');
  });

router.route('/profile').get(
  require('connect-ensure-login').ensureLoggedIn(),
  (req, res) => {
    res.send({ user: req.user });
  });

module.exports = router;