const { Schema, model } = require('mongoose');

const AdminSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
});

const AdminModel = model('admins', AdminSchema);
module.exports = AdminModel;
