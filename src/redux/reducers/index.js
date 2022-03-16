import {combineReducers} from "redux";
import {setUserReducer} from "./user-reducer";
import {setSignupUser, setSigninUser} from "./auth-reducer";

const reducers = combineReducers({
  signup: setSignupUser,
  access_token: setSigninUser,
  user: setUserReducer
});

export default reducers;
