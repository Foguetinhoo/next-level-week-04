const express = require('express')
const SessionController =  require('../controllers/SessionController');

const sessionRoutes =  express.Router()

sessionRoutes.post('/sessions',SessionController.create)
sessionRoutes.post('/sessions/enter',SessionController.enter)
module.exports = sessionRoutes