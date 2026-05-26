const express = require('express');
const hotelRouter = express.Router();
const hotelController= require('./../controllers/hotel.controller');
const hotels = require('./../models/hotel')

hotelRouter.route('/')
.get(hotelController.getAllHotels)
.post(hotelController.createHotel)

hotelRouter.route('/:id')
.get(hotelController.getHotelById)
.delete(hotelController.deleteHotel)

module.exports = hotelRouter
