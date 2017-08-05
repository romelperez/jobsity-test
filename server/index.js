const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const compression = require('compression');
const helmet = require('helmet');

const port = process.env.PORT || 2000;
const production = process.env.NODE_ENV === 'production';
const server = express();

nunjucks.configure(`${process.cwd()}/server/views`, {
  autoescape: true,
  express: server,
  watch: !production,
});

server.use(morgan(':remote-addr - :method :url :status :response-time ms - :res[content-length]'));
server.use(helmet());
server.use(compression());

// Public files
server.use(express.static(`${process.cwd()}/public`));

// Application
server.get('/', (req, res) => res.render('app.html'));
server.get('/*', (req, res) => res.render('app.html'));

// HTTP 404
server.use((req, res) => res.status(404).render('intern/404.html'));

// HTTP 5XX
server.use((err, req, res) => {
  console.error(err.stack);
  res.status(err.status || 500).render('intern/500.html', { content: err.stack });
});

server.listen(port, function (err) {
  if (err) throw err;
  console.log(`Server running at http://127.0.0.1:${port}`);
});
