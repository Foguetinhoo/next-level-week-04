const express = require('express')
const routes = express.Router();

const spotRoutes = require('./spotRoutes')
const bookingRoutes = require('./bookingRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const sessionRoutes= require('./sessionRoutes')

routes.get('/');





module.exports = routes.use([spotRoutes, bookingRoutes, dashboardRoutes, sessionRoutes]);