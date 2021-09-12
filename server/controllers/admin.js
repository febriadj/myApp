const bcrypt = require('bcryptjs');
const fs = require('fs');
const nodemailer = require('nodemailer');
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
    // Membuat Kode acak untuk dijadikan kode Registrasi
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    req.body.regisCode = randomCode;

    // Inisialisasi Transporter Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'iamfebriadji@gmail.com',
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const emailContent = fs.readFileSync(`${__dirname}/../public/txt/emailverif.txt`, 'utf8');
    // Send Mail
    const data = await transporter.sendMail({
      from: 'iamfebriadji@gmail.com',
      to: req.body.email,
      subject: 'Verify Your Email Address ~ Mr. Febx',
      text: emailContent.replace(/%RegisCode%/g, req.body.regisCode),
    });

    req.session.regisData = req.body;
    // Mengembalikan data register ke Client
    res.status(200).json({
      status: 'success', data,
    });
  }
  catch (error0) {
    res.status(200).json({
      status: 'success', message: error0,
    });
  }
}

exports.AccAdminRegister = async (req, res) => {
  try {
    // Mengambil data Registrasi dari Session
    const { username, email, password } = req.session.regisData;
    const { clientRegisCode } = req.body;

    if (req.session.regisData.regisCode !== clientRegisCode) {
      const newErr = {
        message: 'your registration code is wrong',
      }
      throw newErr;
    }
    // Jika berhasil, hapus properti regisData pada Object session
    delete req.session.regisData;

    const Admin = new AdminModel({
      username,
      email,
      // Enkripsi Password
      password: bcrypt.hashSync(password, 8),
    });

    const data = await Admin.save();
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
