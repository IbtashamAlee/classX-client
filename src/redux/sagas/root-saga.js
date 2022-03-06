import { takeLatest, takeEvery } from "redux-saga/effects";
import { getUser } from '../actions/user-actions'
import {handleGetUser} from "./handlers/user-handler";
import {ActionTypes} from "../constants/actions-types";

export function* watcherSaga() {
  yield takeLatest(ActionTypes.SET_USER_ACTION, handleGetUser)
}
