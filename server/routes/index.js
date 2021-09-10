const router = require('express').Router();
const {
  AdminSession,
  AdminRegister,
  AdminLogin,
  AdminDelete,
} = require('../controllers/admin');

router.get('/admin/session', AdminSession);
router.post('/admin/register', AdminRegister);
router.post('/admin/login', AdminLogin);
router.delete('/admin/delete', AdminDelete);

module.exports = router;
