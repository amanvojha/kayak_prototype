import * as api from '../api/cars';
import axios from 'axios' ;



// Get all Cars

export function getAllCars() {
	return function(dispatch) {
		return api.getAllCars(function(error , response){
			if(error){
				dispatch({type: "GET_ALL_CAR_FAILURE" });
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch({type: "GET_ALL_CAR_SUCCESS"  , payload :  res.data});
					}else{
						dispatch({type: "GET_ALL_CAR_FAILURE" });
					}
				})
			}
		})
	};
}



// add

function addCarSuccess(data) {
  	return {type: "ADD_CAR_SUCCESS" , payload : true}
}

function addCarFailure(){
    return {type: "ADD_CAR_FAILURE" , payload : false}
}


export function setBackCarAddSuccess(){
	return {type: "SET_BACK_CAR_ADD_SUCCESS" , payload : null}
}



export function addCar(payload , file ) {
	console.log("Payload file " , file  )  ; 


	let data = new FormData();
	
  	data.append('file', file);
  	data.append('carQuantity' , payload.carQuantity) ; 
  	data.append('carType' , payload.carType) ; 
  	data.append('carName' , payload.carName) ; 
  	data.append('occupancy' , payload.occupancy) ; 
  	data.append('luggage' , payload.luggage) ; 
  	data.append('dailyRentalValue' , payload.dailyRentalValue) ; 
  	data.append('serviceStartDate' , payload.serviceStartDate) ; 
  	data.append('serviceEndDate' , payload.serviceEndDate) ; 

  	console.log("Data " , data ) ;

  	return  function(dispatch){
		 axios.post('http://localhost:3002/api/v1/a/cars' , data  )
	  .then(function (response) {
	  	console.log("Response after upload " , response.data)
	  	//dispatch({type : 'FILE_UPLOAD_SUCCESS' , payload : response.data})
	  })
	  .catch(function (error) {
	  	console.log(error) ; 
	    //dispatch({type : 'FILE_UPLOAD_FALIURE' , payload : error})
	  })
	}


	/*return function(dispatch) {
		return api.addCar(data , function(error , response){
			if(error){
				dispatch(addCarFailure());
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(addCarSuccess(res.data));
					}else{
						dispatch(addCarFailure());
					}
				})
			}
		})
	};*/
}









//Delete

function deleteCarSuccess() {
  	return {type: "DELETE_CAR_SUCCESS" , payload : true}
}

function deleteCarFailure(){
    return {type: "DELETE_CAR_FAILURE" , payload : false}
}

export function setBackCarDeleteSuccess(){
    return {type: "SET_BACK_CAR_DELETE_SUCCESS"}
}


export function deleteCarById(id) {
	return function(dispatch) {
		return api.deleteCarById(id , function(error , response){
			if(error){
				dispatch( deleteCarFailure()) ;
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(deleteCarSuccess());
					}else{
						dispatch( deleteCarFailure()) ;
					}
				})
			}
		})
	};
}




// Update


var updatePlainObject =  {
  							carQuantity : 0 ,
  							carType : '',
  							carName : '',
  							occupancy : '',
  							luggage : "NO" ,
  							dailyRentalValue : 0,
			                serviceStartDate : '',
			                serviceEndDate : ''
  						}


function updateCarSuccess() {
	return {type: "UPDATE_CAR_SUCCESS" , payload : {success : true , updatePlainObject : updatePlainObject }}
}

function updateCarFailure() {
	return {type: "UPDATE_CAR_FAILURE" , payload : {success : false  }}; 
}


export function setBackJustUpdateVariable() {
	return {type: "SET_BACK_JUST_CAR_UPDATE_SUCCESS" , payload : {success : null  }}; 
}

export function setBackCarUpdateSuccess(){
	return {type: "SET_BACK_CAR_UPDATE_SUCCESS" , payload : {success : null , updatePlainObject : updatePlainObject }}
}



export function updateCarById(obj) {
	return function(dispatch) {
		return api.updateCarById(obj , function(error , response){
			if(error){
				dispatch(updateCarFailure())
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(updateCarSuccess())
					}else{
						dispatch(updateCarFailure())
					}
				})
			}
		})
	};
}


function getCarByIDSuccess(data){
	
	return {type: "GET_CAR_TO_UPDATE_SUCCESS" , payload : data}
}

export function getCarById(id) {
	return function(dispatch) {
		return api.getCarById(id , function(error , response){
			if(error){
				dispatch({type: "GET_CAR_TO_UPDATE_FAILURE" , payload : null})
			} else {
				response.then((res) => {
					if(res.status === 200){
						dispatch(getCarByIDSuccess(res.data[0]))
					}else{
						dispatch({type: "GET_CAR_TO_UPDATE_FAILURE" , payload : null})
					}
				})
			}
		})
	};
}



