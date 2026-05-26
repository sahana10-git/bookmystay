const fs = require('fs');
const Hotel = require('../models/hotel');
let hotels = JSON.parse(fs.readFileSync('./data/hotels.json'))


exports.getAllHotels = async (req,res) => {   
    try{
        
        const hotels = await Hotel.find(req.query);
        res.status(200).json({
        status: 'success',
        count: hotels.length,
        data: {
            hotels
        }
    })
    }catch(err){
        console.error(err);
        res.status(500).json({
            status: 'fail',
            message: ('failed to load data')
        })
    }
}
exports.createHotel = async (req,res) => {
 try {
    //const hotel = new Hotel(req.body);
    //await hotel.save();
    const hotel = await Hotel.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            hotel
        }
    })}

  catch (err) {
    console.error(err);
    res.status(500).json({
        status: 'fail',
        message: ("failed to create hotel")
    })
}
}
exports.getHotelById = async (req,res) => {
  try {
    const id = req.params.id;
    const hotel = await Hotel.findById(id);
    res.status(200).json({
        status: 'success',
        data: {
            hotel
        }
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({
        status: 'fail',
        message: ("failed to get hotel")
    })
  } 
}
exports.updatedHotel = async (req,res) => {
    try{
        const id = req.params.id
        const updatedHotel = await Hotel.updateOne({_id:id},req.body)
        res.status(200).json({
            status: 'success',
            data: {
                hotel: updatedHotel
            }
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            status: 'fail',
            message: 'failed to update hotel'
        })
    }
}
exports.deleteHotel = async (req,res) => {
    try{
        const id = req.params.id
        
// await Hotel.findByIdAndDelete(id)
        await Hotel.deleteOne({_id:id})
        res.status(200).json({
            status: 'success',
            message: 'hotel deleted successfully'
        })
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: 'failed to delete document'
        })
    }
}
