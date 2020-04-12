const express = require('express')
const dashboardRoutes  =  express.Router()

const DasboardController =  require('../controllers/DashboardController')

dashboardRoutes.get('/dashboard',DasboardController.show)

module.exports = dashboardRoutes