var mongoose = require("mongoose");

var carSchema = new mongoose.Schema({
	id : String,
    carType : String,
    carName : String,
    carQuantity : Number,
    serviceStartDate : Date,
    serviceEndDate : Date,
    occupancy : Number,
    luggage : String,
    dailyRentalValue : Number,
    createdDate: Date,
    updatedDate : Date,
    is_deleted : Boolean,
    availability : [{ availabilityDate : Date, availableCars : Number }],
    images : [String]
})
    
module.exports = mongoose.model('car', carSchema);