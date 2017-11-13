import initialState from './initialState';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SESSION_ACTIVE" :
      return {...state,isLogged:true,username:action.data.username};
    case "SESSION_INACTIVE" :  
      return {...state,isLogged:false};
    default : 
      return state;
  }
};

export default reducer;
