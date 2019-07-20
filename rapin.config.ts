const path = require('path')
module.exports = {
  //Database access
  db: {
    type: 'mysql',
    database: process.env.DB_DATABASE,
    hostname: process.env.DB_HOSTNAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    port: process.env.DB_PORT
  },
  //Style setting
  style: {
    engine: 'postcss'
  },
  //Template setting
  template: {
    engine: 'twig'
  },
  //Setting cache system
  cache: {
    engine: 'file',
    expire: 3600
  },
  //Setting logs
  log: {
    filename: 'error.log'
  },
  //Access to mail
  mail: {
    service: 'gmail',
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD
  },
  //List plugins
  plugins: ['plugins/testPlugin.ts', '@rapin/typeorm', '@rapin/typeorm-auth']
}
