var mongo = require('./mongo');
var validator = require('validator');
var ObjectID = require('mongodb').ObjectID;
var flightModel = require('../models/flight.js');

function addFlight(msg, callback){
	var res = {};
	
	msg.createdDate = new Date();
	msg.updatedDate = new Date() ;
	msg.is_deleted = false;

	var serviceDays = (new Date(msg.serviceEndDate)- new Date(msg.serviceStartDate))/(1000*60*60*24) ; 

	var availabilityDateObject = [] ; 
	for(var i=0 ; i <= serviceDays ; i++){
		var date = new Date(msg.serviceStartDate) ;
		date.setDate(date.getDate() + i);
		availabilityDateObject.push({availabilityDate : date , 
									sections : [ {class : 'First' , price : msg.firstClassPrice , available : msg.firstClassSeats} , 
												 {class : 'Economy' , price : msg.economyClassPrice , available : msg.economyClassSeats} ,
												 {class : 'Business' , price : msg.businessClassPrice , available : msg.businessClassSeats} 
											   ]
									})
	}

	msg.availability = availabilityDateObject ;


	var newFlight = new flightModel(msg);
	newFlight.save(function (err) {
		if(err) {
			res.code = 500 ;
			res.message = "Error occured while registering a flight with server"
			callback(null , res); 
		} else {
			res.code = 200  ; 
			res.message = "Success";
			callback(null , res) ; 
		}
	});


	
}

function getFlights(msg, callback){
    var res = {};
    flightModel.find({ is_deleted : false}, function(err, result){
    	if(err){
			res.code = 500  ; 
			res.message = "Fail to get all flights from the server"
			callback(null , res) ; 
		}else{
			
			res.code = 200  ; 
			res.message = "Success"
			res.data = result
			callback(null , res) ; 
		}
    });
}

function getFlightById(msg, callback){
	var res = {};
	idToGet = new ObjectID(msg.id) ;

	flightModel.find({ is_deleted : false , _id : idToGet }).lean().exec(function(err, result){
		if(err){
			res.code = 500  ; 
			res.message = "Fail to get all flights from the server"
			callback(null , res) ; 
		}else{
            if(result) {
                delete result[0].availability;
                res.code = 200;
                res.message = "Success"
                res.data = result
                callback(null, res);
            } else {
                res.code = 500  ;
                res.message = "Fail to get all flights from the server"
                callback(null , res) ;
            }
		}
	})	
	
}

function updateFlightById(msg, callback){
	var res = {};
	idToUpdate = new ObjectID(msg._id) ;
	msg._id = idToUpdate ; 
	msg.updatedDate = new Date() ; 
	
	
	var serviceDays = (new Date(msg.serviceEndDate)- new Date(msg.serviceStartDate))/(1000*60*60*24) ; 

	var availabilityDateObject = [] ; 
	for(var i=0 ; i <= serviceDays ; i++){
		var date = new Date(msg.serviceStartDate) ;
		date.setDate(date.getDate() + i);
		availabilityDateObject.push({availabilityDate : date , sections : [ {class : 'First' , price : msg.firstClassPrice , available : msg.firstClassSeats} , 
			{class : 'Economy' , price : msg.economyClassPrice , available : msg.economyClassSeats} ,
			{class : 'Business' , price : msg.businessClassPrice , available : msg.businessClassSeats} ]
		})
	}

	msg.availability = availabilityDateObject ;

	
	flightModel.update({is_deleted : false , _id : idToUpdate }, msg, { multi: false }, function(err , response){
		if(err){
			res.code = 500 ; 
			res.message = "Error occured while updating  a flight"
			callback(null , res); 
		}else{
			res.code = 200  ; 
			res.message = "Success"
			callback(null , res) ; 	
		}
	})
	
}

function deleteFlightById(msg, callback){
	var res = {};
	
	var idToDelete = new ObjectID(msg.idToDelete) ;
	if(!validator.isEmpty(msg.idToDelete)){
		flightModel.update({is_deleted : false , _id : idToDelete }, { $set: {is_deleted: true, updatedDate: new Date() }}, { multi: false }, function(err , response){
			if(err){
				res.code = 500 ; 
				res.message = "Error occured while deleting a hotel"
				callback(null , res); 
			}else{
				res.code = 200  ; 
				res.message = "Success"
				callback(null , res) ; 	
			}
		})
	}else{
		res.code = 400;
		res.data = []
		res.message = "Please pass the correct Parameteres";
		callback(null, res);
	}

}

function getFlightsForCustomer(msg, callback){
    var res = {};
    // var parts = msg.queryParams.date.split("-");
    // var date = new Date(parts[2]+"-"+parts[0]+"-"+parts[1]);
    

    console.log(msg.queryParams)
    
    var queryParams = msg.queryParams ; 

    var minPrice = queryParams.minPrice ;
    var maxPrice = queryParams.maxPrice ; 

    console.log(minPrice , maxPrice)

    var query = {
        is_deleted : false,
        





        // availability: {
        //     $elemMatch: {
        //         availableCars: {
        //             $gte: 1
        //         },
        //         availabilityDate: {
        //             $gte: startDate,
        //             $lte: endDate
        //         }
        //     }
        // }
    };
    var options = {
        select: 'flightNumber airline source destination departure arrival firstClassPrice businessClassPrice economyClassPrice',
        lean: true,
        page: msg.pageNo || 1,
        limit: 20
    };
    flightModel.paginate(query,options, function(err, result){
        if(err){
            res.code = 500  ;
            res.message = "Fail to get all hotels from the server";
            callback(null , res) ;
        }else{
            res.code = 200  ;
            res.message = "Success";
            res.data = result;
            callback(null , res) ;
        }
    });
}


function getFlightByIdForCustomer(msg, callback){
    var res = {};
    idToGet = new ObjectID(msg.id) ;
    flightModel.find({ is_deleted : false , _id : idToGet }).lean().exec(function(err, result){
        if(err){
            res.code = 500  ;
            res.message = "Fail to get all cars from the server"
            callback(null , res) ;
        }else{
            if(result) {
                delete result[0].availability;
                res.code = 200;
                res.message = "Success";
                res.data = result;
                callback(null, res);
            } else {
                res.code = 500  ;
                res.message = "Fail to get all cars from the server"
                callback(null , res) ;
            }
        }
    })
}

exports.addFlight = addFlight;
exports.getFlights = getFlights;
exports.getFlightById = getFlightById;
exports.updateFlightById = updateFlightById;
exports.deleteFlightById = deleteFlightById;
exports.getFlightsForCustomer = getFlightsForCustomer;
exports.getFlightByIdForCustomer = getFlightByIdForCustomer;