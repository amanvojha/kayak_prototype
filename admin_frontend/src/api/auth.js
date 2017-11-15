const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3002/api/v1'

const headers = {
    'Accept': 'application/json'
};

export const signin = (payload) =>
	// axios.post(api+'/a/signin', {
 //      payload : payload,
 //    }).then(function (response) {
 //       console.log('getting here');
 //    })
 //    .catch(function (error) {
 //      //
 //    });
	fetch(api+'/a/signin', {
	    method: 'POST',
	    headers: {
	    	...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
	}).then(res => {
		return res;
	}).catch(error => {
        return error;
    }); 

export const checkSession = () =>
	fetch(api+'/a/check_session', {
	    method: 'GET',
	    headers: {
	    	...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
	}).then(res => {
		return res.json();
	}).catch(error => {
        return error;
    });  

export const logout = () =>
	fetch(api+'/logout', {
	    method: 'POST',
	    headers: {
	    	...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include'
	}).then(res => {
		return res;
	}).catch(error => {
        return error;
    });    
