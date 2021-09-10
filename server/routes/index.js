const router = require('express').Router();
const { AdminRegister, AdminLogin } = require('../controllers/admin');

router.post('/register', AdminRegister);
router.post('/login', AdminLogin);

module.exports = router;
