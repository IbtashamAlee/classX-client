import {takeEvery} from "redux-saga/effects";
import {handleGetUser} from "./handlers/user-handler";
import {ActionTypes} from "../constants/actions-types";
import {handleSignupUserRequest, handleSigninUserRequest} from "./handlers/auth-handler";
import {handleRequestInstituteRequest} from "./handlers/institute-handler"

export function* watcherSaga() {
  yield takeEvery(ActionTypes.SET_USER_ACTION, handleGetUser);
  yield takeEvery(ActionTypes.SIGN_UP_USER, handleSignupUserRequest);
  yield takeEvery(ActionTypes.SIGN_IN_USER, handleSigninUserRequest);
  yield takeEvery(ActionTypes.REQUEST_INSTITUTE, handleRequestInstituteRequest)
}
