const ngrok = require('ngrok');

module.exports = async (port) => {
  try {
    const url = await ngrok.connect({
      authtoken: process.env.NGROK_AUTH_TOKEN,
      addr: port,
      proto: 'http',
    });

    console.log(`Ngrok Tunnel: ${url}`);
    return url;
  }
  catch (error0) {
    console.error(error0.message);
    return process.exit(1);
  }
}
