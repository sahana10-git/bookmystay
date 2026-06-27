const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "hotel name is required"],
        trim: true
    },
    type: {
        type: String,
        required: [true, "hotel type is required"],
        enum: {
            values:['hotel', 'apartment', 'villa', 'cabin','resort'],
            message:'this type of hotel not allowed'
        }
    },
    city: {
        type: String,
        required: [true, "hotel city is required"],
    },
    address: {
        type: String,
        required: [true, "hotel address is required"]
    },
    distance: {
        type: Number,
        required: [true, "hotel distance from airport is required"]
    },
    category: {
        type: [String],
        required: [true, "hotel category is required"]
    },
    images: {
        type: [String]
    },
    rooms: {
        type: [String],
    },
    cheapestPrice: {
        type: Number,
        required: [true, "hotel cheapest price is required"]
    },
    feature: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        required: [true, "hotel description is required"]
    },
    ratings: {
        type: Number,
        min: [1, 'min ratings should be value 1']
    //     validate:{
    //     validate:function(value){
    //         value >= 0 && value <= 5
    //     },
    //     message:'ratings between 0 and 5'
    // }
}
},{
    toJSON: { virtuals: true }
});
hotelSchema.virtual('isPremium').get(function () {
    return this.cheapestPrice >= 2000;
});

hotelSchema.pre('save',function(next){ //before saving data
    this.createdAt=new Date()
    this.createdBy='sahana'
})
hotelSchema.post('save',function(docs){ //after saving data
    console.log(docs)
})
hotelSchema.pre('find',function(){
    this.find({isDeleted: false})
})
hotelSchema.post('find',function(docs){
   console.lof(`${docs.length} hotel retrieved`)
})
hotelSchema.pre('aggregate',function(){
   this.pipeline().unshift({
    $match : {isDeleted: false}
   })
   console.log(this.pipeline())
})
hotelSchema.post('aggregate',function(result){
    console.log(result)
})


module.exports = mongoose.model('Hotel', hotelSchema);