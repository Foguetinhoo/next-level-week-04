const express = require('express')
const multer =  require('multer')

const uploadConfig =  require('../config/upload')
const SpotController =  require('../controllers/SpotController')
const BookingController=  require('../controllers/BookingController')

const upload = multer(uploadConfig)

const spotRoutes = express.Router()

spotRoutes.get('/spots',SpotController.index)
spotRoutes.post('/spots',upload.single('thumbnail'),SpotController.create)
spotRoutes.post ('/spots/:spot_id/bookings',BookingController.create)

module.exports = spotRoutes