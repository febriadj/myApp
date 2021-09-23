const app = require('./app');
const ngrokConnection = require('./ngrok');

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === 'development') {
  ngrokConnection(port);
}

app.listen(port, () => {
  console.log(`[${port}] Server Listening...`);
});
