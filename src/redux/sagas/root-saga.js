import {takeEvery} from "redux-saga/effects";
import {
  handleGetRoles,
  handleGetStudentTeacherClasses,
  handleGetInstituteClasses,
  handleGetDepartmentClasses
} from "./handlers/user-handler";
import {ActionTypes} from "../constants/actions-types";
import {
  handleSignupUserRequest,
  handleSigninUserRequest
} from "./handlers/auth-handler";
import {handleRequestInstituteRequest} from "./handlers/institute-handler"

export function* watcherSaga() {
  // auth handler
  yield takeEvery(ActionTypes.SIGN_UP_USER, handleSignupUserRequest);
  yield takeEvery(ActionTypes.SIGN_IN_USER, handleSigninUserRequest);

  // institute-handler
  yield takeEvery(ActionTypes.REQUEST_INSTITUTE, handleRequestInstituteRequest);

  // user-handler
  yield takeEvery(ActionTypes.GET_ROLES, handleGetRoles);
  yield takeEvery(ActionTypes.GET_STUDENT_TEACHER_CLASSES, handleGetStudentTeacherClasses);
  yield takeEvery(ActionTypes.GET_INSTITUTE_CLASSES, handleGetInstituteClasses);
  yield takeEvery(ActionTypes.GET_DEPARTMENT_CLASSES, handleGetDepartmentClasses);
}
