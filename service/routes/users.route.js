const router = require('express').Router();
const passport = require('passport');
const user_controller = require('../controllers/user.controller');

router.get(
    '/is-authenticated', 
    passport.authenticate('jwt', { session: false}),
    user_controller.user_is_authenticated
);

router.get('/all', user_controller.user_all);

router.get('/:id', user_controller.user);

router.post('/post', user_controller.user_add);


module.exports = router;