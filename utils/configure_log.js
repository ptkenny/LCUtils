const winston = require('winston');
const winstonElectron = require('winston-electron');

const logger = new winston.Logger({
    transports: [
        new winstonElectron({
            level: 'debug',
            handleExceptions: true
        }),
        new winston.transports.File({
            filename: `./logs/${ Date.now().toString() }.log`
        })
    ]
});

logger.info("Logger initiated...");

module.exports = logger;
