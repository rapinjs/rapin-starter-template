module.exports = {
    //Database access
    db: {
        synchronize: true,
        type: 'mysql',
        database: process.env.DB_DATABASE,
        hostname: process.env.DB_HOSTNAME,
        password: process.env.DB_PASSWORD,
        username: process.env.DB_USERNAME,
        port: process.env.DB_PORT,
        entities: ['lib/entities/**/*.js']
    },
    //Style setting
    style: {
        engine: 'scss'
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
    plugins: ['plugins/testPlugin', '@rapin/typeorm', '@rapin/typeorm-auth']
};
//# sourceMappingURL=config.js.map