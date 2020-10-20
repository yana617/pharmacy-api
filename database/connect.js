const mongoose = require('mongoose');
const chalk = require('chalk');

const {
  DATABASE_NAME,
  DATABASE_CONNECTING_STRING,
} = process.env;

mongoose.connect(`${DATABASE_CONNECTING_STRING}/${DATABASE_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}, (err) => {
  if(err) {
    console.log(chalk.bold.red(`[*] Error during connecting to database ${DATABASE_NAME}, error:`, err.message));
    return;
  }
  console.log(chalk.bold.green(`[*] Connected to database ${DATABASE_NAME}`));
});
