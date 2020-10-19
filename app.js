const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')(expressSession);
const passport = require('passport');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const boolParser = require('express-query-boolean');

dotenv.config();

require('./database/connect');

const app = express();

app.use(morgan(':method [:status] :url  :response-time ms'));

// const whitelist = [''];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

app.use('/static', express.static('img'));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(boolParser());
app.use(cookieParser());

// app.use(expressSession({
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     collection: 'session',
//   }),
//   secret: 'SECRET',
//   resave: false,
//   saveUninitialized: false,
//   rolling: true,
//   cookie: { secure: false, maxAge: 3 * 24 * 60 * 60 * 1000 },
// }));

app.use(passport.initialize());
app.use(passport.session());

// require('./api/passport');

app.use(require('./routes'));

const server = app.listen(process.env.PORT, () => {
  console.log(`[*] Server started on port ${server.address().port}`);
});
