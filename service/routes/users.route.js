const router = require('express').Router();

const user_controller = require('../controllers/user.controller');

router.get('/is-authenticated', user_controller.user_is_authenticated);

router.get('/all', user_controller.user_all);

router.post('/post', user_controller.user_add);


module.exports = router;