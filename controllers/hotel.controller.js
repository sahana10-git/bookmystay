const fs = require('fs');
const Hotel = require('../models/hotel');
let hotels = JSON.parse(fs.readFileSync('./data/hotels.json'))


exports.getAllHotels = async (req, res) => {
    try {
        console.log(req.query)

        const queryObj = { ...req.query }
        const excludedFields = ['sort', 'page', 'limit', 'fields']

        excludedFields.forEach((ele) => {
            delete queryObj[ele]
        })
        const filteredQuery = getFilteredFinalQuery(queryObj);
        console.log(filteredQuery)
        const hotels = await Hotel.find(filteredQuery);
        let query = Hotel.find(filteredQuery)

        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(',')
            query = query.sort(sortBy)
        }else{
            query = query.sort('cheapestPrice')
        }
        //projection
        if(req.query.fields){   
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        }else{
            query = query.select('-__v') 
        }
        
        const page = req.query.page || 1;   
        const limit = req.query.limit || 10;
        //page=1 skip-0,limit
        //page=2 limit=10 => skip 10 
        //page=3 limit=10 => skip 20 
        const skip = (page - 1) * limit; 
            query = query.skip(skip).limit(limit) 

            if(req.query.page){
                const totalHotels = Hotel.countDocuments();

            if(skip >= totalHotels){
                throw new Error("This page does not exist") 
                }
            }

        const Hotels = await query; 

        res.status(200).json({
            status: 'success',
            count: Hotels.length,
            data: [
                Hotels
            ]
        })
        } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to load the data'
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
        console.error(err);
        res.status(500).json({
            status: 'fail',
            message: 'failed to delete document'
        })
    }
}
const getFilteredFinalQuery = (queryObj) => {
    const filterQuery = {};
    // { city: 'Chennai', 'ratings[gte]': '4', 'cheapestPrice[lt]': '3000' } QueryObject
    // { city: 'Chennai', ratings: { $gte: 4 }, cheapestPrice: { $lt: 3000 } }  Wants to convert like this 

    for (const key in queryObj) {
        const value = queryObj[key];
        const match = key.match(/^(.*)\[(gte|gt|lte|lt)\]$/);
        console.log(match)
        if (match) {
            const fieldName = match[1] //ratings
            const operator = `$${match[2]}` //$gte
            if (!filterQuery[fieldName]) {
                filterQuery[fieldName] = {};
                filterQuery[fieldName][operator] = value
            }
        } else {
            filterQuery[key] = value
        }
   }
         console.log(filterQuery)
        return filterQuery
}