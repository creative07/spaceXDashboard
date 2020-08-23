import { allLaunchesConstants } from '../_constants/all-launches.constants';


const initialState = {
  all_launches_data : {}
};

export function all_launches_Details(state = initialState, action) {
  switch (action.type) {
    case allLaunchesConstants.ALL_LAUNCHES_REQUEST:
      return {...state,
                action}
    
    case allLaunchesConstants.ALL_LAUNCHES_SUCCESS:
      return {...state,
          payload : action.payload,
          action}

    case allLaunchesConstants.ALL_LAUNCHES_FAILURE:
        return { 
            error: action.error
          };
    default:
      return state
  }
}


