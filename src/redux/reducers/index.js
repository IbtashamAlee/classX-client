import {combineReducers} from "redux";
import {setRolesReducer, setClassesReducer} from "./user-reducer";
import {setSignupUser, setSigninUser} from "./auth-reducer";
import {toasts} from './toast';
import {setClassParticipantsReducer} from './participants-reducer'

const reducers = combineReducers({
  signup: setSignupUser,
  access_token: setSigninUser,
  roles: setRolesReducer,
  classes: setClassesReducer,
  participants: setClassParticipantsReducer,
  toasts
});

export default reducers;
