import { allLaunchesConstants } from '../_constants/all-launches.constants';
import { allLaunchesService } from '../_services/all-launches.service';
import { alertActions } from './';
// import { history } from '../_helpers';

export const allLaunchesActions = {
    all_launches
};

function all_launches() {
    return dispatch => {
        dispatch(request());

        allLaunchesService.all_launches()
            .then(
                launches => { 
                    dispatch(success(launches));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(launches) { return { type: allLaunchesConstants.ALL_LAUNCHES_REQUEST, launches } }
    function success(launches) { return { type: allLaunchesConstants.ALL_LAUNCHES_SUCCESS, payload:launches } }
    function failure(error) { return { type: allLaunchesConstants.ALL_LAUNCHES_FAILURE, error } }
}

