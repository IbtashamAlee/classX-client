import {combineReducers} from "redux";
import {setUserReducer} from "./user-reducer";
import {setSignupUser, setSigninUser} from "./auth-reducer";
import {toasts} from './toast'

const reducers = combineReducers({
  signup: setSignupUser,
  access_token: setSigninUser,
  user: setUserReducer,
  toasts
});

export default reducers;
