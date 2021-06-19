const { error, invalidPath } = require('../middlewares/error');
module.exports = function (app) {
	app.use('/', require('../routes/home.routes'));
	app.use('/user', require('../routes/users.routes'));
	app.use(invalidPath)
	app.use(error);
}