const bcrypt = require('bcryptjs');
const AdminModel = require('../models/admin.model');

exports.AdminRegister = async (req, res) => {
  try {
    const Admin = new AdminModel({
      username: req.body.username,
      email: req.body.email,
      // Enkripsi password
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const data = await Admin.save();
    // Mengembalikan data register ke client
    res.status(200).json({
      status: 'success', data,
    });
  }
  catch (error0) {
    const { message } = error0;

    res.status(400).json({
      status: 'failed', message,
    });
  }
}

exports.AdminLogin = async (req, res) => {
  try {
    const data = await AdminModel.findOne({
      $or: [
        { username: req.body.nameOrEmail },
        { email: req.body.nameOrEmail },
      ],
    });

    // Compare Password
    if (!bcrypt.compareSync(req.body.password, data.password)) {
      const newErr = {
        message: 'password does not match',
      }
      throw newErr;
    }

    res.status(200).json({
      status: 'success', data,
    });
  }
  catch (error0) {
    const { message } = error0;

    res.status(400).json({
      status: 'failed', message,
    });
  }
}
