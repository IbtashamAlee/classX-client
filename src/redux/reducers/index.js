import {combineReducers} from "redux";
import {setRolesReducer, setClassesReducer} from "./user-reducer";
import {setSignupUser, setSigninUser} from "./auth-reducer";
import {toasts} from './toast'

const reducers = combineReducers({
  signup: setSignupUser,
  access_token: setSigninUser,
  roles: setRolesReducer,
  classes: setClassesReducer,
  toasts
});

export default reducers;
