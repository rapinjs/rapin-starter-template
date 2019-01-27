const path = require('path')
module.exports = {
  //Database access
  db: {
    type: 'mysql',
    database: 'nodetest',
    hostname: 'localhost',
    password: '',
    username: 'root',
    port: '3306',
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
    expire: 3600,
  },
  //Setting logs
  log: {
    filename: 'error.log'
  },
  //Access to mail
  mail: {
    service: 'gmail',
    user: 'youremail',
    password: 'test',
  },
  //List plugins
  plugins: [
    'plugins/testPlugin.ts'
  ]
}