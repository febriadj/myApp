const router = require('express').Router();
const authenticate = require('../middleware/auth');

const {
  AdminSession,
  AdminRegister,
  AccAdminRegister,
  AdminLogin,
  AdminDelete,
} = require('../controllers/admin');

const {
  CreateArticle,
  GetArticles,
  GetArticleByUrl,
  DeleteArticle,
} = require('../controllers/articles');

router.get('/admin/session', AdminSession);
router.post('/admin/register', AdminRegister);
router.post('/admin/register/accept', AccAdminRegister);
router.post('/admin/login', AdminLogin);
router.delete('/admin/delete', AdminDelete);

router.get('/articles', GetArticles);
router.get('/articles/:url', GetArticleByUrl);
router.post('/articles', authenticate, CreateArticle);
router.delete('/articles', authenticate, DeleteArticle);

module.exports = router;
