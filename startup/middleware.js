const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan')
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts')
const accessHeaders = require('../middlewares/accessHeaders');
module.exports = function (app) {
	app.use(expressLayouts)
	app.set('layout', './layouts/signup-layout')
	app.set('view engine', 'ejs');
	app.use(helmet());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(accessHeaders)
	app.use(morgan('tiny'))
}

