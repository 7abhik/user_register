const express = require('express');
const router = express.Router();
const { userList } = require('../controllers/user.controller');

router.get('/', async (req, res) => {
	const users = await userList()
	res.render('layouts/home', { users })
});

module.exports = router