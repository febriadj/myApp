const crypto = require('crypto');
const fs = require('fs');
const mv = require('mv');
const { IncomingForm } = require('formidable');
const ArticleModel = require('../models/article.model');
const AdminModel = require('../models/admin.model');

exports.CreateArticle = (req, res) => {
  const form = new IncomingForm();
  // Simpan ke Database
  async function handleUpload(fields, url, filename) {
    // Mengambil username berdasarkan id
    const findAdmin = await AdminModel.findOne({ _id: req.admin.id });

    const Article = await ArticleModel({
      author: findAdmin.username,
      title: fields.title,
      description: fields.description,
      url: url.toLowerCase(),
      // filename diisi dengan title yang sedikit dimanipulasi
      filename,
      tags: fields.tags.toLowerCase().split(/[\s,]/g),
    });

    return Article.save();
  }

  form.parse(req, async (error1, fields, files) => {
    try {
      // Rute terkunci, perlu autentikasi token JWT
      if ('admin' in req === false) {
        const newErr = {
          httpStatusCode: 401,
          message: 'This route is locked',
        }
        throw newErr;
      }

      // Penanganan error formidable
      if (error1) throw error1;

      // Tanda atau karakter penghubung
      const url = fields.title.split(/[\s_.]/g).join('-');
      const filename = `${crypto.randomBytes(16).toString('hex')}.md`;

      // Kirim file ke folder uploads/
      mv(files.fileContent.path, `${__dirname}/../../uploads/${filename}`, { mkdirp: true }, async (error2) => {
        try {
          if (error2) throw error2;
          const data = await handleUpload(fields, url, filename);

          res.status(200).json({
            status: 'success', data,
          });
        }
        // Penanganan error MV
        catch (error3) {
          const { httpStatusCode, message } = error3;

          res.status(httpStatusCode || 400).json({
            status: 'failed', message,
          });
        }
      });
    }
    // Penanganan error formidable
    catch (error0) {
      const { httpStatusCode, message } = error0;

      res.status(httpStatusCode || 400).json({
        status: 'failed', message,
      });
    }
  });
}

exports.GetArticles = async (req, res) => {
  try {
    const keys = Object.keys(req.query)[0];
    // Kondisi jika endpoint terdapat query parameter
    if (keys in req.query) {
      const dataByParams = await ArticleModel.find({
        [keys]: {
          $regex: new RegExp(Object.values(req.query)[0]),
          $options: 'gi',
        },
      });

      return res.status(200).json({
        status: 'success', data: dataByParams,
      });
    }

    const data = await ArticleModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: 'success', data,
    });
  }
  catch (error0) {
    const { message } = error0;

    return res.status(400).json({
      status: 'failed', message,
    });
  }
}

exports.DeleteArticle = async (req, res) => {
  try {
    // Rute terkunci, perlu autentikasi token JWT
    if ('admin' in req === false) {
      const newErr = {
        httpStatusCode: 401,
        message: 'This route is locked',
      }
      throw newErr;
    }

    // Menghapus dokumen berdasarkan id
    const data = await ArticleModel.findOneAndDelete({ _id: req.query.delete });

    if (!data && data === null) {
      const newErr = {
        httpStatusCode: 406,
        message: 'No matching documents',
      }
      throw newErr;
    }

    fs.unlinkSync(`${__dirname}/../../uploads/${data.filename}`);

    // Mengirim data dokumen ke client
    res.status(200).json({
      status: 'success', data,
    });
  }
  catch (error0) {
    const { httpStatusCode, message } = error0;

    res.status(httpStatusCode || 400).json({
      status: 'failed', message,
    });
  }
}
