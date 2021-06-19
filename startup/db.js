const util = require('util');
const mysql = require('mysql');
const logger = require('./logger');
const config = require('config');
const host = config.get('mysqldb.host')
const user = config.get('mysqldb.user')
const password = config.get('mysqldb.password')
const database = config.get('mysqldb.database')
const waitForConnections = config.get('mysqldb.waitForConnections')
const connectionLimit = config.get('mysqldb.connectionLimit')
const queueLimit = config.get('mysqldb.queueLimit')
const port = config.get('mysqldb.port')
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
	host,
	user,
	password,
	database,
	waitForConnections,
	connectionLimit,
	queueLimit,
	port
});



pool.getConnection((err, connection) => {
	if (err) {
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			logger.error('Database connection was closed.')
		}
		if (err.code === 'ER_CON_COUNT_ERROR') {
			logger.error('Database has too many connections.')
		}
		if (err.code === 'ECONNREFUSED') {
			logger.error('Database connection was refused.')
		}
	}
	if (connection) connection.release()
	return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)



module.exports = pool