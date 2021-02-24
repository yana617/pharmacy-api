const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
const boolParser = require('express-query-boolean');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');
const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml'));

const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(':method [:status] :url  :response-time ms'));
}

app.use('/static', express.static('img'));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(boolParser());
app.use(cookieParser());

app.use(expressSession({
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'session',
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    secure: false,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

require('./services/passport');

app.use(require('./routes'));

module.exports = app;
