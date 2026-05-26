const mongoose = require('mongoose');


const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "hotel name is required"],
        trim: true
    },
    type:{//hotel, appartment, villa, resort, etc
        required: [true, "hotel type is required"],
        type: String
    },
    city: {
        type: String,
        required: [true, "hotel city is required"],
    },
    address: {
        type: String,
        required: [true, "hotel address is required"]
    },
    distance:{
        type: Number,
        required: [true, "hotel distance from airport is required"]
    },
    category:{
        type: [String],
        required: [true, "hotel category is required"]
    },
    images:{
        type:[String]
    },
    rooms:{
        type: [String],
    },
    cheapestPrice:{
        type: Number,
        required: [true, "hotel cheapest price is required"]
    },
    featured:{
        type: Boolean,
        default: false
    },
    description:{
        type: String,
        required: [true, "hotel description is required"]
    },
    rating:{
        type: Number,
        min:0,
        max:5
    }
})

module.exports = mongoose.model('Hotel', hotelSchema);