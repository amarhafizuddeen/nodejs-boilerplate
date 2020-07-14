require('dotenv').config()
const fs = require('fs')

const {
  ENV,
  LOCALE,
  PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_DIALECT,
  DB_HOST,
} = process.env

const appConfig = {
  ENV,
  LOCALE,
  PORT,
  PRIVATE_KEY: fs.readFileSync(__dirname + '/private.key'),
}

const dbConfig = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  dialect: DB_DIALECT,
  host: DB_HOST,
  logging: false,
}

const config = {
  ...appConfig,
  ...dbConfig,
}

module.exports = {
  local: config,
  master: config,
}
