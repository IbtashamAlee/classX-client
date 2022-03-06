import {combineReducers} from "redux";
import {setUserReducer} from "./user-reducer"

const reducers = combineReducers({
  user: setUserReducer
});

export default reducers;
