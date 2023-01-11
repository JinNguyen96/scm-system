import express from 'express';

const userRoute = require('');
const foodRoute = require('');
const rootRoute = express.Router();

rootRoute.use("", userRoute);
rootRoute.use("", foodRoute);

module.exports = rootRoute;