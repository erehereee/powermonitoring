const { Router } = require('express');
const router = Router();
const {UserLogout, AuthUser, AuthRole, UserLogIn, UserSignUp, getData} = require('../controller/controller');
router.get('/get',AuthUser);
router.post('/add', UserSignUp);
router.post('/login', UserLogIn)
router.get('/data', AuthUser, AuthRole("ADMIN"), getData)
router.get('/logout', UserLogout)

module.exports = router;