import {combineReducers} from "redux";
import {setRolesReducer} from "./user-reducer";
import {setSignupUser, setSigninUser} from "./auth-reducer";
import {toasts} from './toast'

const reducers = combineReducers({
  signup: setSignupUser,
  access_token: setSigninUser,
  roles: setRolesReducer,
  toasts
});

export default reducers;
