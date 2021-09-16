const { Schema, model } = require('mongoose');

const ArticleSchema = new Schema({
  author: {
    type: Schema.Types.String,
    required: true,
  },
  title: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  url: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  filename: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  tags: {
    type: Schema.Types.Array,
  },
}, {
  timestamps: true,
});

const ArticleModel = model('articles', ArticleSchema);
module.exports = ArticleModel;
