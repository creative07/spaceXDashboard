import { pastLaunchesConstants } from '../_constants/past_launches.constant';
import { pastLaunchesService } from '../_services/past_launches_service';
import { alertActions } from './';
// import { history } from '../_helpers';

export const pastLaunchesActions = {
    past_launches_action
};

function past_launches_action() {
    return dispatch => {
        dispatch(request());

        pastLaunchesService.past_launches_service()
            .then(
                pastlaunches => { 
                    dispatch(success(pastlaunches));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(pastlaunches) { return { type: pastLaunchesConstants.PAST_LAUNCHES_REQUEST, pastlaunches } }
    function success(pastlaunches) { return { type: pastLaunchesConstants.PAST_LAUNCHES_SUCCESS, payload:pastlaunches } }
    function failure(error) { return { type: pastLaunchesConstants.PAST_LAUNCHES_FAILURE, error } }
}

