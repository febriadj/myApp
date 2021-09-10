const { connect } = require('mongoose');

module.exports = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';

    await connect(uri);
    console.log('Mongodb Connected');
  }
  catch (error0) {
    console.error(error0.message);
    process.exit(1);
  }
}
