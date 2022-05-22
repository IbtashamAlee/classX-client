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
import {
  handleDeleteInstituteRequest,
  handleGetInstitutesRequest,
  handleRequestInstituteRequest,
  handleRestoreInstituteRequest,
  handleGetInstitutesRequestsRequest, handleAcceptRejectInstituteRequest
} from "./handlers/institute-handler";
import {
  handleAddParticipants,
  handleGetParticipants,
  handleRemoveParticipantsRequest
} from "./handlers/participants-handler";
import {handleCreateIndependentClassRequest, handleJoinClassRequest} from "./handlers/class-handler";
import {
  handleCreateAttendanceRequest,
  handleGetAttendanceRequest,
  handleParticipateInAttendanceRequest
} from "./handlers/attendance-handler";
import {
  handleCreateAssessmentRequest,
  handleGetAssessmentsRequest,
  handleGetPublicAssessmentsRequest
} from "./handlers/assessments-handler";

export function* watcherSaga() {
  // auth handler
  yield takeEvery(ActionTypes.SIGN_UP_USER, handleSignupUserRequest);
  yield takeEvery(ActionTypes.SIGN_IN_USER, handleSigninUserRequest);

  // institute-handler
  yield takeEvery(ActionTypes.REQUEST_INSTITUTE, handleRequestInstituteRequest);
  yield takeEvery(ActionTypes.GET_INSTITUTES, handleGetInstitutesRequest);
  yield takeEvery(ActionTypes.DELETE_INSTITUTE, handleDeleteInstituteRequest);
  yield takeEvery(ActionTypes.RESTORE_INSTITUTE, handleRestoreInstituteRequest);
  yield takeEvery(ActionTypes.GET_INSTITUTE_REQUESTS, handleGetInstitutesRequestsRequest);
  yield takeEvery(ActionTypes.ACCEPT_REJECT_INSTITUTE, handleAcceptRejectInstituteRequest);

  // user-handler
  yield takeEvery(ActionTypes.GET_ROLES, handleGetRoles);
  yield takeEvery(ActionTypes.GET_STUDENT_TEACHER_CLASSES, handleGetStudentTeacherClasses);
  yield takeEvery(ActionTypes.GET_INSTITUTE_CLASSES, handleGetInstituteClasses);
  yield takeEvery(ActionTypes.GET_DEPARTMENT_CLASSES, handleGetDepartmentClasses);

  // participants-handler
  yield takeEvery(ActionTypes.GET_PARTICIPANTS_CLASS, handleGetParticipants);
  yield takeEvery(ActionTypes.ADD_PARTICIPANTS_IN_CLASS, handleAddParticipants);
  yield takeEvery(ActionTypes.REMOVE_PARTICIPANT, handleRemoveParticipantsRequest);

  //class-handler
  yield takeEvery(ActionTypes.CREATE_INDEPENDENT_CLASS, handleCreateIndependentClassRequest);
  yield takeEvery(ActionTypes.JOIN_CLASS, handleJoinClassRequest);

  // attendance-handler
  yield takeEvery(ActionTypes.GET_ATTENDANCE, handleGetAttendanceRequest);
  yield takeEvery(ActionTypes.CREATE_ATTENDANCE, handleCreateAttendanceRequest);
  yield takeEvery(ActionTypes.PARTICIPATE_IN_ATTENDANCE,   handleParticipateInAttendanceRequest);

  // assessments-handler
  yield takeEvery(ActionTypes.GET_ASSESSMENTS, handleGetAssessmentsRequest);
  yield takeEvery(ActionTypes.GET_PUBLIC_ASSESSMENTS, handleGetPublicAssessmentsRequest);
  yield takeEvery(ActionTypes.CREATE_ASSESSMENT, handleCreateAssessmentRequest);
}
