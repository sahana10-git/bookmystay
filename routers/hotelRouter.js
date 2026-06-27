const express = require('express');
const hotelRouter = express.Router();
const hotelController= require('./../controllers/hotel.controller');
const hotels = require('./../models/hotel')

hotelRouter.route('/get-featured')
.get(hotelController.getHotelByFeature)

hotelRouter.route('/')
.get(hotelController.getAllHotels)
.post(hotelController.createHotel)

hotelRouter.route('/gethotels-stats')
.get(hotelController.gethotelstats)

hotelRouter.route('/gethotelsby-category')
.get(hotelController.getHotelByCategory)

hotelRouter.route('/:id')
.get(hotelController.getHotelById)
.delete(hotelController.deleteHotel)

hotelRouter.route('/gethotelby-city')
.get(hotelController.getHotelByCity)

module.exports = hotelRouter

