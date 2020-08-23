import { pastLaunchesConstants } from '../_constants/past_launches.constant';


const initialState = {
  past_launches_data : {}
};

export function past_launches_reducer(state = initialState, action) {
  switch (action.type) {
    case pastLaunchesConstants.PAST_LAUNCHES_REQUEST:
      return {...state,
                action}
    
    case pastLaunchesConstants.PAST_LAUNCHES_SUCCESS:
      return {...state,
          payload : action.payload,
          action}

    case pastLaunchesConstants.PAST_LAUNCHES_FAILURE:
        return { 
            error: action.error
          };
    default:
      return state
  }
}


