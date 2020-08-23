import config from 'config';
// import { Link, useHistory } from "react-router-dom";

// const history = useHistory();
// import { authHeader } from '../_helpers';

export const pastLaunchesService = {
    past_launches_service
  
};

function past_launches_service() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.apiUrl}/launches/past`, requestOptions)
        .then(handleResponse)
        .then(pastlaunches => {
            return pastlaunches;
        });
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                history.push('/');
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}