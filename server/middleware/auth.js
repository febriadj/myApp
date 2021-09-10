const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    // Kondisi jika server tidak menemukan Token pada Header
    if (!header) {
      const newErr = {
        message: 'Access to this route is not allowed, this route requires a token in the header',
      }
      throw newErr;
    }

    const token = header.split(' ')[1];
    const admin = await jwt.verify(token, process.env.PRIVATE_KEY);
    // Menyimpan data admin kedalam Request Object
    req.admin = admin;
    next();
  }
  catch (error0) {
    const { message } = error0;

    res.status(401).json({
      status: 'failed', message,
    });
  }
}
