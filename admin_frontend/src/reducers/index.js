import {combineReducers} from 'redux';
import authReducer from './auth';
import carsReducer from './cars';
import flightsReducer from './flights'
import hotelsReducer from './hotels';
import customersReducer from './customers';
import billsReducer from './bills';
import homeReducer from './home';

const rootReducer = combineReducers({
  	// short hand property names
  	authReducer,
  	carsReducer,
  	flightsReducer,
  	hotelsReducer,
  	customersReducer,
  	billsReducer,
  	homeReducer
})

export default rootReducer;
