const { Router } = require('express');
const router = Router();
const {UserLogout, AuthUser, AuthRole, getUser, UserLogIn, UserSignUp, getData} = require('../controller/controller');
router.get('/get',AuthUser, getUser);
router.post('/add', UserSignUp);
router.post('/login', UserLogIn);
router.get('/data', AuthUser, AuthRole, getData)
router.get('/logout', AuthUser, AuthRole, UserLogout)

module.exports = router;