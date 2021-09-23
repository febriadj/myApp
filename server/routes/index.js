const router = require('express').Router();
const authenticate = require('../middleware/auth');

const {
  AdminDataInSession,
  AdminTokenInSession,
  AdminRegister,
  AccAdminRegister,
  AdminLogin,
  AdminDelete,
  AdminLogout,
} = require('../controllers/admin');

const {
  CreateArticle,
  GetArticles,
  DeleteArticle,
} = require('../controllers/articles');

router.get('/admin', authenticate, AdminDataInSession);
router.get('/admin/session', AdminTokenInSession);
router.get('/admin/logout', authenticate, AdminLogout);
router.post('/admin/register', AdminRegister);
router.post('/admin/register/accept', AccAdminRegister);
router.post('/admin/login', AdminLogin);
router.delete('/admin/delete', AdminDelete);

router.get('/articles', GetArticles);
router.post('/articles', authenticate, CreateArticle);
router.delete('/articles', authenticate, DeleteArticle);

module.exports = router;
