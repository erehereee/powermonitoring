const { Router } = require('express');
const router = Router();
const controller = require('../controller/controller');

router.get('/get', controller.getUser);
router.post('/add', controller.UserSignUp);
router.post('/login', controller.UserLogIn);
router.get('/data', controller.getData);

module.exports = router;