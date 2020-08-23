import { upcomingLaunchesConstants } from '../_constants/upcoming_launches.constant';


const initialState = {
  upcoming_launches_data : {}
};

export function upcoming_launches_reducer(state = initialState, action) {
  switch (action.type) {
    case upcomingLaunchesConstants.UPCOMING_LAUNCHES_REQUEST:
      return {...state,
                action}
    
    case upcomingLaunchesConstants.UPCOMING_LAUNCHES_SUCCESS:
      return {...state,
          payload : action.payload,
          action}

    case upcomingLaunchesConstants.UPCOMING_LAUNCHES_FAILURE:
        return { 
            error: action.error
          };
    default:
      return state
  }
}


