const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminModel = require('../models/admin.model');

exports.AdminSession = (req, res) => {
  res.status(200).json({
    status: 'success',
    // Mengirim data session ke client
    data: req.session,
  });
}

exports.AdminRegister = async (req, res) => {
  try {
    const Admin = new AdminModel({
      username: req.body.username,
      email: req.body.email,
      // Enkripsi Password
      password: bcrypt.hashSync(req.body.password, 8),
    });

    const data = await Admin.save();
    // Mengembalikan data register ke Client
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

    // Kondisi jika username atau email user tidak ditemukan
    if (!data) {
      const newErr = {
        message: 'user not found',
      }
      throw newErr;
    }

    // Membandingkan Password
    if (!bcrypt.compareSync(req.body.password, data.password)) {
      const newErr = {
        message: 'password does not match',
      }
      throw newErr;
    }

    // Membuat Token
    const token = await jwt.sign({ id: data._id }, process.env.PRIVATE_KEY);
    // Menyimpan Token kedalam Session
    req.session.admin = token;

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

exports.AdminDelete = async (req, res) => {
  try {
    // Menghapus dokumen berdasarkan id
    const data = await AdminModel.findOneAndDelete({ _id: req.query.id });

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
