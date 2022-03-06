import {takeEvery} from "redux-saga/effects";
import {handleGetUser} from "./handlers/user-handler";
import {ActionTypes} from "../constants/actions-types";

export function* watcherSaga() {
  yield takeEvery(ActionTypes.SET_USER_ACTION, handleGetUser);
}
