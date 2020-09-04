import config from 'config';

export const allLaunchesService = {
    all_launches
  
};

function all_launches() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.apiUrl}/launches`, requestOptions)
        .then(handleResponse)
        .then(launches => {
            return launches;
        });
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // redirect to homepage if 401 response returned from api
             history.push('/');
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}