import { upcomingLaunchesConstants } from '../_constants/upcoming_launches.constant';
import { upcomingLaunchesService } from '../_services/upcoming_launches_service';
import { alertActions } from './';
// import { history } from '../_helpers';

export const upcomingLaunchesActions = {
    upcoming_launches_action
};

function upcoming_launches_action() {
    return dispatch => {
        dispatch(request());

        upcomingLaunchesService.upcoming_launches_service()
            .then(
                upcominglaunches => { 
                    dispatch(success(upcominglaunches));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(upcominglaunches) { return { type: upcomingLaunchesConstants.UPCOMING_LAUNCHES_REQUEST, upcominglaunches } }
    function success(upcominglaunches) { return { type: upcomingLaunchesConstants.UPCOMING_LAUNCHES_SUCCESS, payload:upcominglaunches } }
    function failure(error) { return { type: upcomingLaunchesConstants.UPCOMING_LAUNCHES_FAILURE, error } }
}

