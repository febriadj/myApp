const bcrypt = require('bcryptjs');
const fs = require('fs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const AdminModel = require('../models/admin.model');

exports.AdminDataInSession = async (req, res) => {
  try {
    const data = await AdminModel.findOne({ _id: req.admin.id });

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

exports.AdminTokenInSession = (req, res) => {
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

    if (!/^[a-z0-9-_]{5,16}$/g.test(req.body.username)) {
      const newErr = {
        message: 'Invalid Username. You can use a-z, 0-9 and hyphens. 5-16 characters long',
      }
      throw newErr;
    }

    const AdminExists = await AdminModel.findOne({
      $or: [
        {
          username: {
            $regex: new RegExp(req.body.username),
            $options: 'i',
          },
        },
        { email: req.body.email },
      ],
    });
    // Kondisi saat identitas pengguna sudah dipakai
    if (AdminExists) {
      const newErr = {
        message: 'Opss. Username or Email already used by someone else',
      }
      throw newErr;
    }

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
    const { message } = error0;

    res.status(200).json({
      status: 'failed', message,
    });
  }
}

exports.AccAdminRegister = async (req, res) => {
  try {
    // Mengambil data Registrasi dari Session
    const { username, email, password } = req.session.regisData;
    const { clientRegisCode } = req.body;

    // Kondisi saat registrasi code tidak sesuai
    if (req.session.regisData.regisCode !== Number(clientRegisCode)) {
      const newErr = {
        message: 'Your registration code is wrong',
      }
      throw newErr;
    }

    // Kondisi saat permission code tidak sesuai
    if (req.body.permissionCode !== process.env.REGIS_PERMISS_CODE) {
      const newErr = {
        message: 'Permission code does not match',
      }
      throw newErr;
    }

    const Admin = new AdminModel({
      username,
      email,
      // Enkripsi Password
      password: bcrypt.hashSync(password, 8),
    });

    const data = await Admin.save();
    // Jika berhasil, hapus properti regisData pada Object session
    delete req.session.regisData;

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
        message: 'I can\'t find a suitable user, please double check your Username or Email',
      }
      throw newErr;
    }

    // Membandingkan Password
    if (!bcrypt.compareSync(req.body.password, data.password)) {
      const newErr = {
        message: 'User password does not match',
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

exports.AdminLogout = async (req, res) => {
  try {
    // Rute terkunci, perlu autentikasi token JWT
    if ('admin' in req === false) {
      const newErr = {
        httpStatusCode: 401,
        message: 'This route is locked',
      }
      throw newErr;
    }
    // Hapus data Admin di Session
    delete req.session.admin;

    res.status(200).json({
      status: 'success',
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
