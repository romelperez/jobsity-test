const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const compression = require('compression');
const helmet = require('helmet');

const port = process.env.PORT || 2000;
const production = process.env.NODE_ENV === 'production' || process.env.HEROKU;
const server = express();

nunjucks.configure(`${process.cwd()}/server/views`, {
  autoescape: true,
  express: server,
  watch: !production,
});

server.use(morgan(':remote-addr - :method :url :status :response-time ms - :res[content-length]'));
server.use(helmet());
server.use(compression());

server.get('/api/cats', (req, res) => {
  res.json([
    {
      _id: '794bd6c1-b2da-4fcc-9a4a-24a9d983d53c',
      name: 'Device Info',
      position: 0,
    },
    {
      _id: '9bbc42a2-2986-418a-9954-5074cbd74341',
      name: 'Sensors',
      position: 1,
    },
    {
      _id: '6c6e4be9-2af7-40c8-a4cf-8376479955e7',
      name: 'Settings',
      position: 2,
    },
    {
      _id: '7642022e-72d5-46f2-a613-f1f53091f237',
      name: 'Commands',
      position: 3,
    },
    {
      _id: '1407b495-5dc6-4d61-add8-e776999cf5c0',
      name: 'Metadata',
      position: 4,
    }
  ]);
});

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
