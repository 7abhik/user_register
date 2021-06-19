const express = require('express');
const app = express()
const logger = require('./startup/logger');
global.logger = logger
const config = require('config')

require('./startup/middleware')(app)
require('./startup/routes')(app)

process.on('unhandledRejection', (ex) => {
	throw ex;
});
logger.info(`running environment ${process.env.NODE_ENV}`)
const port = config.get('port')
app.listen(port, () => {
	logger.info(`Listing at port ${port} ......`);
})