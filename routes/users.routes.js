const express = require('express');
const router = express.Router();
const { ErrorHandler } = require('../middlewares/error');
const _ = require('lodash');
const { validate } = require('../models/users.model')
const { createUser } = require('../controllers/user.controller');

router.get('/', async (req, res) => {
	res.render('users/createUser')
})

router.post('/', async (req, res) => {
	const { error } = validate(req.body)
	if (error) return res.render('users/createUser', { error: error.details[0].message });
	// if (error) throw new ErrorHandler(400, error.details[0].message)
	const user = await createUser(req, res, 'users/createUser')
	res.redirect("/");
});


module.exports = router