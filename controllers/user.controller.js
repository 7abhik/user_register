const { ErrorHandler } = require('../middlewares/error');
const _ = require('lodash');
const pool = require('../startup/db');

module.exports = {
	createUser: async (req, res, renderpage) => {
		const { email, name, password } = req.body
		const user = await pool.query('SELECT * FROM `users` WHERE `email` = ?', [email])
		if (user.length) return res.render(renderpage, { error: `Email ${email} is already registered.` })
		// if (user.length) throw new ErrorHandler(400, 'User already registered.')
		await pool.query(`INSERT INTO users (name, email, password) VALUES ('${name}', '${email}','${password || ""}')`);
		return req.body
	},

	userList: async () => {
		return await pool.query('SELECT * FROM `users`')
	}
}