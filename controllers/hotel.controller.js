const fs = require('fs');
const Hotel = require('../models/hotel');
const ApiFeatures = require('../utilities/features');

exports.getFeaturedHotels = async (req, res, next) => {
    req.query = { ...req.query, feature: true, sort: '-ratings', limit: 4 };
    next();
}
exports.getAllHotels = async (req, res) => {
    try {
        const features = new ApiFeatures(Hotel.find(), req.query);
        const query = features.filter().sort().fieldLimit().pagination().queryObj;
        const hotels = await query;

        res.status(200).json({
            status: 'success',
            count: hotels.length,
            data: hotels
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'fail',
            message: 'Failed to load the data'
        });
    }
}
exports.createHotel = async (req,res) => {
     try {
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
                        message: "failed to create hotel"
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
        message: "failed to get hotel"
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
exports.gethotelstats = async (req, res) => {
    try {
        const hotelstats = await Hotel.aggregate([
            { match: { type: 'hotel' } },
            {
               $group: {
                _id: null,
                avgRating: { $avg: '$ratings' },
                minPrice: { $min: '$cheapestPrice' },
                maxPrice: { $max: '$cheapestPrice' },
                totalPrice: { $sum: '$cheapestPrice' }
                }
            },
            { $sort: { minPrice: 1 } },
            { $limit: 6 },
            {$project: {_id: 0}},
            {$addFields: {city: '$_id'}}
            
        ]);

        res.status(200).json({
            status: 'success',
            data: {
                hotelstats
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'failed to get document: ' + err.message
        });
    }
}




exports.getHotelByCategory = async (req, res) => {
    try {
        const hotelByCategory = await Hotel.aggregate([
            { $unwind: '$category' },
            {$group: {
                    _id: '$category',
                    hotels: { $push: '$name' },
                    count: { $sum: 1 }
                }
            },
            // { $sort: { count: -1 } },
            // { $addFields: { category: '$_id' } },
            // { $project: { _id: 0 } },
            { $sort: { minPrice: 1 } },
            { $limit: 6 },
            { $addFields: { city: '$_id' } },
            { $project: { _id: 0 } }
       ])
            res.status(200).json({
            status: 'success',
            count: hotelByCategory.length,
            data: {
                hotelByCategory
            }
        })
    } catch (err) {
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to get a Document' + err.message
        })
    }
}

exports.getHotelByCity = async (req, res) => {
    try {
        const hotelByCity = await Hotel.aggregate([
            
            {
                $group:{
                    _id: null,
                    hotels:{$push:'$name'},
                    count: {$sum: 1}
                }
            },
    
        ]);

        res.status(200).json({
            status: 'success',
            count: hotelByCity.length,
            data: {
                hotelByCity
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'failed to load data'
        });
    }
};

exports.getHotelByType = async (req, res) => {
    try {
        const hotelByType = await Hotel.aggregate([
            { match: { type: 'hotel' } },
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: '$ratings' },
                    minPrice: { $min: '$cheapestPrice' },
                    maxPrice: { $max: '$cheapestPrice' },
                    totalPrice: { $sum: '$cheapestPrice' }
                }
            },
            { $sort: { minPrice: 1 } },
            { $limit: 6 },
            {$project: {_id: 0}},
            {$addFields: {city: '$_id'}}
        ]);

        res.status(200).json({
            status: 'success',
            count: hotelByType.length,
            data: {
                hotelByType
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'failed to load data'
        });
    }
};

exports.getHotelByFeature = async (req, res) => {
    try {
        const hotelByFeature = await Hotel.aggregate([
            { match: { type: 'hotel' } },
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: '$ratings' },
                    minPrice: { $min: '$cheapestPrice' },
                    maxPrice: { $max: '$cheapestPrice' },
                    totalPrice: { $sum: '$cheapestPrice' }
                }
            },
            { $sort: { minPrice: 1 } },
            { $limit: 6 },
            {$project: {_id: 0}},
            {$addFields: {city: '$_id'}}
        ]);

        res.status(200).json({
            status: 'success',
            count: hotelByFeature.length,
            data: {
                hotelByFeature
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: 'failed to load data'
        });
    }
};

