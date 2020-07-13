require('dotenv').config()

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
