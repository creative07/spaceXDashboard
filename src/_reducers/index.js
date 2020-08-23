import { combineReducers } from 'redux';
import { all_launches_Details } from './all-launches.reducer';
import { upcoming_launches_reducer } from './upcoming_launches.reducer';
import { past_launches_reducer } from './past_launches.reducer';

const rootReducer = combineReducers({
  
  all_launches_Details,
  upcoming_launches_reducer,
  past_launches_reducer,
});

export default rootReducer;